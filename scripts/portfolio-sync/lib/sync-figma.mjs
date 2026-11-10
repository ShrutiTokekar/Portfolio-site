// New Figma file → GitHub issue asking whether to add it (reply /add or /skip).
// /add → case study built from the file (images + Claude-written story).
// File already added by the bot and edited in Figma → images re-exported.
import fs from "node:fs";
import { config, paths, readJson, writeJson, loadState, saveState, slugify, logChange, DRY_RUN } from "./common.mjs";
import { listFiles, getFile, getNodes, exportFrames, topLevelFrames, pickFrames, inspectNodes, fileUrl, editorType, figmaKeysIn, flowNodes } from "./figma.mjs";
import { buildCaseImages, forVision } from "./images.mjs";
import { writeCaseStudy } from "./ai.mjs";
import { ensureLabel, createIssue, commentOnIssue, closeIssue } from "./github.mjs";

const LABEL = "figma-approval";
const KEY_MARKER = /<!-- figma-file-key: ([\w-]+) -->/;

/** Figma file keys already linked from hand-written case studies. */
function manualFigmaKeys() {
  const src = fs.readFileSync(paths.caseStudiesJs, "utf8");
  return new Set([...src.matchAll(/figma\.com\/(?:design|file|proto)\/([\w-]+)/g)].map((m) => m[1]));
}

export async function syncFigma() {
  if (!process.env.FIGMA_TOKEN) {
    console.log("FIGMA_TOKEN not set, skipping Figma.");
    return false;
  }
  const state = loadState();
  const files = await listFiles();
  const manual = manualFigmaKeys();
  let changed = false;

  // First run: files already on the site are recorded as "manual" and never
  // touched. With catchUpOnFirstRun, every other existing file is left
  // unrecorded so the loop below offers it like a brand-new file (once).
  if (!state.bootstrapped.figma) {
    const catchUp = config.catchUpOnFirstRun !== false;
    for (const f of files) {
      if (manual.has(f.key)) state.figma[f.key] = { name: f.name, status: "manual", lastModified: f.last_modified };
      else if (!catchUp) state.figma[f.key] = { name: f.name, status: "existing", lastModified: f.last_modified };
    }
    state.bootstrapped.figma = true;
    logChange(
      `Started tracking ${files.length} Figma files` +
        (catchUp ? "; asking about the existing ones that aren't on the site yet." : " (existing files are not offered).")
    );
    saveState(state);
    changed = true;
    if (!catchUp) return true;
  }

  for (const f of files) {
    const known = state.figma[f.key];

    if (!known) {
      const type = manual.has(f.key) ? "figma" : await editorType(f.key);
      if (manual.has(f.key)) {
        state.figma[f.key] = { name: f.name, status: "manual", lastModified: f.last_modified };
      } else if (type !== "figma") {
        // FigJam boards (and Slides) don't get their own issue. A board is
        // attached to a case study by pasting its link after /add.
        state.figma[f.key] = { name: f.name, status: type, lastModified: f.last_modified };
      } else if (!DRY_RUN) {
        await ensureLabel(LABEL, "a259ff", "New Figma file waiting for a yes/no");
        const issue = await createIssue(`New Figma file: ${f.name}. Add it to the portfolio?`, approvalBody(f), [LABEL]);
        state.figma[f.key] = { name: f.name, status: "pending", issue: issue.number, lastModified: f.last_modified };
        saveState(state); // save right away so a later failure can't cause a duplicate issue
        logChange(`Asked about new Figma file "${f.name}" (issue #${issue.number})`);
        await new Promise((r) => setTimeout(r, 1500)); // stay under GitHub's issue-creation rate limit
      } else {
        console.log(`[dry run] would open an approval issue for "${f.name}"`);
      }
      changed = true;
      continue;
    }

    // Bot-built case study whose Figma file changed → refresh the screenshots.
    if (known.status === "added" && known.lastModified !== f.last_modified) {
      await refreshImages(f.key, known);
      known.lastModified = f.last_modified;
      logChange(`Refreshed images for "${known.slug}" after Figma edits`);
      changed = true;
    }
  }

  saveState(state);
  return changed;
}

function approvalBody(f) {
  return `A new Figma file showed up: **[${f.name}](${fileUrl(f.key)})**

${f.thumbnail_url ? `![thumbnail](${f.thumbnail_url})\n` : ""}
**Reply \`/add\` to add it to the design portfolio.** I'll export its frames as the cover, hero and step images and write the case study (overview, process, key decision, palette and fonts).

Anything you write after \`/add\` is used as background for the case study, for example:

\`\`\`
/add
Category: UI/UX
A class project: a budgeting app for students who share rent. I did the research, flows and hi-fi screens.
\`\`\`

**User flow in FigJam?** Paste the board's link in the same comment and it's added as a "User flow" step before the screens (one image per Section on the board):

\`\`\`
/add
https://www.figma.com/board/AbC123/My-app-user-flow
\`\`\`

**Reply \`/skip\` to leave it off.**

Tip: name a frame \`cover\` or \`hero\` to choose those images yourself. Otherwise the first frames on the first page are used.

<!-- figma-file-key: ${f.key} -->`;
}

// ── Handling /add and /skip ──────────────────────────────────────────────────

export async function handleApprovalComment() {
  const issueNumber = Number(process.env.ISSUE_NUMBER);
  const body = (process.env.COMMENT_BODY ?? "").trim();
  const key = (process.env.ISSUE_BODY ?? "").match(KEY_MARKER)?.[1];
  if (!key) return console.log("Issue has no Figma file key, ignoring.");
  const command = body.match(/^\/(add|skip)\b/i)?.[1]?.toLowerCase();
  if (!command) return console.log("Comment is not /add or /skip, ignoring.");

  const state = loadState();
  const entry = (state.figma[key] ??= { status: "pending", issue: issueNumber });

  if (command === "skip") {
    entry.status = "skipped";
    saveState(state);
    logChange(`Skipped Figma file "${entry.name ?? key}"`);
    if (!DRY_RUN) {
      await commentOnIssue(issueNumber, "Got it, this file stays off the portfolio.");
      await closeIssue(issueNumber, "not_planned");
    }
    return true;
  }

  const notes = body.replace(/^\/add\b/i, "").trim();
  const study = await buildCaseStudy(key, notes);
  entry.status = "added";
  entry.slug = study.slug;
  entry.frames = study.generatedFrom.frames;
  saveState(state);
  logChange(`Added case study "${study.title}" from Figma`);
  if (!DRY_RUN) {
    const url = `${config.siteUrl}/design/${study.slug}`;
    await commentOnIssue(
      issueNumber,
      `Added. It will be live at ${url} after Vercel finishes deploying (about a minute).\n\n` +
        `> **${study.title}: ${study.subtitle}**\n> ${study.summary}\n\n` +
        `To edit the wording, change \`src/data/caseStudies.generated.json\`. To replace an image, overwrite the file in \`src/assets/case-studies/${study.slug}/\`.`
    );
    await closeIssue(issueNumber, "completed");
  }
  return true;
}

/** Example entry from the hand-written file, so Claude matches the site's voice. */
function exampleCaseStudy() {
  const src = fs.readFileSync(paths.caseStudiesJs, "utf8");
  const start = src.indexOf('slug: "waypoint"');
  if (start < 0) return "";
  const end = src.indexOf("\n  },\n", start);
  return "{\n    " + src.slice(start, end > 0 ? end : start + 4000) + "\n  }";
}

function uniqueSlug(base) {
  const taken = new Set([
    ...[...fs.readFileSync(paths.caseStudiesJs, "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]),
    ...readJson(paths.generatedCaseStudies).map((c) => c.slug),
  ]);
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;
  return slug;
}

const googleFontsParam = (fonts) =>
  fonts.map((f) => f.name.trim().replace(/\s+/g, "+")).join("&family=");

export async function buildCaseStudy(key, notes = "") {
  const file = await getFile(key);
  const frames = topLevelFrames(file);
  if (!frames.length) throw new Error(`No frames found in Figma file ${file.name}`);
  const picks = pickFrames(frames);
  const allPicked = [...new Map([...picks.cover, ...picks.hero, ...picks.steps].map((f) => [f.id, f])).values()];

  const [pngs, nodes] = await Promise.all([exportFrames(key, allPicked), getNodes(key, allPicked.map((f) => f.id))]);
  const { texts, colors, fonts } = inspectNodes(nodes);

  // FigJam boards linked in the /add comment become "User flow" steps up front.
  const flows = await loadFlows(figmaKeysIn(notes).filter((k) => k !== key));
  Object.assign(pngs, flows.pngs);
  picks.steps = [...flows.steps, ...picks.steps];

  const vision = async (label, frame) =>
    pngs[frame.ref ?? frame.id] ? { label, base64: (await forVision(pngs[frame.ref ?? frame.id])).toString("base64") } : null;
  const images = (
    await Promise.all([
      vision("COVER", picks.cover[0]),
      ...picks.steps.map((f, i) =>
        vision(f.flowBoard ? `STEP ${i + 1} (user flow from the FigJam board "${f.flowBoard}")` : `STEP ${i + 1} (frame "${f.name}")`, f)
      ),
    ])
  ).filter(Boolean);

  const written = await writeCaseStudy({
    fileName: file.name,
    notes,
    texts,
    flowTexts: flows.texts,
    colors,
    fonts,
    images,
    example: exampleCaseStudy(),
    stepCount: picks.steps.length,
    stepNames: picks.steps.map((f) => (f.flowBoard ? "User flow" : f.name)),
  });

  const slug = uniqueSlug(slugify(written.title));
  const fontsWithFamily = written.designSystem.fonts.map((f) => ({
    ...f,
    family: `'${f.name}', system-ui, sans-serif`,
  }));
  const study = {
    slug,
    title: written.title,
    subtitle: written.subtitle,
    category: written.category,
    year: String(new Date(file.lastModified).getFullYear()),
    status: written.status,
    summary: written.summary,
    role: written.role,
    timeline: "",
    tools: written.tools,
    toolsFull: written.toolsFull,
    live: "",
    github: "",
    figma: `${fileUrl(key)}?node-id=0-1`,
    prototype: "",
    palette: written.palette,
    designSystem: {
      colors: written.designSystem.colors,
      fonts: fontsWithFamily,
      ...(fontsWithFamily.length ? { googleFonts: googleFontsParam(fontsWithFamily) } : {}),
    },
    overview: written.overview,
    processLabel: written.processLabel,
    processHeading: written.processHeading,
    process: written.process.map((s) => (s.chips?.length ? s : { label: s.label, text: s.text })),
    decision: written.decision,
    outcome: written.outcome,
    learned: "",
    next: "",
    generatedFrom: {
      figmaKey: key,
      frames: {
        cover: picks.cover.map((f) => f.id),
        hero: picks.hero.map((f) => f.id),
        steps: picks.steps.filter((f) => !f.flowBoard).map((f) => f.id),
      },
      flows: flows.boards, // FigJam boards rendered as the leading "User flow" steps
    },
  };

  if (!DRY_RUN) {
    await buildCaseImages(slug, picks, pngs, study.palette.bg);
    writeJson(paths.generatedCaseStudies, [study, ...readJson(paths.generatedCaseStudies)]);
  } else {
    console.log(JSON.stringify(study, null, 2));
  }
  return study;
}

async function refreshImages(key, entry) {
  const study = readJson(paths.generatedCaseStudies).find((c) => c.slug === entry.slug);
  if (!study) return;
  const file = await getFile(key);
  const frames = topLevelFrames(file);
  const byId = new Map(frames.map((f) => [f.id, f]));
  const keep = (ids) => ids.map((id) => byId.get(id)).filter(Boolean);
  const saved = study.generatedFrom.frames;
  // Fall back to a fresh pick if the original frames were deleted.
  const fresh = pickFrames(frames);
  const picks = {
    cover: keep(saved.cover).length ? keep(saved.cover) : fresh.cover,
    hero: keep(saved.hero).length ? keep(saved.hero) : fresh.hero,
    steps: keep(saved.steps).length ? keep(saved.steps) : fresh.steps,
  };
  const all = [...new Map([...picks.cover, ...picks.hero, ...picks.steps].map((f) => [f.id, f])).values()];
  const pngs = await exportFrames(key, all);
  // Re-render linked FigJam flows too, keeping them as the leading steps.
  const flows = await loadFlows(study.generatedFrom.flows ?? []);
  Object.assign(pngs, flows.pngs);
  picks.steps = [...flows.steps, ...picks.steps];
  if (!DRY_RUN) await buildCaseImages(entry.slug, picks, pngs, study.palette.bg);
}

/**
 * Render FigJam boards as "User flow" steps (one image per top-level Section,
 * at most two in total).
 * @returns {Promise<{ steps: object[], pngs: Record<string, Buffer>, texts: string[], boards: string[] }>}
 */
async function loadFlows(keys) {
  const out = { steps: [], pngs: {}, texts: [], boards: [] };
  for (const boardKey of keys) {
    if (out.steps.length >= 2) break;
    let board;
    try {
      board = await getFile(boardKey, 2);
    } catch (err) {
      console.warn(`Couldn't open linked Figma file ${boardKey}:`, err.message);
      continue;
    }
    if (board.editorType !== "figjam") continue; // only boards become flow steps
    const nodes = flowNodes(board, 2 - out.steps.length);
    // Boards are big: width > 1000 makes exportFrames render them at 1x.
    const rendered = await exportFrames(boardKey, nodes.map((n) => ({ ...n, width: Math.max(n.width, 1001) })));
    for (const n of nodes) {
      if (!rendered[n.id]) {
        console.warn(`Figma couldn't render "${n.name}" on "${board.name}". Wrapping the flow in a Section usually fixes this.`);
        continue;
      }
      // Node ids repeat across files, so key flow images by board too.
      const ref = `${boardKey}/${n.id}`;
      out.pngs[ref] = rendered[n.id];
      out.steps.push({ ...n, ref, flowBoard: board.name });
    }
    out.texts.push(...inspectNodes(await getNodes(boardKey, nodes.map((n) => n.id))).texts);
    out.boards.push(boardKey);
  }
  out.texts = out.texts.slice(0, 150);
  return out;
}
