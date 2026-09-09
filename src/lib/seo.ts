import type { Metadata } from 'next';
import { site } from './site';
import { routing, type Locale } from '@/i18n/routing';

type BuildMetaArgs = {
  locale: string;
  title: string;
  description: string;
  /** Path without locale prefix, e.g. "/wholesale". Use "" for home. */
  path?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

function localizedPath(locale: string, path: string): string {
  const clean = path.replace(/^\//, '');
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${site.url}${prefix}${clean ? `/${clean}` : ''}` || site.url;
}

/** Consistent, fully-populated metadata for every route (SEO + AEO + GEO). */
export function buildMetadata({
  locale,
  title,
  description,
  path = '',
  ogImage = site.ogImage,
  type = 'website',
  keywords = [],
  publishedTime,
  modifiedTime
}: BuildMetaArgs): Metadata {
  const canonical = localizedPath(locale, path);
  const languages: Record<string, string> = { 'x-default': localizedPath(routing.defaultLocale, path) };
  for (const l of routing.locales) languages[l] = localizedPath(l, path);

  const fullTitle = title === site.name ? title : `${title} — ${site.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: { canonical, languages },
    openGraph: {
      type,
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical,
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  };
}

export function metadataBaseUrl(): URL {
  return new URL(site.url);
}

export function localeList(): Locale[] {
  return [...routing.locales];
}
