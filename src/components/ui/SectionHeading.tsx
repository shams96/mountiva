import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from './Eyebrow';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  align?: 'start' | 'center';
  tone?: 'ink' | 'paper';
  className?: string;
  as?: 'h1' | 'h2';
};

/** The one section-heading treatment used across every page. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'start',
  tone = 'ink',
  className,
  as: Heading = 'h2'
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          'text-display-md md:text-display-lg',
          tone === 'paper' ? 'text-paper' : 'text-ink',
          align === 'center' ? 'max-w-3xl' : 'max-w-2xl'
        )}
      >
        {title}
      </Heading>
      {body && (
        <div
          className={cn(
            'text-lede leading-relaxed',
            tone === 'paper' ? 'text-paper/80' : 'text-slate',
            align === 'center' ? 'max-w-2xl' : 'max-w-measure'
          )}
        >
          {body}
        </div>
      )}
    </Reveal>
  );
}
