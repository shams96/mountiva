import { defineRouting } from 'next-intl/routing';

/**
 * English is the primary market language. Urdu is the first localisation.
 * Arabic scaffolding is in place for GCC export enquiries; both ur and ar
 * render right-to-left (see `rtlLocales`).
 */
export const routing = defineRouting({
  locales: ['en', 'ur', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const rtlLocales = ['ur', 'ar'] as const;

export type Locale = (typeof routing.locales)[number];

export function isRtl(locale: string): boolean {
  return (rtlLocales as readonly string[]).includes(locale);
}

/** Local stand-in for next-intl v4's `hasLocale` (not in the v3 line). */
export function hasLocale(
  locales: readonly string[],
  candidate: string | undefined
): candidate is Locale {
  return candidate != null && locales.includes(candidate);
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو',
  ar: 'العربية'
};
