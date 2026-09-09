import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium tracking-tight transition-[transform,background-color,border-color,box-shadow,color] duration-200 ease-calm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] active:duration-75 motion-reduce:active:scale-100';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-paper hover:bg-charcoal ring-offset-paper focus-visible:ring-northern shadow-card hover:shadow-lift',
  secondary:
    'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03] ring-offset-paper focus-visible:ring-northern',
  ghost: 'bg-transparent text-ink hover:text-northern ring-offset-paper focus-visible:ring-northern',
  inverse:
    'bg-paper text-ink hover:bg-white ring-offset-ink focus-visible:ring-paper shadow-card'
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem] min-h-[3.25rem]'
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false
}: CommonProps & { href: string; external?: boolean }) {
  const classes = cn(base, variants[variant], sizes[size], 'no-underline', className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
