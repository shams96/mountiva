'use client';

import { useId, useTransition } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeNames, type Locale } from '@/i18n/routing';
import { springPill } from '@/lib/motion';
import { cn } from '@/lib/cn';

/**
 * Segmented control. The active pill is a shared-layout element: on change it
 * springs from its current on-screen position to the new one (critically
 * damped, no overshoot — it's a reposition, not a throw) and is interruptible.
 * Under reduced motion the pill jumps with no animation.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const reduce = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const groupId = useId();

  function change(next: Locale) {
    if (next === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t('languageLabel')}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-stone/70 bg-surface/50 p-0.5 backdrop-blur',
        isPending && 'opacity-70',
        className
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <motion.button
            key={l}
            type="button"
            lang={l}
            onClick={() => change(l)}
            disabled={isPending}
            aria-current={active ? 'true' : undefined}
            whileTap={reduce ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={cn(
              'relative z-10 rounded-full px-2.5 py-1 text-xs transition-colors duration-150',
              active ? 'text-paper' : 'text-ash hover:text-ink'
            )}
          >
            {active && (
              <motion.span
                aria-hidden
                layoutId={`lang-pill-${groupId}`}
                className="absolute inset-0 -z-10 rounded-full bg-ink"
                transition={reduce ? { duration: 0 } : springPill}
              />
            )}
            {localeNames[l]}
          </motion.button>
        );
      })}
    </div>
  );
}
