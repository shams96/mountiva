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
  paper: 'bg-paper text-ink',
  surface: 'bg-surface text-ink',
  mist: 'bg-mist text-ink',
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
