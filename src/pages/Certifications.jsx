import { FiAward } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import certifications from '../data/certifications.json';

export default function Certifications() {
  return (
    <>
      <SEO
        title="Certifications"
        description="Professional certifications of Dilum Andradi."
        path="/certifications"
      />
      <Section>
        <SectionHeader
          label="Credentials"
          title="Certifications"
        />

        {certifications.length === 0 ? (
          <div className="text-center py-16 max-w-sm mx-auto">
            <FiAward size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Coming soon</h3>
            <p className="text-body text-sm">
              Certifications will appear here once earned. Currently focused on practical QA project work and internship experience.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map(cert => (
              <div key={cert.id} className="card-base p-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-1">{cert.name}</h3>
                <p className="text-sm text-accent-600 dark:text-accent-400">{cert.issuer}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cert.date}</p>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
