import { cn } from '@/lib/cn';

/**
 * The minimal mountain line-art from the bottle label. Two overlapping ridges,
 * single stroke weight, no fill. Decorative only.
 */
export function MountainMotif({
  className,
  strokeWidth = 1.25
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 44"
      fill="none"
      aria-hidden="true"
      className={cn('text-ink', className)}
    >
      <path
        d="M2 42 L34 10 L52 30 L72 6 L104 42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 42 L64 20 L82 36 L100 18 L118 42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}
