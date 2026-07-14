import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiStar } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import achievements from '../data/achievements.json';

const categoryIcon = { Competition: FiAward, Hackathon: FiStar, Award: FiStar, 'Student Organisation': FiUsers, 'Professional Society': FiUsers, 'Sports & Recreation': FiUsers };

export default function Achievements() {
  return (
    <>
      <SEO
        title="Achievements"
        description="Hackathons, competitions, and extra-curricular activities of Dilum Andradi."
        path="/achievements"
      />
      <Section>
        <SectionHeader
          label="Beyond the Desk"
          title="Achievements & Activities"
        />

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Competitions & awards */}
          <div>
            <h3 className="heading-md text-lg mb-6 flex items-center gap-2">
              <FiAward className="text-accent-600 dark:text-accent-400" size={20} />
              Competitions & Awards
            </h3>
            <div className="space-y-4">
              {achievements.competitions.map((item, i) => {
                const Icon = categoryIcon[item.category] ?? FiAward;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="card-base p-5 flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0">
                      <Icon className="text-accent-600 dark:text-accent-400" size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">{item.name}</h4>
                        <Badge variant={item.result === 'Award' || item.result === 'Semifinalist' ? 'pass' : 'neutral'}>
                          {item.result}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{item.organizer} · {item.year}</p>
                      <p className="text-sm text-body">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Extra-curriculars */}
          <div>
            <h3 className="heading-md text-lg mb-6 flex items-center gap-2">
              <FiUsers className="text-accent-600 dark:text-accent-400" size={20} />
              Extra-Curriculars
            </h3>
            <div className="space-y-4">
              {achievements.extracurriculars.map((item, i) => {
                const Icon = categoryIcon[item.category] ?? FiUsers;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.07 }}
                    className="card-base p-5 flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                      <Icon className="text-slate-500 dark:text-slate-400" size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">{item.name}</h4>
                        <Badge variant="neutral">{item.category}</Badge>
                      </div>
                      <p className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">{item.role}</p>
                      <p className="text-sm text-body">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
