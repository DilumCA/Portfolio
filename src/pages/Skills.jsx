import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { SkillBar } from '../components/ui/SkillBar';
import { Section, SectionHeader } from '../components/ui/Section';
import skills from '../data/skills.json';

const iconLabel = {
  FaBug: '🐛',
  FaFlask: '🧪',
  FaCode: '💻',
  FaGlobe: '🌐',
  FaDatabase: '🗄️',
  FaGitAlt: '🔀',
  FaTools: '🛠️',
  FaUsers: '🤝',
};

export default function Skills() {
  return (
    <>
      <SEO
        title="Skills"
        description="QA and test automation skills — manual testing, API testing, BDD, Serenity, REST Assured, and more."
        path="/skills"
      />
      <Section>
        <SectionHeader
          label="Expertise"
          title="Skills"
          description="Testing capabilities first, full-stack knowledge in support. Proficiency bars reflect honest self-assessment."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: ci * 0.06 }}
              className="card-base p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">{iconLabel[category.icon] ?? '📌'}</span>
                <h3 className="heading-md text-base font-semibold">{category.category}</h3>
              </div>
              <div>
                {category.skills.map(skill => (
                  <SkillBar key={skill.name} name={skill.name} proficiency={skill.proficiency} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
