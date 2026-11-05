import { test } from "node:test";
import assert from "node:assert/strict";
import { topLevelFrames, pickFrames, inspectNodes } from "../lib/figma.mjs";

const frame = (id, name, x, y, w = 390, h = 844, extra = {}) => ({
  id, name, type: "FRAME", absoluteBoundingBox: { x, y, width: w, height: h }, ...extra,
});

const file = {
  document: {
    children: [
      { name: "Archive", children: [frame("0:1", "Old home", 0, 0)] },
      {
        name: "Hi-fi",
        children: [
          frame("1:3", "Search", 900, 0),
          frame("1:1", "Welcome", 0, 0),
          frame("1:2", "Home", 450, 40), // same row as Welcome (within 100px)
          frame("1:9", "tiny icon", 0, 2000, 24, 24),
          { id: "2:0", type: "SECTION", name: "Checkout", children: [frame("2:1", "Cart", 0, 1200), frame("2:2", "Pay", 450, 1200)] },
          frame("1:5", "Colors", 0, 3000, 1200, 800),
        ],
      },
    ],
  },
};

test("topLevelFrames skips archive pages and tiny nodes, includes section children, reads in rows", () => {
  const ids = topLevelFrames(file).map((f) => f.id);
  assert.deepEqual(ids, ["1:1", "1:2", "1:3", "2:1", "2:2", "1:5"]);
});

test("pickFrames uses the first screens and skips style/token boards", () => {
  const picks = pickFrames(topLevelFrames(file));
  assert.deepEqual(picks.steps.map((f) => f.name), ["Welcome", "Home", "Search", "Cart"]);
  assert.deepEqual(picks.cover.map((f) => f.name), ["Welcome", "Home", "Search"]);
  assert.equal(picks.hero.length, 4);
});

test("pickFrames honours frames named cover and hero", () => {
  const frames = [frame("a", "cover", 0, 0, 1200, 700), frame("b", "Hero", 0, 900, 1600, 900), frame("c", "Login", 0, 2000)];
  const picks = pickFrames(frames);
  assert.equal(picks.cover[0].id, "a");
  assert.equal(picks.hero[0].id, "b");
  assert.deepEqual(picks.steps.map((f) => f.id), ["c"]);
});

test("inspectNodes collects text, ranks colors and fonts", () => {
  const solid = (r, g, b) => ({ type: "SOLID", color: { r, g, b, a: 1 } });
  const nodes = [{
    fills: [solid(1, 1, 1)],
    children: [
      { type: "TEXT", characters: "Book a trip", style: { fontFamily: "Lora" }, fills: [solid(0, 0, 0)] },
      { type: "TEXT", characters: "Search flights and hotels", style: { fontFamily: "Poppins" }, fills: [solid(0, 0, 0)] },
      { type: "TEXT", characters: "hidden", visible: false },
    ],
  }];
  const out = inspectNodes(nodes);
  assert.deepEqual(out.texts, ["Book a trip", "Search flights and hotels"]);
  assert.equal(out.colors[0], "#000000");
  assert.deepEqual(out.fonts, ["Poppins", "Lora"]);
});
