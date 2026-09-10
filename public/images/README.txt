Brand photography. Toggle each slot in src/lib/media.ts.

In use
------
  mountiva.jpeg        Product photo of the 330 ml + 1.5 L bottles.
                       Wired to the home "Products & Packaging" block
                       (media.bottle, enabled).

Still wanted
------------
  mountiva-hero.jpg    Clean bottle-on-white studio shot for the home hero.
                       The current mountiva.jpeg is a shopfront photo — fine
                       for the products block, too busy for the hero, so the
                       hero still shows the BottleMark line art.
  mountiva-hero-bg.jpg Optional Northern Pakistan landscape behind the hero.
  og-default.jpg       1200 x 630 social-share image.
  icon-192.png / icon-512.png   PWA icons.

To turn a photo on: save it here with the name above, then set
enabled: true for that slot in src/lib/media.ts.

Label artwork (.cdr): a Corel print source, not a web asset. Export the
mountain motif to SVG and the label to a transparent PNG before using them.
Label red is ~#D42E24.
