'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeNames, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('languageLabel')}
    >
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="mx-1 text-stone" aria-hidden>·</span>}
          <button
            type="button"
            lang={l}
            onClick={() => change(l)}
            disabled={isPending}
            aria-current={l === locale ? 'true' : undefined}
            className={cn(
              'rounded-xs px-1 py-0.5 text-xs transition-colors',
              l === locale ? 'font-semibold text-ink' : 'text-ash hover:text-ink'
            )}
          >
            {localeNames[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
