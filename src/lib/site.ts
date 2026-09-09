/**
 * Single source of truth for cross-cutting brand + contact facts.
 * Replace the placeholder contact values before go-live.
 */
export const site = {
  name: 'Mountiva',
  legalName: 'Mountiva Natural Water',
  tagline: 'Purity You Can Trust',
  descriptionShort:
    'Premium wholesale natural mineral water drawn from the deep aquifers of Northern Pakistan.',
  descriptionLong:
    'Mountiva is a wholesale-first premium natural mineral water brand from Northern Pakistan. We do not sell mountain fairy tales from Europe — we draw water from the same land that taught the world how to live with water 5,000 years ago. Bottled with modern standards and an ancient sense of duty.',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://mountiva.com',
  locale: 'en_PK',
  contact: {
    // Phone is from the bottle label artwork; confirm the rest before publishing.
    email: 'wholesale@mountiva.com',
    generalEmail: 'hello@mountiva.com',
    phoneDisplay: '+92 333 9980912',
    phoneHref: '+923339980912',
    whatsapp: '+92 333 9980912',
    addressLocality: 'Islamabad',
    addressRegion: 'Islamabad Capital Territory',
    addressCountry: 'PK'
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/mountiva',
    instagram: 'https://www.instagram.com/mountiva'
  },
  founded: '2025',
  ogImage: '/images/og-default.jpg'
} as const;

export type Site = typeof site;
