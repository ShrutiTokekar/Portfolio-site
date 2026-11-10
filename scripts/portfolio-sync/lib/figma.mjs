// Figma REST API: list files, pick the frames worth showing, export them,
// and pull out text, colors and fonts for the case study writer.
const API = "https://api.figma.com/v1";

async function figma(pathname) {
  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error("FIGMA_TOKEN is not set");
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(API + pathname, { headers: { "X-Figma-Token": token } });
    if (res.status === 429 && attempt < 3) {
      const wait = Number(res.headers.get("retry-after") ?? 30);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) throw new Error(`Figma GET ${pathname} → ${res.status}: ${await res.text()}`);
    return res.json();
  }
}

/** Project IDs to watch: FIGMA_PROJECT_IDS, or every project in FIGMA_TEAM_IDS. */
async function projectIds() {
  const explicit = (process.env.FIGMA_PROJECT_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const teams = (process.env.FIGMA_TEAM_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const ids = [...explicit];
  for (const team of teams) {
    const { projects } = await figma(`/teams/${team}/projects`);
    ids.push(...projects.map((p) => String(p.id)));
  }
  return [...new Set(ids)];
}

/** Every design file in the watched projects: { key, name, last_modified, thumbnail_url }. */
export async function listFiles() {
  const files = [];
  for (const id of await projectIds()) {
    const data = await figma(`/projects/${id}/files`);
    files.push(...data.files);
  }
  return files;
}

export const fileUrl = (key) => `https://www.figma.com/design/${key}`;

/** File metadata plus the shallow node tree (pages → frames → section children). */
export const getFile = (key, depth = 3) => figma(`/files/${key}?depth=${depth}`);

/** "figma" for design files, "figjam" for boards, "slides" for decks. */
export async function editorType(key) {
  const file = await getFile(key, 1);
  return file.editorType ?? "figma";
}

/** Figma file keys from any figma.com links in a piece of text. */
export function figmaKeysIn(text = "") {
  const keys = [...text.matchAll(/figma\.com\/(?:board|file|design|proto)\/([A-Za-z0-9]+)/g)].map((m) => m[1]);
  return [...new Set(keys)];
}

/**
 * The parts of a FigJam board to show as user-flow images: each top-level
 * Section (largest first, at most `max`), or the whole first page when the
 * board has no sections.
 */
export function flowNodes(file, max = 2) {
  const page = file.document.children?.[0];
  if (!page) return [];
  const sections = (page.children ?? [])
    .filter((n) => n.type === "SECTION" && n.visible !== false && n.absoluteBoundingBox)
    .map((n) => ({ id: n.id, name: n.name, ...n.absoluteBoundingBox }))
    .filter((n) => n.width >= 300 && n.height >= 200)
    .sort((a, b) => b.width * b.height - a.width * a.height)
    .slice(0, max);
  if (sections.length) return sections;
  return [{ id: page.id, name: page.name, width: 4000, height: 3000, wholePage: true }];
}

/** Full subtrees for specific nodes. */
export async function getNodes(key, ids) {
  const data = await figma(`/files/${key}/nodes?ids=${encodeURIComponent(ids.join(","))}`);
  return ids.map((id) => data.nodes[id]?.document).filter(Boolean);
}

/** Render nodes to PNG and return { id: Buffer }. */
export async function exportFrames(key, frames) {
  const out = {};
  // Large desktop boards render at 1x, phone-sized frames at 2x so text stays sharp.
  for (const scale of [1, 2]) {
    const batch = frames.filter((f) => (scale === 2) === (f.width <= 1000));
    if (!batch.length) continue;
    const ids = batch.map((f) => f.id).join(",");
    const { images, err } = await figma(`/images/${key}?ids=${encodeURIComponent(ids)}&format=png&scale=${scale}`);
    if (err) throw new Error(`Figma export failed: ${err}`);
    for (const [id, url] of Object.entries(images)) {
      if (!url) continue;
      const res = await fetch(url);
      if (res.ok) out[id] = Buffer.from(await res.arrayBuffer());
    }
  }
  return out;
}

// ── Picking frames ───────────────────────────────────────────────────────────

const FRAME_TYPES = new Set(["FRAME", "COMPONENT", "COMPONENT_SET", "INSTANCE"]);
const SKIP_NAME = /^(cover|thumbnail)$|archive|old|scratch|unused|component|styles?|tokens?|colou?rs?|typography|icons?/i;

/** Top-level frames (including frames inside top-level sections), in reading order. */
export function topLevelFrames(file) {
  const frames = [];
  for (const page of file.document.children ?? []) {
    if (/archive|old|scratch|playground/i.test(page.name)) continue;
    for (const node of page.children ?? []) {
      const candidates = node.type === "SECTION" ? node.children ?? [] : [node];
      for (const n of candidates) {
        if (!FRAME_TYPES.has(n.type) || n.visible === false || !n.absoluteBoundingBox) continue;
        const { x, y, width, height } = n.absoluteBoundingBox;
        if (width < 200 || height < 200) continue;
        frames.push({ id: n.id, name: n.name, page: page.name, x, y, width, height });
      }
    }
    if (frames.length) break; // use the first page that has real frames
  }
  // Reading order: rows top to bottom (100px tolerance), then left to right.
  return frames.sort((a, b) => (Math.abs(a.y - b.y) > 100 ? a.y - b.y : a.x - b.x));
}

/**
 * Choose which frames become cover, hero and step-1..4.
 * Frames named "cover"/"thumbnail" or "hero" win their slot; otherwise the
 * first frames in reading order are used. Phone-sized (portrait) frames are
 * grouped later into a collage so they read well in wide slots.
 */
export function pickFrames(frames, maxSteps = 4) {
  const named = (re) => frames.find((f) => re.test(f.name));
  const coverFrame = named(/^(cover|thumbnail)$/i);
  const heroFrame = named(/^hero$/i);
  const screens = frames.filter((f) => f !== coverFrame && f !== heroFrame && !SKIP_NAME.test(f.name));
  const steps = screens.slice(0, maxSteps);
  return {
    cover: coverFrame ? [coverFrame] : screens.slice(0, 3),
    hero: heroFrame ? [heroFrame] : screens.slice(0, 4),
    steps,
  };
}

// ── Reading text, colors and fonts ──────────────────────────────────────────

const toHex = ({ r, g, b }) =>
  "#" + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("").toUpperCase();

export function inspectNodes(nodes) {
  const texts = [];
  const colorCount = new Map();
  const fontCount = new Map();
  const visit = (n) => {
    if (n.visible === false) return;
    for (const fill of n.fills ?? []) {
      if (fill.type === "SOLID" && fill.visible !== false && (fill.opacity ?? 1) > 0.5) {
        const hex = toHex(fill.color);
        colorCount.set(hex, (colorCount.get(hex) ?? 0) + 1);
      }
    }
    // TEXT layers, plus FigJam stickies, shapes and connectors with labels.
    const t = typeof n.characters === "string" ? n.characters.trim() : "";
    if (t && !texts.includes(t)) texts.push(t);
    if (n.type === "TEXT") {
      const family = n.style?.fontFamily;
      if (family) fontCount.set(family, (fontCount.get(family) ?? 0) + t.length);
    }
    (n.children ?? []).forEach(visit);
  };
  nodes.forEach(visit);
  const byCount = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
  return {
    texts: texts.slice(0, 200).map((t) => (t.length > 300 ? t.slice(0, 300) + "…" : t)),
    colors: byCount(colorCount).slice(0, 24),
    fonts: byCount(fontCount).slice(0, 4),
  };
}
