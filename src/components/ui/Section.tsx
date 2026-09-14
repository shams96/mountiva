import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: 'paper' | 'surface' | 'mist' | 'ink' | 'night';
  bleed?: boolean;
};

const toneMap: Record<NonNullable<SectionProps['tone']>, string> = {
  // Light tones get a bottom border — the seam between two stacked
  // sections' padding should read as a deliberate break, not an
  // ambiguous gap the eye has to guess at from a faint color shift alone.
  paper: 'bg-paper text-ink border-b border-stone/60',
  surface: 'bg-surface text-ink border-b border-stone/60',
  mist: 'bg-mist text-ink border-b border-stone/60',
  ink: 'bg-ink text-paper',
  night: 'bg-night text-paper'
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  tone = 'paper',
  bleed = false
}: SectionProps) {
  return (
    <section id={id} className={cn('py-section', toneMap[tone], className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
