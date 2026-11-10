import { test } from "node:test";
import assert from "node:assert/strict";
import { cleanReadme } from "../lib/ai.mjs";

test("cleanReadme drops badges, code and headings, keeps prose", () => {
  const md = `# Shelf Life
[![build](https://x/badge.svg)](https://x)

A local-first pantry app that turns a **receipt photo** into tracked items, with [shared lists](https://y).

\`\`\`bash
npm install
\`\`\`

## Installation
Run the thing with npm and then open the browser to see it.`;
  const paras = cleanReadme(md);
  assert.equal(paras[0], "A local-first pantry app that turns a receipt photo into tracked items, with shared lists.");
  assert.ok(!paras.some((p) => p.includes("npm install")));
});
