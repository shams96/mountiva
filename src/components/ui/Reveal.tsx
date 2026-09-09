import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger step. Kept as a seconds-ish number for call-site compatibility;
   *  mapped to a scroll-range offset (~0.05 per step). */
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article' | 'span' | 'ol' | 'ul';
};

/**
 * Scroll-driven entrance, zero JavaScript.
 *
 * Uses CSS `animation-timeline: view()` (90%+ support in 2026). Browsers
 * without it — and anyone with `prefers-reduced-motion` — simply get the
 * content, fully visible, no animation. See `.reveal` in globals.css.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const style = { '--reveal-i': Math.max(0, Math.round(delay / 0.05)) } as CSSProperties;
  return (
    <Tag className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  );
}
