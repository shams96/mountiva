import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { MountainMotif } from './MountainMotif';

type WordmarkProps = {
  className?: string;
  withMotif?: boolean;
  href?: string | null;
  tone?: 'ink' | 'paper';
};

/**
 * "MOUNTIVA" set in the serif display face with wide tracking, optionally over
 * the mountain motif — the label lock-up.
 */
export function Wordmark({ className, withMotif = true, href = '/', tone = 'ink' }: WordmarkProps) {
  const inner = (
    <span className={cn('inline-flex flex-col items-center gap-1.5', className)}>
      {withMotif && (
        <MountainMotif className={cn('h-4 w-auto', tone === 'paper' && 'text-paper')} />
      )}
      <span
        className={cn(
          'wordmark text-lg leading-none',
          tone === 'paper' ? 'text-paper' : 'text-ink'
        )}
      >
        Mountiva
      </span>
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} aria-label="Mountiva — home" className="no-underline">
      {inner}
    </Link>
  );
}
