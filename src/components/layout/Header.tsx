'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav } from '@/lib/nav';
import { cn } from '@/lib/cn';
import { Wordmark } from '@/components/brand/Wordmark';
import { ButtonLink } from '@/components/ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
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

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled || open
          ? 'border-stone bg-paper/90 backdrop-blur-md'
          : 'border-transparent bg-paper'
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
                      'text-sm no-underline transition-colors',
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
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t('common.close') : t('common.menu')}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                'absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300',
                open && 'translate-y-2 rotate-45'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-2 h-px w-6 bg-ink transition-opacity duration-200',
                open && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-4 h-px w-6 bg-ink transition-transform duration-300',
                open && '-translate-y-2 -rotate-45'
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden">
          <nav aria-label="Primary mobile" className="container pb-8 pt-2">
            <ul className="flex flex-col divide-y divide-stone">
              {primaryNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="block py-4 font-serif text-lg text-ink no-underline"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-5">
              <ButtonLink href="/wholesale" size="lg" className="w-full">
                {t('cta.primary')}
              </ButtonLink>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
