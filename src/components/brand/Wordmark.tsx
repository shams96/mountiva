import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { media } from '@/lib/media';
import { MountainMotif } from './MountainMotif';

type WordmarkProps = {
  className?: string;
  withMotif?: boolean;
  href?: string | null;
  tone?: 'ink' | 'paper';
};

/**
 * The site logo. Renders the brand's label lock-up image when available
 * (`media.logo`); falls back to the serif wordmark set over the mountain
 * motif otherwise. The logo art has dark type, so it only suits light
 * (`tone="ink"`) contexts — `tone="paper"` always uses the type fallback.
 */
export function Wordmark({ className, withMotif = true, href = '/', tone = 'ink' }: WordmarkProps) {
  const useLogoImage = media.logo.enabled && tone === 'ink';

  const inner = useLogoImage ? (
    <Image
      src={media.logo.src}
      alt={media.logo.alt}
      width={media.logo.width}
      height={media.logo.height}
      priority
      className={cn('h-10 w-auto', className)}
    />
  ) : (
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
