// Writing helpers. Uses Claude when ANTHROPIC_API_KEY is set; otherwise falls
// back to simple text heuristics so the sync still works without a key.
// The SDK and zod are loaded only when a key is set, so the no-key fallback
// (and the tests) need no dependencies.
import { config } from "./common.mjs";

const hasKey = () => Boolean(process.env.ANTHROPIC_API_KEY);
let sdk;
async function loadSdk() {
  if (sdk) return sdk;
  const [{ default: Anthropic }, { zodOutputFormat }, { z }] = await Promise.all([
    import("@anthropic-ai/sdk"),
    import("@anthropic-ai/sdk/helpers/zod"),
    import("zod"),
  ]);
  sdk = { client: new Anthropic(), zodOutputFormat, schemas: buildSchemas(z) };
  return sdk;
}

const MAX_README_CHARS = 60_000;

async function ask({ system, content, schemaName, effort }) {
  const { client, zodOutputFormat, schemas } = await loadSdk();
  const response = await client.messages.parse({
    model: config.model,
    max_tokens: 16000,
    output_config: { effort, format: zodOutputFormat(schemas[schemaName]) },
    system,
    messages: [{ role: "user", content }],
  });
  if (response.stop_reason === "refusal" || !response.parsed_output) {
    throw new Error(`Claude returned no usable output (stop_reason: ${response.stop_reason})`);
  }
  return response.parsed_output;
}

// ── GitHub repo → project card ───────────────────────────────────────────────

function buildSchemas(z) {
const RepoCard = z.object({
  name: z.string().describe("Card title, e.g. 'Shelf Life - Pantry & grocery app'"),
  description: z.string().describe("1-2 sentences, under 260 characters"),
  techStack: z.array(z.string()).describe("3-7 main technologies"),
  category: z.enum(config.githubCategories),
});
const Hex = z.string().describe("#RRGGBB");
const CaseStudy = z.object({
  title: z.string(),
  subtitle: z.string().describe("2-3 words, e.g. 'Travel App'"),
  category: z.enum(config.designCategories),
  status: z.string().describe("'' if the file looks finished, otherwise e.g. 'In progress'"),
  summary: z.string().describe("One sentence for the card, under 200 characters"),
  role: z.string(),
  tools: z.array(z.string()).describe("2-4 tools shown on the card"),
  toolsFull: z.string(),
  overview: z.object({
    heading: z.string().describe("A short, punchy line naming the problem"),
    body: z.string().describe("2-3 sentences: who it's for and what problem it solves"),
  }),
  processLabel: z.string().describe("Section label, e.g. 'The process' or 'The screens'"),
  processHeading: z.string(),
  process: z
    .array(
      z.object({
        label: z.string().describe("1-3 words"),
        text: z.string().describe("1-2 sentences about what the matching image shows"),
        chips: z.array(z.string()).describe("0-6 short tags; [] for none"),
      })
    )
    .describe("Exactly one step per STEP image, in the same order"),
  decision: z.object({
    title: z.string().describe("One key design decision, as a short statement"),
    body: z.string().describe("2-3 sentences on why"),
  }),
  outcome: z.string().describe("One sentence on what exists now"),
  palette: z.object({
    bg: Hex.describe("Soft background for the card cover"),
    surface: Hex,
    accent: Hex,
    ink: Hex,
  }),
  designSystem: z.object({
    colors: z.array(z.object({ name: z.string(), hex: Hex })).describe("4-12 named brand colors"),
    fonts: z.array(z.object({ name: z.string(), role: z.string() })),
  }),
});
return { RepoCard, CaseStudy };
}

const CARD_SYSTEM = `You write project cards for a developer's portfolio site.
Given a GitHub repository's README and metadata, return:
- name: "<Project name> - <short what-it-is>" (keep any product name the README uses).
- description: one or two plain sentences saying what the project is and what makes it technically interesting. Under 260 characters. No marketing fluff, no emoji, no markdown, no "This project...".
- techStack: the 3-7 most important languages, frameworks and services actually used.
- category: the single best fit.
If the README is empty or uninformative, infer carefully from the repo name, description and languages, and keep the description modest.`;

/**
 * @param {{ repo: object, readme: string|null, languages: string[] }} input
 * @returns {Promise<{name:string, description:string, techStack:string[], category:string}>}
 */
export async function summarizeRepo({ repo, readme, languages }) {
  if (!hasKey()) return heuristicCard({ repo, readme, languages });
  const truncated = readme && readme.length > MAX_README_CHARS;
  const content = [
    `Repository: ${repo.full_name}`,
    `GitHub description: ${repo.description ?? "(none)"}`,
    `Topics: ${(repo.topics ?? []).join(", ") || "(none)"}`,
    `Languages (most code first): ${languages.join(", ") || "(unknown)"}`,
    `Homepage: ${repo.homepage || "(none)"}`,
    "",
    truncated ? `README (first ${MAX_README_CHARS} characters of a longer file):` : "README:",
    readme ? readme.slice(0, MAX_README_CHARS) : "(no README)",
  ].join("\n");
  try {
    return await ask({ system: CARD_SYSTEM, content, schemaName: "RepoCard", effort: "low" });
  } catch (err) {
    console.warn(`Claude summary failed for ${repo.full_name}, using heuristic:`, err.message);
    return heuristicCard({ repo, readme, languages });
  }
}

export function cleanReadme(md = "") {
  return md
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images / badges
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → text
    .replace(/[*_`>#|]/g, "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 40 && !/^(table of contents|installation|license|getting started)/i.test(p));
}

function guessCategory(languages, text) {
  const t = `${languages.join(" ")} ${text}`.toLowerCase();
  const has = (...w) => w.some((x) => t.includes(x));
  if (has("react", "next", "vue", "svelte") && has("api", "backend", "server", "database", "postgres", "spring", "express", "python", "go"))
    return "Full Stack";
  if (has("c++", " c ", "rust", "assembly", "kernel", "scheduler", "sdl") || languages[0] === "C") return "Systems";
  if (has("html", "css", "react", "next", "typescript", "javascript", "vue", "svelte")) return "Frontend";
  return "Backend";
}

const BUILD_FILES = new Set(["Makefile", "Dockerfile", "CMake", "Procfile", "Batchfile", "PowerShell", "Nix", "Starlark"]);

function heuristicCard({ repo, readme, languages }) {
  const paragraphs = cleanReadme(readme ?? "");
  let description = repo.description || paragraphs[0] || `${repo.name} — source on GitHub.`;
  if (description.length > 260) description = description.slice(0, 257).replace(/\s+\S*$/, "") + "…";
  description = description.charAt(0).toUpperCase() + description.slice(1);
  if (!/[.!?…]$/.test(description)) description += ".";
  const title = repo.name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    name: title,
    description,
    techStack: languages.filter((l) => !BUILD_FILES.has(l)).slice(0, 5),
    category: guessCategory(languages, `${repo.description ?? ""} ${readme ?? ""}`),
  };
}

// ── Figma file → design case study ───────────────────────────────────────────


const CASE_SYSTEM = `You write short UX case studies for a designer-developer's portfolio site, from a Figma file.
You get screenshots of the file's frames (labelled COVER, HERO, STEP 1..n), the text found on those frames, the colors and fonts used, and optional notes from the designer.
Write in the same voice as the example case study: first person, plain and specific, short sentences, no buzzwords, no emoji. Only claim what the screens and notes support; don't invent research, metrics or user quotes. If the designer's notes contradict the screens, trust the notes.
The process array must have exactly one step per STEP image, in order, each describing what that image shows.
Some STEP images may be user flows from a FigJam board (they say so in their label). For those, label the step "User flow" (or similar) and summarise the flow's main paths and decision points, using the FigJam text provided.
For designSystem.colors, give the main brand colors with friendly names (e.g. "Terracotta"), using hex values from the provided list. For fonts, use the families provided and name their role (Display, Headings, Body, Interface).`;

/**
 * @param {{ fileName: string, notes: string, texts: string[], colors: string[], fonts: string[],
 *           images: {label: string, base64: string}[], example: string, stepCount: number }} input
 */
export async function writeCaseStudy(input) {
  if (!hasKey()) return heuristicCaseStudy(input);
  const content = [];
  for (const img of input.images) {
    content.push({ type: "text", text: img.label });
    content.push({ type: "image", source: { type: "base64", media_type: "image/webp", data: img.base64 } });
  }
  content.push({
    type: "text",
    text: [
      `Figma file name: ${input.fileName}`,
      `Number of STEP images: ${input.stepCount}`,
      `Designer's notes: ${input.notes || "(none)"}`,
      `Fonts used: ${input.fonts.join(", ") || "(unknown)"}`,
      `Colors used (most used first): ${input.colors.join(", ")}`,
      `Text on the frames:\n${input.texts.join("\n") || "(none)"}`,
      ...(input.flowTexts?.length ? [`Text on the FigJam user flow:\n${input.flowTexts.join("\n")}`] : []),
      "",
      "Example case study from the same site, for voice and length:",
      input.example,
    ].join("\n"),
  });
  try {
    const study = await ask({ system: CASE_SYSTEM, content, schemaName: "CaseStudy", effort: "medium" });
    study.process = study.process.slice(0, input.stepCount);
    return study;
  } catch (err) {
    console.warn("Claude case study failed, using a basic template:", err.message);
    return heuristicCaseStudy(input);
  }
}

function heuristicCaseStudy({ fileName, notes, colors, fonts, stepCount, stepNames = [] }) {
  const title = fileName.replace(/\s*[—–-]\s*(hi-?fi|lo-?fi|wireframes?|mockups?|design).*$/i, "").trim() || fileName;
  const [bg = "#F5F3EF", accent = "#C9BFD8", ink = "#1A1815"] = colors;
  return {
    title,
    subtitle: "Design",
    category: "UI/UX",
    status: "",
    summary: notes ? notes.split(/\n/)[0].slice(0, 200) : `${title}, designed in Figma.`,
    role: "UX/UI designer",
    tools: ["Figma"],
    toolsFull: "Figma",
    overview: { heading: title, body: notes || `Screens from the ${fileName} Figma file.` },
    processLabel: "The screens",
    processHeading: "The main screens.",
    process: Array.from({ length: stepCount }, (_, i) => ({
      label: stepNames[i] || `Screen ${i + 1}`,
      text: "",
      chips: [],
    })),
    decision: null,
    outcome: "",
    palette: { bg, surface: "#FFFFFF", accent, ink },
    designSystem: {
      colors: colors.slice(0, 8).map((hex, i) => ({ name: `Color ${i + 1}`, hex })),
      fonts: fonts.map((name, i) => ({ name, role: i === 0 ? "Headings" : "Body" })),
    },
  };
}
