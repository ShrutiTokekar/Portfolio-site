// Turns exported Figma frames into the files the site already looks for:
// src/assets/case-studies/<slug>/cover.webp, hero.webp, step-1..4.webp
import fs from "node:fs";
import path from "node:path";
import { paths } from "./common.mjs";

// sharp is loaded on first use so the GitHub-only path needs no native module.
let sharpLib;
const sharp = (...args) => sharpLib(...args);
export async function loadSharp() {
  sharpLib ??= (await import("sharp")).default;
}

const COVER = { width: 1200, height: 720 };
const HERO = { width: 2000, height: 1000 };
const MAX_STEP_WIDTH = 1600;

const hexToRgb = (hex = "#F5F3EF") => {
  const n = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, alpha: 1 };
};

/**
 * One landscape frame → cropped to fill the box.
 * Several (or portrait/phone) frames → laid side by side on the palette
 * background, each scaled to the same height, like a presentation board.
 */
async function board(buffers, box, background) {
  if (buffers.length === 1) {
    const meta = await sharp(buffers[0]).metadata();
    if (meta.width / meta.height >= 1.2) {
      return sharp(buffers[0]).resize(box.width, box.height, { fit: "cover", position: "top" }).webp({ quality: 82 }).toBuffer();
    }
  }
  const pad = Math.round(box.height * 0.1);
  const gap = Math.round(box.width * 0.03);
  const innerH = box.height - pad * 2;
  const metas = await Promise.all(buffers.map((b) => sharp(b).metadata()));
  // Fit everything in one row: shrink the shared height if the row is too wide.
  const naturalW = metas.reduce((sum, m) => sum + (m.width / m.height) * innerH, 0) + gap * (buffers.length - 1);
  const h = Math.round(naturalW > box.width - pad * 2 ? innerH * ((box.width - pad * 2) / naturalW) : innerH);
  const tiles = await Promise.all(
    buffers.map((b) => sharp(b).resize({ height: h }).png().toBuffer({ resolveWithObject: true }))
  );
  const rowW = tiles.reduce((s, t) => s + t.info.width, 0) + gap * (tiles.length - 1);
  let left = Math.round((box.width - rowW) / 2);
  const top = Math.round((box.height - h) / 2);
  const composites = tiles.map((t) => {
    const c = { input: t.data, left, top };
    left += t.info.width + gap;
    return c;
  });
  return sharp({ create: { width: box.width, height: box.height, channels: 4, background: hexToRgb(background) } })
    .composite(composites)
    .webp({ quality: 82 })
    .toBuffer();
}

const step = (buf) =>
  sharp(buf).resize({ width: MAX_STEP_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();

/**
 * @param {string} slug
 * @param {{cover: object[], hero: object[], steps: object[]}} picks frames from pickFrames()
 * @param {Record<string, Buffer>} pngs exported PNGs keyed by frame id
 * @param {string} background palette.bg for collage backgrounds
 * @returns {Promise<Record<string, Buffer>>} name → webp buffer (also written to disk)
 */
export async function buildCaseImages(slug, picks, pngs, background, { write = true } = {}) {
  await loadSharp();
  const ref = (f) => f.ref ?? f.id;
  const get = (frames) => frames.map((f) => pngs[ref(f)]).filter(Boolean);
  const out = {};
  if (get(picks.cover).length) out.cover = await board(get(picks.cover), COVER, background);
  if (get(picks.hero).length) out.hero = await board(get(picks.hero), HERO, background);
  for (const [i, f] of picks.steps.entries()) {
    if (pngs[ref(f)]) out[`step-${i + 1}`] = await step(pngs[ref(f)]);
  }
  if (write) {
    const dir = path.join(paths.caseImagesDir, slug);
    fs.mkdirSync(dir, { recursive: true });
    for (const [name, buf] of Object.entries(out)) fs.writeFileSync(path.join(dir, `${name}.webp`), buf);
  }
  return out;
}

/** Small JPEG-ish previews for Claude (long side ≤ 1568px, the useful vision limit). */
export const forVision = async (buf) =>
  (await loadSharp(), sharp(buf)).resize({ width: 1568, height: 1568, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
