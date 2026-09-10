Brand photography. Toggle each slot in src/lib/media.ts.

In use
------
  mountiva.png         Background-removed cutout of the 330 ml + 1.5 L bottles
                       on transparency. Wired to the home hero (media.hero),
                       shown object-contain over the soft halo.

Optional
--------
  mountiva-hero-bg.jpg  Northern Pakistan landscape behind the hero bottle
                        (media.heroBackground).
  mountiva-bottle.<ext> A second, distinct product shot for the "Built for
                        wholesale" block (media.bottle). Left off so the hero
                        photo isn't repeated on the home page.
  og-default.jpg        1200 x 630 social-share image.
  icon-192.png / icon-512.png   PWA icons.

To turn a slot on: save the file here, set enabled: true in src/lib/media.ts.

Label artwork (.cdr): a Corel print source, not a web asset. Export the
mountain motif to SVG and the label to a transparent PNG before using them.
Label red is ~#D42E24.
