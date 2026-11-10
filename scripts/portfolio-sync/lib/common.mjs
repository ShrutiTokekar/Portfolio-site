import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = path.resolve(HERE, "../..");

export const paths = {
  config: path.join(HERE, "config.json"),
  state: path.join(HERE, "state.json"),
  projects: path.join(ROOT, "src/data/projects.json"),
  caseStudiesJs: path.join(ROOT, "src/data/caseStudies.js"),
  generatedCaseStudies: path.join(ROOT, "src/data/caseStudies.generated.json"),
  caseImagesDir: path.join(ROOT, "src/assets/case-studies"),
};

export const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
export const writeJson = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");

export const config = readJson(paths.config);
export const DRY_RUN = process.env.DRY_RUN === "1";

export function loadState() {
  const s = readJson(paths.state);
  s.bootstrapped ??= { github: false, figma: false };
  s.github ??= {};
  s.figma ??= {};
  return s;
}

export function saveState(state) {
  if (!DRY_RUN) writeJson(paths.state, state);
}

export const sameRepo = (a, b) => a?.toLowerCase() === b?.toLowerCase();

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48) || "project";
}

// Collected for the GitHub Actions job summary and the commit message.
const changes = [];
export function logChange(line) {
  changes.push(line);
  console.log("•", line);
}
export function writeSummary() {
  const file = process.env.GITHUB_STEP_SUMMARY;
  const body = changes.length
    ? `### Portfolio sync\n\n${changes.map((c) => `- ${c}`).join("\n")}\n`
    : "### Portfolio sync\n\nNo changes.\n";
  if (file) fs.appendFileSync(file, body);
  // The workflow uses this file as the commit message.
  const msgFile = path.join(HERE, ".commit-message");
  fs.rmSync(msgFile, { force: true });
  if (changes.length) {
    fs.writeFileSync(
      msgFile,
      `portfolio-sync: ${changes.length === 1 ? changes[0] : `${changes.length} updates`}\n\n${changes.map((c) => `- ${c}`).join("\n")}\n`
    );
  }
}
