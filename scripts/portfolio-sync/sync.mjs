#!/usr/bin/env node
// Portfolio sync entry point.
//   node sync.mjs github    new repos → cards; README changes → card descriptions
//   node sync.mjs figma     new Figma files → approval issues; edits → fresh images
//   node sync.mjs all       both of the above
//   node sync.mjs approve   handle an /add or /skip comment (run by the issue workflow)
// Set DRY_RUN=1 to print what would change without writing files or opening issues.
import { writeSummary } from "./lib/common.mjs";
import { syncGithub } from "./lib/sync-github.mjs";
import { syncFigma, handleApprovalComment } from "./lib/sync-figma.mjs";

const command = process.argv[2] ?? "all";

const jobs = {
  github: [syncGithub],
  figma: [syncFigma],
  all: [syncGithub, syncFigma],
  approve: [handleApprovalComment],
}[command];
if (!jobs) {
  console.error(`Unknown command "${command}". Use github, figma, all or approve.`);
  process.exit(2);
}

// Run each part even if another fails, so a Figma outage doesn't block GitHub updates.
let failed = false;
for (const job of jobs) {
  try {
    await job();
  } catch (err) {
    failed = true;
    console.error(`${job.name} failed:`, err);
  }
}
writeSummary();
if (failed) process.exitCode = 1;
