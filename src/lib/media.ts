/**
 * Brand photography slots.
 *
 * The site ships with SVG line-art placeholders (BottleMark / MountainMotif).
 * To use real photos: drop the files into /public/images with the names below,
 * then flip `enabled` to true for that slot. Nothing else to change.
 *
 * Assets in use:
 * - /images/mountiva_mineral_water.jpg — full campaign photo (bottle + can,
 *   Northern Pakistan peaks). Shown large in the hero.
 * - /images/mountiva.png — background-removed cutout of the 330 ml and 1.5 L
 *   bottles on transparency. Shown in the products teaser.
 * - /images/mountiva-logo.png — the label lock-up (mountain mark + wordmark).
 *   Shown in the header and footer in place of the type-only Wordmark.
 */
export const media = {
  /** The label lock-up used for the site logo. 247×147 source. */
  logo: {
    enabled: true,
    src: '/images/mountiva-logo.png',
    alt: 'Mountiva',
    width: 247,
    height: 147
  },
  /** The photo in the hero, shown in a framed panel beside the headline. */
  hero: {
    enabled: true,
    src: '/images/mountiva_mineral_water.jpg',
    alt: 'Mountiva mineral water bottle and can against the snow-capped peaks of Northern Pakistan'
  },
  /** Optional Northern Pakistan landscape behind the hero bottle. */
  heroBackground: {
    enabled: false,
    src: '/images/mountiva-hero-bg.jpg',
    alt: ''
  },
  /** Products block. */
  bottle: {
    enabled: true,
    src: '/images/mountiva.png',
    alt: 'Mountiva mineral water — 330 ml and 1.5 litre bottles'
  }
} as const;
