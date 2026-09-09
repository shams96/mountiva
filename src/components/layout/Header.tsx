'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { springSheet, crossFade } from '@/lib/motion';
import { Wordmark } from '@/components/brand/Wordmark';
import { ButtonLink } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Motion tokens — sheet arrives downward (the direction the gesture opens it),
  // no overshoot (it comes from a tap, not a flick). Reduced motion → cross-fade.
  const sheetMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: crossFade }
    : {
        initial: { opacity: 0, y: -12, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -12, scale: 0.985 },
        transition: springSheet
      };

  const itemDelay = (i: number) => (reduce ? 0 : 0.05 + i * 0.035);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-calm',
        'bg-paper/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/60',
        scrolled || open
          ? 'border-b border-stone/60 shadow-[0_1px_0_rgba(12,15,17,0.04)]'
          : 'border-b border-transparent'
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-sm focus:bg-ink focus:px-3 focus:py-2 focus:text-xs focus:text-paper"
      >
        {t('common.skipToContent')}
      </a>

      <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
        <Wordmark className="shrink-0" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-sm no-underline transition-colors duration-150',
                      active ? 'text-ink' : 'text-slate hover:text-ink'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <ButtonLink href="/wholesale" size="md">
            {t('cta.bulkPricing')}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-me-2 inline-flex h-11 w-11 touch-none items-center justify-center rounded-sm transition-transform duration-100 ease-calm active:scale-90 motion-reduce:active:scale-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('common.close') : t('common.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-200 ease-calm',
                open && 'translate-y-2 rotate-45'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-2 h-px w-6 bg-ink transition-opacity duration-150',
                open && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-4 h-px w-6 bg-ink transition-transform duration-200 ease-calm',
                open && '-translate-y-2 -rotate-45'
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden" key="mobile-nav-root">
            {/* Scrim — dims the page behind without fully hiding it (parallel task, not modal) */}
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              className="fixed inset-x-0 bottom-0 top-16 -z-10 bg-night/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduce ? crossFade : { duration: 0.22, ease: 'easeOut' }}
              onClick={() => setOpen(false)}
            />

            <motion.nav
              id="mobile-nav"
              aria-label="Primary mobile"
              className="origin-top border-b border-stone/60 bg-paper/85 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-paper/75"
              style={{ willChange: 'transform, opacity' }}
              {...sheetMotion}
            >
              <div className="container pb-8 pt-2">
                <ul className="flex flex-col">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.key}
                      className="border-b border-stone/70"
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...springSheet, delay: itemDelay(i) }}
                    >
                      <Link
                        href={item.href}
                        className="block py-4 font-serif text-lg text-ink no-underline transition-colors active:text-northern"
                      >
                        {t(`nav.${item.key}`)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <motion.div
                  className="mt-6 flex flex-col gap-5"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springSheet, delay: itemDelay(primaryNav.length) }}
                >
                  <ButtonLink href="/wholesale" size="lg" className="w-full">
                    {t('cta.primary')}
                  </ButtonLink>
                  <LanguageSwitcher className="self-start" />
                </motion.div>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
