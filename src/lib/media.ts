/**
 * Brand photography slots.
 *
 * The site ships with SVG line-art placeholders (BottleMark / MountainMotif).
 * To use real photos: drop the files into /public/images with the names below,
 * then flip `enabled` to true for that slot. Nothing else to change.
 *
 * Current asset: /images/mountiva.png — background-removed cutout of the
 * 330 ml and 1.5 L bottles on transparency. Used in the hero (object-contain
 * over the soft halo). Swap by replacing the file or pointing `src` elsewhere.
 */
export const media = {
  /** The bottle in the hero — a render or a cutout. Shown over `heroBackground`. */
  hero: {
    enabled: true,
    src: '/images/mountiva.png',
    alt: 'Mountiva mineral water — 330 ml and 1.5 litre bottles'
  },
  /** Optional Northern Pakistan landscape behind the hero bottle. */
  heroBackground: {
    enabled: false,
    src: '/images/mountiva-hero-bg.jpg',
    alt: ''
  },
  /** Products block. Left off so the one photo isn't repeated on the home page;
   *  point at a distinct product shot and flip on when one exists. */
  bottle: {
    enabled: false,
    src: '/images/mountiva-bottle.jpg',
    alt: 'Mountiva mineral water — 330 ml and 1.5 litre bottles'
  }
} as const;
