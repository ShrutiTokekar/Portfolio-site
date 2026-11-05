// Minimal GitHub REST client (Node's built-in fetch, no extra dependency).
const API = "https://api.github.com";

function headers() {
  const h = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-sync",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function gh(pathname, { method = "GET", body, allow404 = false } = {}) {
  const res = await fetch(pathname.startsWith("http") ? pathname : API + pathname, {
    method,
    headers: { ...headers(), ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (allow404 && res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${method} ${pathname} → ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

/** Public, non-fork, non-archived repos owned by `owner`. */
export async function listRepos(owner) {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await gh(`/users/${owner}/repos?type=owner&per_page=100&page=${page}`);
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos.filter((r) => !r.fork && !r.archived && !r.private);
}

/** { sha, text } for the repo's README, or null if it has none. */
export async function getReadme(fullName) {
  const data = await gh(`/repos/${fullName}/readme`, { allow404: true });
  if (!data) return null;
  return { sha: data.sha, text: Buffer.from(data.content, "base64").toString("utf8") };
}

/** Languages sorted by bytes of code, most first. */
export async function getLanguages(fullName) {
  const data = (await gh(`/repos/${fullName}/languages`)) ?? {};
  return Object.entries(data).sort((a, b) => b[1] - a[1]).map(([lang]) => lang);
}

// ── Issues on the portfolio repo (used for Figma approvals) ──────────────────
const portfolioRepo = () => process.env.GITHUB_REPOSITORY;

export async function ensureLabel(name, color, description) {
  const existing = await gh(`/repos/${portfolioRepo()}/labels/${encodeURIComponent(name)}`, { allow404: true });
  if (!existing) {
    await gh(`/repos/${portfolioRepo()}/labels`, { method: "POST", body: { name, color, description } });
  }
}

export const createIssue = (title, body, labels) =>
  gh(`/repos/${portfolioRepo()}/issues`, { method: "POST", body: { title, body, labels } });

export const commentOnIssue = (number, body) =>
  gh(`/repos/${portfolioRepo()}/issues/${number}/comments`, { method: "POST", body: { body } });

export const closeIssue = (number, reason = "completed") =>
  gh(`/repos/${portfolioRepo()}/issues/${number}`, {
    method: "PATCH",
    body: { state: "closed", state_reason: reason },
  });
