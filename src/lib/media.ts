/**
 * Brand photography slots.
 *
 * The site ships with SVG line-art placeholders (BottleMark / MountainMotif).
 * To use real photos: drop the files into /public/images with the names below,
 * then flip `enabled` to true for that slot. Nothing else to change.
 *
 * Expected assets (from the WhatsApp hand-off):
 *   - mountiva-hero.jpg    the styled bottle render (balcony / skyline shot),
 *                          ~1600×1600 or portrait, < 400 KB after compression
 *   - mountiva-bottle.jpg  a clean bottle-on-white cutout for the products blocks
 *   - og-default.jpg       1200×630 social share image
 *
 * The .cdr label file must be exported from Corel/Illustrator first — it is a
 * source document, not a web asset.
 */
export const media = {
  /** The bottle in the hero — a render or a cutout. Shown over `heroBackground`. */
  hero: {
    enabled: false,
    src: '/images/mountiva-hero.jpg',
    alt: 'A Mountiva bottle'
  },
  /** Optional Northern Pakistan landscape behind the hero bottle. */
  heroBackground: {
    enabled: false,
    src: '/images/mountiva-hero-bg.jpg',
    alt: ''
  },
  bottle: {
    enabled: false,
    src: '/images/mountiva-bottle.jpg',
    alt: 'Mountiva natural mineral water bottle'
  }
} as const;
