Drop real brand photography here, then enable each slot in src/lib/media.ts.

Files the site looks for
------------------------
  mountiva-hero.jpg     Styled bottle render (the balcony / skyline shot).
                        Portrait or square, ~1600 px on the long edge,
                        compressed to < 400 KB. Used in the home hero.
  mountiva-bottle.jpg   Clean bottle on white / neutral ground. Used in the
                        home "Products & Packaging" block.
  og-default.jpg        1200 x 630 social-share image (Open Graph / Twitter).
  mountiva-logo.png     Transparent wordmark, used only in JSON-LD.
  icon-192.png          PWA icon.
  icon-512.png          PWA icon.

To turn a photo on
------------------
  1. Save the file here with the exact name above.
  2. Open src/lib/media.ts and set  enabled: true  for that slot.
  3. Until then the site shows the BottleMark / MountainMotif line art.

Label artwork (.cdr)
--------------------
The CorelDRAW file is a print source, not a web asset. Open it in Corel or
Illustrator and export:
  - the mountain-range motif as SVG  -> replace src/components/brand/MountainMotif.tsx
  - the full label as a transparent PNG if you want it on the site
Brand facts already pulled from it: label red is ~#D42E24, phone +92 333 9980912.
