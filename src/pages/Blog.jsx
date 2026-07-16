import { FiEdit } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import blogs from '../data/blogs.json';

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog"
        description="Articles and notes on QA engineering, test automation, and software quality by Dilum Andradi."
        path="/blog"
      />
      <Section>
        <SectionHeader
          label="Writing"
          title="Blog"
        />

        {blogs.length === 0 ? (
          <div className="text-center py-16 max-w-sm mx-auto">
            <FiEdit size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">Coming soon</h3>
            <p className="text-body text-sm">
              Blog posts on QA engineering, test automation patterns, and lessons from real projects will be published here.
            </p>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-6">
            {blogs.map(post => (
              <div key={post.id} className="card-base p-6">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">{post.title}</h3>
                <p className="text-sm text-body mb-3">{post.excerpt}</p>
                <p className="text-xs text-slate-400">{post.date}</p>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
