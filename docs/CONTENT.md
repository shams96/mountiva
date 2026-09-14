# Mountiva — Page-by-page content

Canonical English copy. Source of truth is `messages/en.json`; `ur.json` and `ar.json`
mirror the same keys. Brand voice: calm, confident, modern, grounded. Young in energy,
serious in responsibility. Lean into: depth, clarity, trust, Northern land, continuity,
responsibility, pure. Avoid: fairy-tale mountain language, European alpine romance,
aggressive or rebellious tones.

---

## Global

- **Wordmark**: Mountiva
- **Tagline**: Purity You Can Trust
- **Positioning line (footer)**: Clear water from Northern Pakistan, brought forward with
  modern standards and an ancient sense of duty.
- **Header announcement**: Wholesale-first. Serving hotels, restaurants, corporates and
  institutions across Pakistan.
- **Primary CTA**: Request Wholesale Quote / Get Bulk Pricing
- **Secondary CTA**: Download Catalogue / View Lab Reports

---

## 1. Home (`/`)

**Hero**
- Eyebrow: Natural mineral water · Northern Pakistan
- H1: Purity you can trust.
- Claim (pull-quote): *We do not sell mountain fairy tales from Europe. We draw water from
  the same land that taught the world how to live with water 5,000 years ago. This is not
  nostalgia. It is civilisational continuity.*
- CTAs: Request Wholesale Quote · View Lab Reports

**Philosophy** — *Water that belongs to this land.* While others sell mountain fairy tales
from Europe, we draw from the same land that taught the world how to live with water 5,000
years ago. We do not borrow stories. We carry the one that is already ours — the deep
aquifers of Northern Pakistan, filtered by time and geology, protected with modern care.

**Our Source** — *Filtered by time and geology.* Three points: Deep aquifer · Natural
filtration · Protected recharge.

**Products & Packaging** — *Built for wholesale.* Still and sparkling, 330 ml glass to 19 L
returnable. Mixed pallets, nationwide delivery, private-label production.

**Wholesale Hub** — *A supply partner, not just a price.* Stats: 6 wholesale formats ·
48–120 cases per pallet · 8–12 wks private-label lead time.

**Quality & Trust** — *A quiet promise, documented.* Every production run is batch-coded
and backed by analysis.

**Insights** — three latest articles.

**Closing CTA** — Bring Mountiva to your business.

---

## 2. Our Story (`/story`)

**Hero**: Our Story → *Civilisational continuity* → "Mountiva is water that belongs to
this land."

**Philosophy** (verbatim, 4 lines)
1. While others sell mountain fairy tales from Europe, we draw from the same land that
   taught the world how to live with water 5,000 years ago.
2. This is not nostalgia. It is civilisational continuity.
3. We do not borrow stories. We carry the one that is already ours — the deep aquifers of
   Northern Pakistan, filtered by time and geology, protected with modern care.
4. Purity You Can Trust is not a slogan. It is a quiet promise rooted in responsibility.

**The Story** (verbatim, 5 lines)
1. High in the Northern reaches of Pakistan, rain and snowmelt begin a long, quiet journey
   through stone, gravel, and alluvial earth shaped over millennia.
2. This is the same land that once fed the great cities of the Indus Valley — a
   civilisation that understood water as the foundation of life and order.
3. Mountiva draws from these deep aquifers. The water has already been filtered by the land
   itself. We protect it, respect it, and bottle it with precision.
4. No imported myths. No borrowed purity. Just clear water from Northern Pakistan, brought
   forward with modern standards and an ancient sense of duty.
5. This is Mountiva. Purity you can trust.

**Brand Voice** — Calm. Confident. Modern. Grounded. Young in energy, serious in
responsibility. *Lean into*: Depth, Clarity, Trust, Northern land, Continuity,
Responsibility, Pure. *Avoid*: Fairy-tale mountain language, European alpine romance,
Aggressive or rebellious tones.

---

## 3. Our Source (`/source`)

**Hero**: Our Source → *The land does the filtering* → Rain and snowmelt descend for years
through stone, gravel and alluvial earth. We draw the water only after geology has finished
its work.

**The journey underground** (4 steps): Collection at elevation · Slow descent · Mineral
balance · Careful abstraction.

**Stewardship** (3): protect the recharge area · monitor and cap abstraction · keep the
path from source to bottle short, closed and clean.

**Why we describe the source in general terms** — Mountiva names Northern Pakistan and the
deep aquifer, but not exact wellheads or recharge coordinates. Publishing precise locations
protects nobody and the resource least of all. Wholesale partners under agreement receive
the full technical dossier, including source water analysis.

---

## 4. Products & Packaging (`/products`)

**Hero**: *A range built for wholesale.* Still and sparkling. Glass and PET. From the
boardroom to the distributor pallet.

**Wholesale formats** (`src/lib/products.ts`)

| Format | Pack | Cases/pallet | MOQ | Channel |
| --- | --- | --- | --- | --- |
| Still — 330 ml glass | 24 / case | 84 | 50 | Fine dining, boardrooms, in-room hospitality |
| Still — 500 ml PET | 20 / case | 120 | 80 | Events, conferences, corporate pantries |
| Still — 1 L PET | 12 / case | 96 | 60 | Restaurants, catering, institutional supply |
| Still — 1.5 L PET | 6 / case | 100 | 60 | Retail wholesale, distributor pallets, households |
| Sparkling — 330 ml glass | 24 / case | 84 | 50 | Fine dining, premium bars, hospitality |
| Still — 19 L returnable | single | 48 | 40 | Offices, clinics, institutions with coolers |

**Private label** — min volume ≈ 3 containers/year (≈ 60,000 cases); lead time 8–12 weeks
from artwork sign-off. Options: branded artwork on Mountiva-filled bottles · PET or glass,
still or sparkling, 330 ml–1.5 L · neck tags, shrink sleeves, custom carton and pallet ·
PSQCA + destination-market labelling compliance support · batch coding + CoA per run.

---

## 5. Wholesale Hub (`/wholesale`)

**Hero**: *Get bulk pricing.* Tell us the format, volume and destination — we respond with
pricing, lead time and terms, usually within two working days.

**How it works** (4): Send your requirement · Receive a quote · Sample and sign ·
Scheduled delivery.

**Logistics & terms** (4): Coverage (nationwide PK; GCC export FOB Karachi) · Pallet
configuration (48–120 cases; mixed for contracted accounts) · Lead time (days at MOQ;
8–12 wks private label) · Quality documents (CoA per batch; certs and lab reports on
request).

**Enquiry form** fields: name*, company*, role, work email*, phone*, country*, city*,
business type*, formats of interest* (multi), estimated monthly volume (cases)*, private
label (checkbox), message, consent*. → `POST /api/wholesale`.

---

## 6. Quality & Trust (`/quality`)

**Hero**: *Purity you can trust.* A quiet promise rooted in responsibility — backed by
documents you can read before you commit.

**How we hold the line** (4): Batch coding · Certificate of Analysis · Third-party testing
· Controlled filling.

**Lab reports** — representative reports published on the page; contracted partners get the
full current set including source water analysis. (Add PDFs to `public/reports/`.)

**Certifications**: PSQCA licence · ISO 22000 (in progress) · Halal certification ·
Third-party lab panel.

**FAQ** (also emitted as `FAQPage` JSON-LD): source origin · why the exact location isn't
published · lab reports & certificates · minimum order · private label.

---

## 7. Insights (`/blog`)

Three launch articles (`src/lib/blog.ts`):
1. **Civilisational continuity, not nostalgia** — Perspective.
2. **How a Northern aquifer filters water before we ever touch it** — Origin.
3. **What a serious wholesale buyer should ask a water supplier** — Wholesale.

---

## 8. Contact (`/contact`)

**Hero**: *Talk to Mountiva.* Wholesale supply, private label, or partnership. Based in
Pakistan, serving nationwide, GCC export enquiries welcome.

Blocks: Wholesale enquiries (email, phone, WhatsApp) · General (email) · Direct (location,
hours: Mon–Sat 9:00–18:00 PKT). Message form → `POST /api/contact`.

---

## Placeholders to replace before launch

`src/lib/site.ts`: email `wholesale@mountivawater.com`, general `hello@mountivawater.com`, phone
`+92 51 000 0000`, WhatsApp `+92 300 000 0000`, Islamabad address, LinkedIn/Instagram URLs,
`NEXT_PUBLIC_SITE_URL`. Product specs in `src/lib/products.ts`. Lab report PDFs +
`reports[]` in `quality/page.tsx`. Imagery in `public/images/`.
