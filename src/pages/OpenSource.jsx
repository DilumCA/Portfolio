import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { RepoSkeleton } from '../components/ui/LoadingSkeleton';
import { fetchPublicRepos } from '../services/github.js';

function RepoCard({ repo, index }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="card-base p-5 flex flex-col group hover:border-accent-300 dark:hover:border-accent-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors truncate">
          {repo.name}
        </h3>
        <FiExternalLink size={14} className="shrink-0 text-slate-400 group-hover:text-accent-500 transition-colors" />
      </div>
      {repo.description && (
        <p className="text-xs text-body mb-3 line-clamp-2 flex-1">{repo.description}</p>
      )}
      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-auto">
        {repo.language && <Badge variant="neutral">{repo.language}</Badge>}
        <span className="flex items-center gap-1">
          <FiStar size={12} />
          {repo.stars}
        </span>
        <span className="flex items-center gap-1">
          <FiGitBranch size={12} />
          {repo.forks}
        </span>
      </div>
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {repo.topics.slice(0, 3).map(t => (
            <Badge key={t} variant="tech" className="text-[10px]">{t}</Badge>
          ))}
        </div>
      )}
    </motion.a>
  );
}

export default function OpenSource() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublicRepos()
      .then(setRepos)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO
        title="Open Source / GitHub"
        description="Public GitHub repositories by Dilum Andradi — github.com/DilumCA"
        path="/open-source"
      />
      <Section>
        <SectionHeader
          label="GitHub"
          title="Open Source & Public Repos"
          description="Public repositories from github.com/DilumCA — fetched live."
        />

        {loading && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => <RepoSkeleton key={i} />)}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <FiAlertCircle size={32} className="mx-auto text-red-400 mb-3" />
            <p className="text-body mb-2">Couldn&apos;t load repositories right now.</p>
            <p className="text-xs text-slate-400 mb-4">{error}</p>
            <a
              href="https://github.com/DilumCA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
            >
              Visit GitHub profile directly
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <p className="text-center text-body py-12">No public repositories found.</p>
        )}

        {!loading && !error && repos.length > 0 && (
          <>
            <p className="text-xs text-slate-400 mb-6">{repos.length} public repositories</p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="https://github.com/DilumCA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View all on GitHub
              </a>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
