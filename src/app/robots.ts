import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] }
      // Answer engines (GPTBot, PerplexityBot, Google-Extended, etc.) are
      // intentionally allowed — the brand wants AEO/GEO visibility.
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url
  };
}
