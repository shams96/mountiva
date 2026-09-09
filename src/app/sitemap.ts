import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { routing } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog';

const staticPaths = [
  '',
  '/story',
  '/source',
  '/products',
  '/wholesale',
  '/quality',
  '/blog',
  '/contact',
  '/privacy',
  '/terms'
];

function url(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${site.url}${prefix}${path}`;
}

function alternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = url(l, path);
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: url(routing.defaultLocale, path),
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/wholesale' ? 0.9 : 0.6,
      alternates: alternates(path)
    });
  }

  for (const post of getAllPosts()) {
    const path = `/blog/${post.slug}`;
    entries.push({
      url: url(routing.defaultLocale, path),
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: alternates(path)
    });
  }

  return entries;
}
