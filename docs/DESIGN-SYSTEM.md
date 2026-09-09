# Mountiva — Design System

Derived from the physical bottle: minimalist white label, elegant serif "Mountiva"
wordmark, single-weight mountain line art, "PURITY YOU CAN TRUST" in wide tracking.
Calm, contemporary, trustworthy. Never loud, never alpine-romantic.

All tokens live in `tailwind.config.ts`; base element styling and component classes in
`src/app/globals.css`.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `paper` | `#FBFBF9` | Default page background (warm off-white) |
| `surface` | `#FFFFFF` | Cards, raised panels, alternating sections |
| `mist` | `#F2F2EF` | Quiet section band |
| `stone` | `#E4E4DF` | Hairlines, borders, dividers |
| `ash` | `#9B9B93` | Meta text, eyebrows, captions |
| `slate` | `#5B5B54` | Body copy |
| `ink` | `#161615` | Headings, primary buttons, wordmark |
| `charcoal` | `#0E0E0D` | Button hover, deepest surfaces |
| `northern` / `soft` / `pale` | `#2E4A5A` / `#5C7A8A` / `#E8EEF1` | Accent — used sparingly: rules, focus rings, quote borders, horizon wash |
| `earth` / `soft` / `pale` | `#8C7355` / `#B49E82` / `#F0EAE1` | Secondary accent for editorial warmth |

Rule of thumb: a page is 90% paper/ink/slate. Northern appears as a thin line or a soft
top-of-hero gradient, not a fill. Dark sections use `tone="ink"` (charcoal ground, paper text).

## Typography

- **Display / headings** — `Fraunces` (variable, optical size axis), set via `--font-serif`.
  The wordmark is Fraunces uppercase with `letter-spacing: 0.14em`.
- **Body / UI** — `Inter`, via `--font-sans`.
- **Urdu** — `Noto Nastaliq Urdu`; **Arabic** — `Noto Naskh Arabic`. Applied automatically
  by `[lang='ur']` / `[dir='rtl']` rules in `globals.css`.

Scale (`fontSize` extensions): `display-xl` (clamp 2.75–5rem) · `display-lg` · `display-md`
· `title` (1.375rem) · `lede` (clamp 1.06–1.25rem, line-height 1.65). Tracking tokens:
`wordmark` `0.14em`, `eyebrow` `0.22em`. Headings use `text-wrap: balance`.

## Spacing & layout

- Container: centered, max-width **1200px**, padding 1.25rem → 2.5rem.
- Vertical rhythm: `py-section` = `clamp(4.5rem, 9vw, 8.5rem)` on every `<Section>`.
- Measure: `max-w-prose` (68ch) for articles, `max-w-measure` (54ch) for supporting copy.
- Grid: inner pages use a `[16rem_1fr]` heading/content split on `lg`; feature grids are
  1px-gap cells on a `stone` background to read as hairline-ruled tables.

## Shape, elevation, motion

- Radii: `xs` 2px, `sm` 4px. Nothing more rounded.
- Shadows: `card` (resting) and `lift` (hover) — both low, cool, diffuse.
- Easing: `calm` = `cubic-bezier(0.22, 1, 0.36, 1)`. Durations 200ms (UI) / 700ms (reveal).
- `Reveal` (Framer Motion) fades content up 14px once on scroll-in; returns static markup
  under `prefers-reduced-motion`. CSS also neutralises animation/scroll under that query.

## Components

| Component | Notes |
| --- | --- |
| `Button` / `ButtonLink` | `primary` (ink), `secondary` (outline), `ghost`, `inverse` (on dark). Sizes `md` / `lg` (≥44px touch target). |
| `Section` | Wraps content in a `Container`; `tone` = paper / surface / mist / ink. |
| `PageHero` | Eyebrow + H1 + lede + optional slot + horizon gradient + motif rule. |
| `SectionHeading` | Eyebrow + H2 + optional body; `align` start/center; `tone` for dark. |
| `Eyebrow` | Uppercase 0.7rem, `eyebrow` tracking, leading 6px rule. |
| `CtaBanner` | Full-width `ink` section, centered, motif, primary + optional secondary. |
| `Field` + `fieldClasses` | Labelled field wrapper with error/hint slots; logical-property padding for RTL. |
| `Wordmark` / `MountainMotif` / `BottleMark` | Brand marks as inline SVG — theme via `currentColor`, swap for photography when available. |

## Accessibility baseline

- Single `<h1>` per page; sections use `<h2>`/`<h3>` in order.
- Skip link to `#main`; header nav in `<nav aria-label>`; `aria-current` on active links.
- Visible `:focus-visible` ring (northern, 2px, offset). Colour contrast ≥ 4.5:1 for text
  (`slate`/`ink` on `paper`; `paper`/`paper-80` on `ink`).
- Forms: every control has a `<label htmlFor>`; errors linked and announced via
  `role="alert"`; success via `role="status"`. Honeypot field is visually hidden, not
  `display:none`, and `aria-hidden`.
- RTL: layout uses logical properties (`ps-`, `pe-`, `border-s`, `ms-`) so `dir="rtl"`
  mirrors without overrides.
