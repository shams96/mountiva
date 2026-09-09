import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { MountainMotif } from '@/components/brand/MountainMotif';
import { cn } from '@/lib/cn';

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  lede?: string;
  children?: ReactNode;
  motif?: boolean;
};

export function PageHero({ eyebrow, heading, lede, children, motif = true }: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden border-b border-stone bg-paper')}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-glacier-pale/60 to-transparent"
      />
      <Container className="relative py-16 md:py-24">
        <Reveal className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display-lg text-ink md:text-display-xl">{heading}</h1>
          {lede && <p className="mt-6 max-w-prose text-lede leading-relaxed text-slate">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
        {motif && (
          <MountainMotif className="mt-12 h-8 w-auto text-stone" />
        )}
      </Container>
    </section>
  );
}
