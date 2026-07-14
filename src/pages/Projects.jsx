import { useState, useMemo } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { ProjectCard } from '../components/ProjectCard';
import { Section, SectionHeader } from '../components/ui/Section';
import { cn } from '../utils/cn';
import projects from '../data/projects.json';

const ALL = 'All';
const categories = [ALL, ...new Set(projects.map(p => p.category))];
const allTechs = [...new Set(projects.flatMap(p => p.technologies))].sort();

export default function Projects() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [activeTech, setActiveTech] = useState(ALL);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchCat = activeCategory === ALL || p.category === activeCategory;
      const matchTech = activeTech === ALL || p.technologies.includes(activeTech);
      const q = query.toLowerCase();
      const matchQuery = !q
        || p.title.toLowerCase().includes(q)
        || p.description.toLowerCase().includes(q)
        || p.technologies.some(t => t.toLowerCase().includes(q));
      return matchCat && matchTech && matchQuery;
    }).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [query, activeCategory, activeTech]);

  return (
    <>
      <SEO
        title="Projects"
        description="QA automation frameworks, cloud infrastructure, and full-stack projects by Dilum Andradi."
        path="/projects"
      />
      <Section>
        <SectionHeader
          label="Portfolio"
          title="Projects"
          description="From BDD automation frameworks to cloud infrastructure — all projects reflect a quality-first mindset."
        />

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="search"
              placeholder="Search projects, technologies…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="input-base pl-9"
              aria-label="Search projects"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <FiFilter size={14} className="text-slate-400 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                  activeCategory === cat
                    ? 'bg-accent-600 border-accent-600 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-accent-400'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-slate-400 shrink-0">Tech:</span>
            {[ALL, ...allTechs].map(tech => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                  activeTech === tech
                    ? 'bg-accent-600 border-accent-600 text-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-accent-400'
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-body">
            <p className="text-lg mb-2">No projects match your filters.</p>
            <button className="link-accent text-sm" onClick={() => { setQuery(''); setActiveCategory(ALL); setActiveTech(ALL); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-6">
              Showing {filtered.length} of {projects.length} projects
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
