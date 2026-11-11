import { test } from "node:test";
import assert from "node:assert/strict";
import { listFiles } from "../lib/figma.mjs";

function mockFigma(routes) {
  const calls = [];
  globalThis.fetch = async (url) => {
    const path = new URL(url).pathname;
    calls.push(path);
    const body = routes[path];
    if (!body) {
      return new Response(JSON.stringify({ status: 403, err: "Invalid scope" }), { status: 403 });
    }
    return new Response(JSON.stringify(body), { status: 200 });
  };
  return calls;
}

const file = (key) => ({ key, name: key, last_modified: "2026-11-01T00:00:00Z", thumbnail_url: "" });

test("lists files through the v2 folder endpoints, including subfolders", async () => {
  process.env.FIGMA_TOKEN = "t";
  process.env.FIGMA_TEAM_IDS = "https://www.figma.com/files/team/42/all-folders?fuid=1";
  process.env.FIGMA_PROJECT_IDS = "";
  const calls = mockFigma({
    "/v2/teams/42/folders": { folders: [{ id: 1, name: "Team project" }] },
    "/v2/folders/1/folders": { folders: [{ id: 2, name: "Class work" }] },
    "/v2/folders/2/folders": { folders: [] },
    "/v2/folders/1/files": { files: [file("a"), file("b")] },
    "/v2/folders/2/files": { files: [file("c"), file("a")] },
  });
  const keys = (await listFiles()).map((f) => f.key).sort();
  assert.deepEqual(keys, ["a", "b", "c"]); // duplicate "a" removed
  assert.ok(!calls.some((c) => c.startsWith("/v1/")), "should not touch deprecated endpoints");
});

test("falls back to the deprecated project endpoints for projects:read tokens", async () => {
  process.env.FIGMA_TEAM_IDS = "42";
  mockFigma({
    "/v1/teams/42/projects": { projects: [{ id: 7, name: "Old project" }] },
    "/v1/projects/7/files": { files: [file("z")] },
  });
  assert.deepEqual((await listFiles()).map((f) => f.key), ["z"]);
});
