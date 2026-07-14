import { cn } from '../../utils/cn';

export function Section({ id, className, children, alt }) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        alt ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900',
        className
      )}
    >
      <div className="container-narrow">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ label, title, description }) {
  return (
    <div className="mb-12 text-center">
      {label && (
        <span className="inline-block mb-3 text-xs font-semibold uppercase tracking-widest text-accent-600 dark:text-accent-400">
          {label}
        </span>
      )}
      <h2 className="heading-lg mb-4">{title}</h2>
      {description && (
        <p className="text-body max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
