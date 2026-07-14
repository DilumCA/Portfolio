import { motion } from 'framer-motion';
import { FiCheckCircle, FiBook } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import profile from '../data/profile.json';
import dilumImg from '../assets/dilum2.png';

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description={`Learn more about ${profile.name} — ${profile.title} based in ${profile.location}.`}
        path="/about"
      />
      <Section>
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Photo */}
          <motion.div
            className="lg:col-span-2 flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={dilumImg}
                alt={`${profile.name} profile photo`}
                className="w-56 md:w-72 h-auto rounded-2xl shadow-card-hover"
              />
              <span className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full text-xs font-semibold text-pass-600 dark:text-emerald-400 border border-pass-500/20 shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pass-500 animate-pulse" />
                {profile.availability}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-3">
            <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
              About
            </span>
            <h1 className="heading-lg mb-4">{profile.name}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium mb-6">{profile.title}</p>
            <p className="text-body leading-relaxed mb-8">{profile.summary}</p>

            {/* Values */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                What I believe
              </h3>
              <ul className="space-y-2">
                {profile.values.map((v, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-body text-sm">
                    <FiCheckCircle size={14} className="text-accent-500 shrink-0 mt-0.5" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map(lang => (
                  <Badge key={lang} variant="neutral">{lang}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section alt id="education">
        <SectionHeader label="Background" title="Education" />
        <div className="space-y-6 max-w-2xl mx-auto">
          {profile.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="card-base p-6 flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <FiBook className="text-accent-600 dark:text-accent-400" size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm leading-tight">
                    {edu.degree}
                  </h3>
                  {edu.current && (
                    <Badge variant="pass">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mb-1">
                  {edu.institution}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{edu.period}</p>
                {edu.gpa && (
                  <p className="text-xs text-slate-600 dark:text-slate-300">GPA: <strong>{edu.gpa}</strong></p>
                )}
                {edu.grade && (
                  <p className="text-xs text-slate-600 dark:text-slate-300">Result: <strong>{edu.grade}</strong></p>
                )}
                {edu.subjects && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {edu.subjects.map(s => (
                      <span key={s.name} className="text-xs text-slate-500 dark:text-slate-400">
                        {s.name}: <strong className="text-slate-700 dark:text-slate-300">{s.grade}</strong>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
