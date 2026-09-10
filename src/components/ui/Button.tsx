import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium tracking-tight transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-calm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] active:duration-75 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-charcoal ring-offset-paper focus-visible:ring-signal shadow-card hover:shadow-lift',
  secondary:
    'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03] ring-offset-paper focus-visible:ring-signal',
  ghost:
    'bg-transparent text-ink hover:text-signal ring-offset-paper focus-visible:ring-signal hover:translate-y-0',
  inverse:
    'bg-paper text-ink hover:bg-white ring-offset-ink focus-visible:ring-paper shadow-card hover:shadow-lift'
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem] min-h-[3.25rem]'
};

const Arrow = () => (
  <span className="cta-arrow" aria-hidden>
    →
  </span>
);

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Append a directional arrow that nudges on hover. */
  withArrow?: boolean;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  withArrow,
  children,
  external = false
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], 'no-underline', className);
  const inner = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
