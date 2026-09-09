import { site } from './site';
import type { BlogPost } from './blog';

/**
 * JSON-LD builders. Kept small and explicit so the emitted graph is easy to
 * audit against Google's Rich Results test and to feed answer engines (AEO).
 */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    slogan: site.tagline,
    description: site.descriptionLong,
    logo: `${site.url}/images/mountiva-logo.png`,
    foundingDate: site.founded,
    areaServed: ['PK', 'AE', 'SA', 'QA', 'OM', 'BH', 'KW'],
    knowsLanguage: ['en', 'ur', 'ar'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'wholesale enquiries',
        email: site.contact.email,
        telephone: site.contact.phoneDisplay,
        areaServed: 'PK',
        availableLanguage: ['en', 'ur', 'ar']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.contact.addressLocality,
      addressRegion: site.contact.addressRegion,
      addressCountry: site.contact.addressCountry
    },
    sameAs: [site.social.linkedin, site.social.instagram]
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.descriptionShort,
    publisher: { '@id': `${site.url}/#organization` },
    inLanguage: ['en', 'ur', 'ar']
  };
}

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Mountiva Natural Mineral Water',
    brand: { '@type': 'Brand', name: site.name },
    category: 'Natural mineral water (wholesale)',
    description:
      'Natural mineral water drawn from deep aquifers in Northern Pakistan, filtered by geology and bottled to modern standards. Available wholesale in still and sparkling, 330 ml to 19 L, with private-label options.',
    audience: { '@type': 'BusinessAudience', audienceType: 'Hotels, restaurants, corporates, institutions, distributors' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      offeredBy: { '@id': `${site.url}/#organization` },
      eligibleCustomerType: 'https://schema.org/Business'
    }
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`
    }))
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer }
    }))
  };
}

export function articleSchema(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { '@type': 'Organization', name: post.author, url: site.url },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: url,
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en'
  };
}
