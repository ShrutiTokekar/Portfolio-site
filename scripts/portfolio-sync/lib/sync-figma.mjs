// New Figma file → GitHub issue asking whether to add it (reply /add or /skip).
// /add → case study built from the file (images + Claude-written story).
// File already added by the bot and edited in Figma → images re-exported.
import fs from "node:fs";
import { config, paths, readJson, writeJson, loadState, saveState, slugify, logChange, DRY_RUN } from "./common.mjs";
import { listFiles, getFile, getNodes, exportFrames, topLevelFrames, pickFrames, inspectNodes, fileUrl } from "./figma.mjs";
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

  if (!state.bootstrapped.figma) {
    for (const f of files) {
      state.figma[f.key] = { name: f.name, status: manual.has(f.key) ? "manual" : "existing", lastModified: f.last_modified };
    }
    state.bootstrapped.figma = true;
    logChange(`Started tracking ${files.length} Figma files (existing files are not offered).`);
    saveState(state);
    return true;
  }

  for (const f of files) {
    const known = state.figma[f.key];

    if (!known) {
      if (manual.has(f.key)) {
        state.figma[f.key] = { name: f.name, status: "manual", lastModified: f.last_modified };
      } else if (!DRY_RUN) {
        await ensureLabel(LABEL, "a259ff", "New Figma file waiting for a yes/no");
        const issue = await createIssue(`New Figma file: ${f.name}. Add it to the portfolio?`, approvalBody(f), [LABEL]);
        state.figma[f.key] = { name: f.name, status: "pending", issue: issue.number, lastModified: f.last_modified };
        saveState(state); // save right away so a later failure can't cause a duplicate issue
        logChange(`Asked about new Figma file "${f.name}" (issue #${issue.number})`);
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

  const vision = async (label, frame) =>
    pngs[frame.id] ? { label, base64: (await forVision(pngs[frame.id])).toString("base64") } : null;
  const images = (
    await Promise.all([
      vision("COVER", picks.cover[0]),
      ...picks.steps.map((f, i) => vision(`STEP ${i + 1} (frame "${f.name}")`, f)),
    ])
  ).filter(Boolean);

  const written = await writeCaseStudy({
    fileName: file.name,
    notes,
    texts,
    colors,
    fonts,
    images,
    example: exampleCaseStudy(),
    stepCount: picks.steps.length,
    stepNames: picks.steps.map((f) => f.name),
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
      frames: { cover: picks.cover.map((f) => f.id), hero: picks.hero.map((f) => f.id), steps: picks.steps.map((f) => f.id) },
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
  if (!DRY_RUN) await buildCaseImages(entry.slug, picks, pngs, study.palette.bg);
}
