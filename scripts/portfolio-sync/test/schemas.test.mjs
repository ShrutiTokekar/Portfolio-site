import { test } from "node:test";
import assert from "node:assert/strict";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { buildSchemas } from "../lib/ai.mjs";

// Regression test: with zod 3 the SDK helper threw "Cannot read properties of
// undefined (reading 'def')", so every summary fell back to the heuristic.
test("both Claude output schemas convert to JSON Schema", () => {
  const { RepoCard, CaseStudy } = buildSchemas(z);
  for (const schema of [RepoCard, CaseStudy]) {
    const format = zodOutputFormat(schema);
    assert.equal(format.type, "json_schema");
    assert.equal(format.schema.type, "object");
  }
  assert.ok(zodOutputFormat(RepoCard).schema.properties.category.enum.includes("Full Stack"));
});
