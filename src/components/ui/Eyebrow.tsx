import { cn } from '@/lib/cn';

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', className)}>
      <span aria-hidden className="inline-block h-px w-6 bg-glacier" />
      {children}
    </p>
  );
}
