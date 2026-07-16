import { cn } from '../../utils/cn';

export function Card({ className, children, ...props }) {
  return (
    <div className={cn('card-base p-6', className)} {...props}>
      {children}
    </div>
  );
}
