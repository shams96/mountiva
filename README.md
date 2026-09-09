# Mountiva

Premium wholesale natural mineral water from Northern Pakistan.
**Purity you can trust.**

Production website — Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-intl.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL at minimum
npm run dev                  # http://localhost:3000
```

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Local dev server                         |
| `npm run build`     | Production build (static export of pages)|
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint (`next/core-web-vitals`)          |
| `npm run typecheck` | `tsc --noEmit`                           |

---

## What's implemented

- **8 core sections**: Home, Our Story, Our Source, Products & Packaging, Wholesale Hub,
  Quality & Trust, Insights (blog + articles), Contact — plus Privacy and Terms.
- **Full i18n** (`next-intl`): English (primary), Urdu, Arabic. Urdu and Arabic render
  right-to-left with dedicated Noto Nastaliq / Noto Naskh fonts. All copy lives in
  `messages/{en,ur,ar}.json` — no hard-coded strings in components.
- **Wholesale conversion**: `/wholesale` enquiry form (formats, volume, destination,
  private-label) with shared zod validation, honeypot, and a server route that forwards
  to `WHOLESALE_WEBHOOK_URL` (or logs structured records when unset). Contact form on a
  parallel `/api/contact` route.
- **SEO + AEO + GEO**: per-route `generateMetadata` with canonical + `hreflang` alternates,
  Open Graph / Twitter, `sitemap.xml`, `robots.txt` (answer-engine crawlers allowed),
  `manifest.webmanifest`, and JSON-LD (`Organization`, `WebSite`, `Product`,
  `BreadcrumbList`, `FAQPage`, `Article`).
- **Performance / a11y**: static generation for every locale, system + self-hosted Google
  fonts via `next/font`, `prefers-reduced-motion` honoured in `Reveal` and CSS, skip link,
  focus-visible rings, semantic landmarks, labelled form fields.

---

## Project structure

```
src/
  app/
    layout.tsx                 # thin root (pass-through)
    [locale]/
      layout.tsx               # <html lang/dir>, fonts, providers, header/footer, org JSON-LD
      page.tsx                 # Home
      story|source|products|wholesale|quality|contact/page.tsx
      blog/page.tsx  blog/[slug]/page.tsx
      privacy|terms/page.tsx
      not-found.tsx
    api/wholesale/route.ts     # enquiry intake
    api/contact/route.ts       # general message intake
    sitemap.ts  robots.ts  manifest.ts
    globals.css
  components/
    brand/     Wordmark, MountainMotif, BottleMark   (label-accurate line art)
    layout/    Header, Footer, LanguageSwitcher
    sections/  Hero, PageHero, CtaBanner
    ui/        Container, Section, Button, Eyebrow, Reveal, SectionHeading, Field
    blog/      ArticleBody, PostCard
    wholesale/ WholesaleForm
    contact/   ContactForm
    seo/       JsonLd
  i18n/        routing.ts, request.ts, navigation.ts
  lib/         site.ts, nav.ts, products.ts, blog.ts, seo.ts, schema.ts,
               wholesale-schema.ts, cn.ts
messages/      en.json, ur.json, ar.json
docs/          DESIGN-SYSTEM.md, INFORMATION-ARCHITECTURE.md, CONTENT.md
```

---

## Before go-live

1. **Contact facts** — replace placeholders in `src/lib/site.ts` (email, phone, WhatsApp,
   address, social URLs) and `NEXT_PUBLIC_SITE_URL`.
2. **Enquiry routing** — set `WHOLESALE_WEBHOOK_URL` (CRM inbound hook / Zapier / Make /
   email relay). Until then, submissions are validated and logged server-side.
3. **Imagery** — drop real photography into `public/images/` (`mountiva-hero.jpg`,
   `mountiva-bottle.jpg`, `og-default.jpg` 1200×630, PWA icons) and flip `enabled: true`
   for each slot in `src/lib/media.ts`. Until then the `BottleMark` / `MountainMotif`
   line art renders. The `.cdr` label file is a Corel print source — export the motif
   to SVG and the label to a transparent PNG before using them on the web.
4. **Lab reports** — add PDFs to `public/reports/` and list them in the `reports` array in
   `src/app/[locale]/quality/page.tsx`.
5. **Product data** — confirm formats, pack configs, cases/pallet and MOQs in
   `src/lib/products.ts`.
6. **Legal** — have counsel finalise `/privacy` and `/terms`.
7. **Analytics / verification** — set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and
   `GOOGLE_SITE_VERIFICATION` if used.

## Deploy

Any Node host or Vercel. `next build` output is mostly static HTML per locale; the two
API routes and the i18n middleware need the Node runtime.
