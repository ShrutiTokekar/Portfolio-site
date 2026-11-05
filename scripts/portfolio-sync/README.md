# Portfolio sync

A small bot that keeps shrutitokekar.com in step with GitHub and Figma. It runs in
GitHub Actions (`.github/workflows/portfolio-sync.yml`) every hour, so there is no
server to host. When it changes something, it commits to `main` and Vercel redeploys.

| What happens | What the bot does |
| --- | --- |
| You create a new public repo | Adds a card to **/projects** (name, 1–2 sentence summary of the README, tech stack, category, GitHub link) |
| You change a repo's README | Rewrites that card's description and tech stack from the new README |
| You create a new Figma design file | Opens a GitHub issue: *"Add it to the portfolio?"* |
| You reply `/add` on that issue | Builds a case study on **/design**: cover, hero and step images exported from the file, plus overview, process, key decision, palette and fonts written by Claude |
| You reply `/skip` | Closes the issue; the file is never offered again |
| You edit a Figma file the bot added | Re-exports its images |

Repos and Figma files that already exist when the bot first runs are **not** added.
It only reacts to new ones from then on.

## One-time setup

All of this is in the Portfolio-site repo on GitHub: **Settings → Secrets and variables → Actions**.

1. **`ANTHROPIC_API_KEY`** (secret, recommended). Used to write the summaries and
   case studies. Create one at <https://console.anthropic.com/settings/keys>.
   Without it the bot still works, but uses the first paragraph of the README
   and a bare case study template instead.
2. **`FIGMA_TOKEN`** (secret, needed for Figma). In Figma: avatar → *Settings* →
   *Security* → *Personal access tokens*. Give it read access to **File content**,
   **File metadata** and **Projects**.
3. **`FIGMA_TEAM_IDS`** (variable, needed for Figma). Open your team in Figma; the
   URL looks like `figma.com/files/team/1234567890/...`. The number is the team ID.
   Use commas to separate several. Use `FIGMA_PROJECT_IDS` instead to watch only
   certain projects.
4. **Actions → Portfolio sync → Run workflow** once. The first run only records
   what exists today and commits `state.json`.

> **Figma drafts aren't visible to the API.** Only files inside a team project are
> found. Move a file out of *Drafts* into a project for the bot to see it.

GitHub needs nothing extra: the workflow's built-in token can read your public repos
and open issues.

## Controlling what it does

- **Keep your own wording on a card:** add `"locked": true` to that entry in
  `src/data/projects.json`. README changes then won't touch it.
- **Never add a repo:** add its name to `ignoreRepos` in `config.json`.
- **Edit a generated case study:** edit `src/data/caseStudies.generated.json`. To
  take it over completely, move the entry into `src/data/caseStudies.js`.
- **Choose the Figma images:** name a frame `cover` or `hero`. Otherwise the first
  four screens on the first page become steps 1–4, and the cover and hero are
  collages of the first few screens.
- **Give the case study context:** write it after `/add` in your comment (who it was
  for, your role, the category). Claude treats that as the source of truth.
- **Faster than hourly:** *Actions → Portfolio sync → Run workflow*.

## Running it locally

```bash
cd scripts/portfolio-sync
npm install
npm test
GITHUB_TOKEN=$(gh auth token) DRY_RUN=1 node sync.mjs github
```

`DRY_RUN=1` prints what would change without writing files or opening issues.
