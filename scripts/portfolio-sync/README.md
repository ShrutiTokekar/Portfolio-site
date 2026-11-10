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
| You paste a FigJam link after `/add` | Renders the board (one image per Section) as a **User flow** step before the screens, described from the board's text |
| You create a new FigJam board | Nothing on its own: boards don't get an issue. Attach one with its link after `/add` |
| You reply `/skip` | Closes the issue; the file is never offered again |
| You edit a Figma file the bot added | Re-exports its images |

**First run catches up once.** Existing public repos that aren't on the site get
cards, and existing Figma design files that aren't on the site each get an "Add it?"
issue. Projects already on the site are left exactly as they are. After that first
run, only new repos and files are picked up. Set `"catchUpOnFirstRun": false` in
`config.json` before the first run to skip the catch-up.

## One-time setup

All of this is in the Portfolio-site repo on GitHub: **Settings → Secrets and variables → Actions**.

1. **`ANTHROPIC_API_KEY`** (secret, recommended). Used to write the summaries and
   case studies. Create one at <https://console.anthropic.com/settings/keys>.
   Without it the bot still works, but uses the first paragraph of the README
   and a bare case study template instead.
2. **`FIGMA_TOKEN`** (secret, needed for Figma). In Figma: avatar → *Settings* →
   *Security* → *Personal access tokens*. Give it read access to **File content**,
   **File metadata** and **Folders** (`folders:read`, which lets it list your team's folders).
3. **`FIGMA_TEAM_IDS`** (variable, needed for Figma). Open your team in Figma; the
   URL looks like `figma.com/files/team/1234567890/...`. The number is the team ID.
   Use commas to separate several. Use `FIGMA_PROJECT_IDS` instead to watch only
   certain projects.
4. Before the first run, move any old Figma designs you want considered out of
   *Drafts* into a team folder. Add repos you never want shown to `ignoreRepos`.
5. **Actions → Portfolio sync → Run workflow** once. This run does the catch-up and
   commits `state.json`. From then on it runs hourly on its own.

> **Figma drafts aren't visible to the API.** Only files inside a team folder are
> found. Create new designs inside a folder (e.g. *Team project*), or move them out
> of *Drafts*. Files moved in later count as new and get an issue.

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
- **Include a FigJam user flow:** paste the board's link (`figma.com/board/...`) after
  `/add`. Group the flow into one or two **Sections** on the board. Each Section
  becomes one image (the two largest are used). A board with no Sections is
  rendered as a whole page, which Figma can refuse for very large boards.
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
