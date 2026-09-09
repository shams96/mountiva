# Mountiva — Information Architecture

Wholesale-first. Every page routes toward one primary action: **Request Wholesale Quote**.

## Sitemap

```
/                         Home
├─ /story                 Our Story / Philosophy  — civilisational continuity
├─ /source                Our Source              — generalized aquifer narrative
├─ /products              Products & Packaging    — wholesale formats + private label
├─ /wholesale             Wholesale Hub           — how it works, logistics, enquiry form
├─ /quality               Quality & Trust         — practice, lab reports, certs, FAQ
├─ /blog                  Insights (index)
│  └─ /blog/[slug]        Article
├─ /contact               Contact
├─ /privacy               Privacy (legal)
└─ /terms                 Terms (legal)
```

All routes are local: `/{locale}` prefix for `ur` and `ar`; `en` is unprefixed
(`localePrefix: 'as-needed'`).

## Global navigation

**Header** (sticky, condenses on scroll)
Wordmark · Our Story · Our Source · Products · Wholesale · Quality & Trust · Insights ·
Contact · Language (EN · اردو · العربية) · **Get Bulk Pricing** button.
Mobile: hamburger → full-height sheet, same order, primary CTA pinned.

**Footer**
Wordmark + positioning line · Explore (Story, Source, Quality, Insights) ·
Business (Products, Wholesale, Contact) · Contact (email, phone, city) · Social ·
© line + Privacy / Terms.

## Page blueprints

| Page | Sections (top → bottom) | Primary CTA | Secondary |
| --- | --- | --- | --- |
| Home | Hero (bottle + claim) → Philosophy → Source teaser (3 points) → Products preview → Wholesale block (+ 3 stats) → Trust → Insights (3 cards) → Closing CTA banner | Request Wholesale Quote | View Lab Reports · Download Catalogue |
| Story | Page hero → Philosophy (4 lines) → The Story (5 lines) → Brand Voice (lean-into / avoid) → Closing CTA | Request Wholesale Quote | Explore the source |
| Source | Page hero → The journey underground (4 steps) → Stewardship (3 points) → Why we generalize the source → Closing CTA | Request Wholesale Quote | View Lab Reports |
| Products | Page hero → Wholesale formats (table / stacked cards) + MOQ note → Private label (meta + 5 options) → Closing CTA | Request Wholesale Quote | Download Catalogue |
| Wholesale | Page hero → How it works (4 steps) → Logistics & terms (4) → **Enquiry form** → Talk-first CTA | Send enquiry | Contact team · Call |
| Quality | Page hero → How we hold the line (4) → Lab reports (list or request note) → Certifications (4) → FAQ (`<details>`) → Closing CTA | Request Wholesale Quote | Contact the team |
| Insights | Page hero → Post grid (3-up) | — | Post links |
| Article | Header (category, title, excerpt, date, reading time) → Body → Back to insights | — | — |
| Contact | Page hero → Contact blocks (wholesale / general / direct) + **Message form** → Pricing CTA | Request Wholesale Quote | — |

## Conversion model

- Primary CTA (`Request Wholesale Quote` / `Get Bulk Pricing`) appears in the header, every
  hero, and every closing banner → target `/wholesale#request`.
- Secondary CTAs (`Download Catalogue`, `View Lab Reports`) reduce friction for buyers not
  ready to submit — both routes still lead back to the enquiry form.
- The wholesale form captures qualification data (business type, formats, monthly volume,
  destination, private-label intent) so the first reply can carry real pricing.

## SEO / AEO / GEO map

| Concern | Where |
| --- | --- |
| Titles / descriptions / keywords | `generateMetadata` per route, copy in `messages/*/meta.*` |
| Canonical + `hreflang` | `lib/seo.ts#buildMetadata` → `alternates.languages` (+ `x-default`) |
| Structured data | `lib/schema.ts` → `Organization`, `WebSite` (layout); `Product` (home, products); `BreadcrumbList` (all inner pages); `FAQPage` (home, wholesale, quality); `Article` (posts) |
| Crawl | `app/sitemap.ts` (localized alternates), `app/robots.ts` (answer engines allowed, `/api` disallowed) |
| Answer-engine readiness | FAQ content mirrored in `FAQPage` JSON-LD; plain-language article bodies; explicit claim text in `home.hero.claim` and `story.philosophy` |
