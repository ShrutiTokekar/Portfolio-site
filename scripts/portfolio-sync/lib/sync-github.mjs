// New public repo → new card at the top of /projects.
// README changed on a repo that has a card → card description (and tech stack)
// rewritten from the new README. Cards with "locked": true are never touched.
import { config, paths, readJson, writeJson, loadState, saveState, sameRepo, logChange, DRY_RUN } from "./common.mjs";
import { listRepos, getReadme, getLanguages } from "./github.mjs";
import { summarizeRepo } from "./ai.mjs";

export async function syncGithub() {
  const state = loadState();
  const projects = readJson(paths.projects);
  const repos = await listRepos(config.owner);
  const ignored = new Set(config.ignoreRepos.map((r) => r.toLowerCase()));
  const cardFor = (fullName) => projects.find((p) => sameRepo(p.repo, fullName));
  let changed = false;

  // First run: remember every repo that already exists so only repos created
  // from now on get new cards, and existing cards keep your wording until
  // their README actually changes.
  if (!state.bootstrapped.github) {
    for (const repo of repos) {
      const readme = await getReadme(repo.full_name);
      state.github[repo.full_name] = {
        readmeSha: readme?.sha ?? null,
        onSite: Boolean(cardFor(repo.full_name)),
        createdAt: repo.created_at,
        pushedAt: repo.pushed_at,
      };
    }
    state.bootstrapped.github = true;
    const skipped = repos.filter((r) => !cardFor(r.full_name)).map((r) => r.name);
    logChange(
      `Started tracking ${repos.length} GitHub repos.` +
        (skipped.length ? ` Existing repos not on the site (left off): ${skipped.join(", ")}.` : "")
    );
    saveState(state);
    return true;
  }

  for (const repo of repos) {
    if (ignored.has(repo.name.toLowerCase())) continue;
    const known = state.github[repo.full_name];
    const card = cardFor(repo.full_name);

    // Brand-new repo → add a card.
    if (!known && !card) {
      const readme = await getReadme(repo.full_name);
      const languages = await getLanguages(repo.full_name);
      const summary = await summarizeRepo({ repo, readme: readme?.text ?? null, languages });
      projects.unshift({
        repo: repo.full_name,
        name: summary.name,
        description: summary.description,
        techStack: summary.techStack,
        link: repo.html_url,
        year: String(new Date(repo.created_at).getFullYear()),
        category: summary.category,
      });
      state.github[repo.full_name] = { readmeSha: readme?.sha ?? null, onSite: true, createdAt: repo.created_at, pushedAt: repo.pushed_at };
      logChange(`Added card for new repo ${repo.full_name}`);
      changed = true;
      continue;
    }

    // Repo that existed before the bot and isn't on the site: leave it alone.
    if (!card) continue;

    // Card added by hand since the last run: start tracking it.
    if (!known) {
      const readme = await getReadme(repo.full_name);
      state.github[repo.full_name] = { readmeSha: readme?.sha ?? null, onSite: true, createdAt: repo.created_at, pushedAt: repo.pushed_at };
      changed = true;
      continue;
    }

    // Cheap check first: nothing pushed since we last looked → README can't have changed.
    if (known.pushedAt === repo.pushed_at) continue;
    known.pushedAt = repo.pushed_at;
    changed = true;

    const readme = await getReadme(repo.full_name);
    if (!readme || readme.sha === known.readmeSha) continue;
    known.readmeSha = readme.sha;
    if (card.locked) continue;

    const languages = await getLanguages(repo.full_name);
    const summary = await summarizeRepo({ repo, readme: readme.text, languages });
    card.description = summary.description;
    card.techStack = summary.techStack;
    logChange(`Updated ${card.name} from its new README`);
  }

  if (changed && !DRY_RUN) writeJson(paths.projects, projects);
  if (DRY_RUN) console.log(JSON.stringify(projects.slice(0, 3), null, 2));
  saveState(state);
  return changed;
}
