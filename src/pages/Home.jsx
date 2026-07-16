import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SEO } from '../components/SEO';
import { ProjectCard } from '../components/ProjectCard';
import { Section, SectionHeader } from '../components/ui/Section';
import { HeroQAScene } from '../components/HeroQAScene';
import profile from '../data/profile.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import socialLinks from '../data/social-links.json';
import CV from '../assets/DiumAndradi_CV.pdf';

const iconMap = { FaLinkedin, FaGithub, FaEnvelope };

const featuredProjects = projects.filter(p => p.featured);
const totalTechs = skills.reduce((acc, cat) => acc + cat.skills.length, 0);
const qaSkills = skills.find(c => c.category === 'Testing Types')?.skills ?? [];

const stats = [
  { value: projects.length, label: 'Projects' },
  { value: totalTechs, label: 'Technologies' },
  { value: 6, label: 'Months Experience' },
];

export default function Home() {
  return (
    <>
      <SEO
        title="QA Engineer Portfolio"
        description={profile.summary}
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center bg-white dark:bg-slate-900 overflow-hidden">
        {/* Subtle glow behind 3D scene */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[640px] h-[640px] rounded-full bg-accent-100 dark:bg-accent-900/25 blur-3xl opacity-40 translate-x-1/4 -translate-y-1/4 pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-14">

            {/* ── Left: text ── */}
            <div>
              {/* Availability badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pass-50 dark:bg-emerald-900/30 text-pass-600 dark:text-emerald-400 text-xs font-semibold border border-pass-500/20">
                  <span className="w-2 h-2 rounded-full bg-pass-500 animate-pulse" />
                  {profile.availability}
                </span>
              </motion.div>

              <motion.h1
                className="heading-xl mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
              >
                Hi, I&apos;m{' '}
                <span className="text-accent-600 dark:text-accent-400">{profile.name}</span>
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              >
                {profile.title}
              </motion.p>

              <motion.p
                className="text-lg italic text-accent-600 dark:text-accent-400 mb-6 font-medium"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
              >
                &ldquo;{profile.tagline}&rdquo;
              </motion.p>

              <motion.p
                className="text-body text-base md:text-lg mb-8 max-w-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
              >
                {profile.summary}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.25 }}
              >
                <a href={CV} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FiDownload size={16} />
                  Download Resume
                </a>
                <Link to="/contact" className="btn-outline">
                  Get in Touch
                  <FiArrowRight size={16} />
                </Link>
              </motion.div>

              {/* Socials */}
              <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                {socialLinks.map(link => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.platform !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="p-2.5 rounded-lg text-slate-500 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors"
                    >
                      {Icon && <Icon size={20} />}
                    </a>
                  );
                })}
                <span className="ml-2 flex items-center gap-1.5 text-sm text-slate-400">
                  <FiMapPin size={14} />
                  {profile.location}
                </span>
              </motion.div>
            </div>

            {/* ── Right: Three.js QA scene ── */}
            <motion.div
              className="hidden sm:flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <div className="w-full h-[380px] lg:h-[520px]">
                <HeroQAScene />
              </div>
              {/* Node-state legend */}
              <div className="flex items-center gap-5 text-xs text-slate-400 dark:text-slate-500 select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Pass
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Running / Fixing
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Fail
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats strip */}
      {/* <div className="bg-accent-600 dark:bg-accent-700">
        <div className="container-narrow px-4 md:px-8 py-10 grid grid-cols-3 gap-4 md:gap-8">
          {stats.map(s => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">{s.value}+</div>
              <div className="text-sm text-accent-200 mt-1 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* Featured projects */}
      <Section alt>
        <SectionHeader
          label="Work"
          title="Featured Projects"
          description="Selected work highlighting QA automation, cloud infrastructure, and full-stack development."
        />
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <div className="text-center">
          <Link to="/projects" className="btn-outline">
            View all projects <FiArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* Skills snapshot */}
      <Section>
        <SectionHeader
          label="Skills"
          title="QA-First Skill Set"
          description="Testing proficiency at the core, with full-stack knowledge that makes for a better tester."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {qaSkills.map(skill => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
            >
              <FiCheckCircle size={14} className="text-pass-500 shrink-0" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{skill.name}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/skills" className="btn-outline">
            Full skills breakdown <FiArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* Quick CTA */}
      <Section alt>
        <div className="text-center max-w-xl mx-auto">
          <h2 className="heading-md mb-3">Looking for a QA Engineer?</h2>
          <p className="text-body mb-6">
            I&apos;m currently open to Associate QA Engineer roles. Let&apos;s talk about how I can help your team ship higher-quality software.
          </p>
          <Link to="/contact" className="btn-primary">
            Let&apos;s connect <FiArrowRight size={16} />
          </Link>
        </div>
      </Section>
    </>
  );
}
