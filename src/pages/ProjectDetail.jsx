import { useParams, Link, Navigate } from 'react-router-dom';
import { FiArrowLeft, FiGithub, FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Badge, TestBadge } from '../components/ui/Badge';
import { isTodo } from '../utils/formatters';
import projects from '../data/projects.json';

function DetailSection({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ListItems({ items, icon: Icon = FiCheckCircle }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-body text-sm">
          <Icon size={14} className="text-accent-500 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        path={`/projects/${project.id}`}
      />

      <div className="bg-white dark:bg-slate-900 min-h-screen">
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="container-narrow px-4 md:px-8 py-8 md:py-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 transition-colors mb-6"
            >
              <FiArrowLeft size={14} />
              All Projects
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="neutral">{project.category}</Badge>
              {project.testBadge && <TestBadge label={project.testBadge} />}
              <Badge variant="neutral">{project.teamType}</Badge>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pass-50 text-pass-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                {project.status}
              </span>
            </div>

            <motion.h1
              className="heading-lg mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {project.title}
            </motion.h1>
            <p className="text-body text-base md:text-lg max-w-2xl mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Role:</span>
                {project.role}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              {!isTodo(project.githubUrl) && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2"
                >
                  <FiGithub size={15} />
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm py-2"
                >
                  <FiExternalLink size={15} />
                  Live Demo
                </a>
              )}
              {isTodo(project.githubUrl) && (
                <span className="text-xs text-amber-600 dark:text-amber-400 italic">
                  GitHub link coming soon
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-narrow px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              {project.testingApproach?.length > 0 && (
                <DetailSection title="Testing Approach">
                  <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800 rounded-xl p-5 mb-4">
                    <ListItems items={project.testingApproach} icon={FiCheckCircle} />
                  </div>
                </DetailSection>
              )}

              {project.features?.length > 0 && (
                <DetailSection title="Key Features">
                  <ListItems items={project.features} />
                </DetailSection>
              )}

              {project.architecture && (
                <DetailSection title="Architecture">
                  <p className="text-body text-sm leading-relaxed">{project.architecture}</p>
                </DetailSection>
              )}

              {project.challenges?.length > 0 && (
                <DetailSection title="Challenges">
                  <ListItems items={project.challenges} />
                </DetailSection>
              )}

              {project.solutions?.length > 0 && (
                <DetailSection title="Solutions">
                  <ListItems items={project.solutions} />
                </DetailSection>
              )}

              {project.lessonsLearned?.length > 0 && (
                <DetailSection title="Lessons Learned">
                  <ListItems items={project.lessonsLearned} />
                </DetailSection>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="card-base p-5">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <Badge key={tech} variant="tech">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="card-base p-5">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Project Info
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Category</dt>
                    <dd className="text-slate-700 dark:text-slate-300 font-medium">{project.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Status</dt>
                    <dd className="text-pass-600 dark:text-emerald-400 font-medium">{project.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500 dark:text-slate-400">Type</dt>
                    <dd className="text-slate-700 dark:text-slate-300 font-medium">{project.teamType}</dd>
                  </div>
                  {project.testBadge && (
                    <div className="flex justify-between">
                      <dt className="text-slate-500 dark:text-slate-400">Testing</dt>
                      <dd><TestBadge label={project.testBadge} /></dd>
                    </div>
                  )}
                </dl>
              </div>

              <Link
                to="/projects"
                className="block text-center btn-ghost border border-slate-200 dark:border-slate-700 text-sm"
              >
                ← Back to all projects
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
