import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiShield } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import experience from '../data/experience.json';

export default function Experience() {
  return (
    <>
      <SEO
        title="Experience"
        description="Professional experience as a Software Engineering Intern at SLT-Mobitel with API testing, OWASP ZAP security testing, and Agile development."
        path="/experience"
      />
      <Section>
        <SectionHeader
          label="Career"
          title="Experience"
          description="Professional work history with emphasis on quality assurance activities and testing responsibilities."
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card-base p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-9 h-9 rounded-lg bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0">
                      <FiBriefcase className="text-accent-600 dark:text-accent-400" size={16} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-50 text-base leading-tight">
                        {job.role}
                      </h3>
                      <p className="text-accent-600 dark:text-accent-400 font-semibold text-sm">
                        {job.company} — {job.division}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                  <span className="flex items-center gap-1.5">
                    <FiCalendar size={12} />
                    {job.period} ({job.duration})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiMapPin size={12} />
                    {job.location}
                  </span>
                  <Badge variant="neutral">{job.type}</Badge>
                </div>
              </div>

              <p className="text-body text-sm mb-5">{job.description}</p>

              {/* QA Highlights — prominent */}
              {job.qaHighlights?.length > 0 && (
                <div className="mb-5 bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FiShield size={14} className="text-accent-600 dark:text-accent-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
                      QA & Testing Activities
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {job.qaHighlights.map((h, j) => (
                      <li key={j} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-accent-500 shrink-0 mt-0.5">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All highlights */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Responsibilities
                </h4>
                <ul className="space-y-1.5">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="text-sm text-body flex items-start gap-2">
                      <span className="text-slate-400 shrink-0 mt-0.5">•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {job.technologies.map(tech => (
                    <Badge key={tech} variant="tech">{tech}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
