import { cn } from '@/lib/cn';

/**
 * The angular mountain range from the bottle label: a sharp multi-peak ridge.
 * Single stroke, no fill. With `accent`, the front ridge picks up the label
 * red while the back ridge stays ink — the two-tone lock-up from the label.
 */
export function MountainMotif({
  className,
  strokeWidth = 1.5,
  accent = false
}: {
  className?: string;
  strokeWidth?: number;
  accent?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 128 44"
      fill="none"
      aria-hidden="true"
      className={cn('text-ink', className)}
    >
      {/* back ridge */}
      <path
        d="M2 42 L20 16 L30 28 L44 8 L58 30 L70 14 L84 34 L98 12 L112 30 L126 42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
      {/* front ridge */}
      <path
        d="M2 42 L16 22 L26 32 L40 12 L52 34 L66 6 L80 30 L92 18 L106 34 L126 42"
        stroke={accent ? '#D42E24' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
