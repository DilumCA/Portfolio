import { Link } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Badge, TestBadge } from './ui/Badge';
import { isTodo } from '../utils/formatters';

export function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-base flex flex-col group"
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="neutral">{project.category}</Badge>
            {project.testBadge && <TestBadge label={project.testBadge} />}
          </div>
          {project.featured && (
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-body flex-1 mb-4 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 5).map(tech => (
            <Badge key={tech} variant="tech">{tech}</Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="neutral">+{project.technologies.length - 5}</Badge>
          )}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <Link
            to={`/projects/${project.id}`}
            className="btn-ghost px-0 text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-700"
          >
            Case Study <FiArrowRight className="inline ml-1" size={14} />
          </Link>
          <div className="flex gap-3 ml-auto">
            {!isTodo(project.githubUrl) && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View GitHub repository"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <FiGithub size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live project"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <FiExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
