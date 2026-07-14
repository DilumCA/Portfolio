const USERNAME = 'DilumCA';
const CACHE_KEY = 'gh_repos';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export async function fetchPublicRepos() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const { ts, data } = JSON.parse(cached);
    if (Date.now() - ts < CACHE_TTL) return data;
  }

  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=20`,
    { headers: { Accept: 'application/vnd.github.v3+json' } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const data = await res.json();
  const filtered = data
    .filter(r => !r.fork)
    .map(r => ({
      id: r.id,
      name: r.name,
      description: r.description,
      url: r.html_url,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      updatedAt: r.updated_at,
      topics: r.topics ?? [],
    }));

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: filtered }));
  return filtered;
}
