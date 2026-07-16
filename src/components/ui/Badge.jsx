import { cn } from '../../utils/cn';

const variants = {
  tech: 'badge-tech',
  pass: 'badge-pass',
  manual: 'badge-manual',
  neutral: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
};

export function Badge({ variant = 'tech', className, children }) {
  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  );
}

export function TestBadge({ label }) {
  if (!label) return null;
  const isAutomated = label.toLowerCase().includes('automated');
  return (
    <Badge variant={isAutomated ? 'pass' : 'manual'}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1" />
      {label}
    </Badge>
  );
}
