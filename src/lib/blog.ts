/**
 * Editorial content lives here as structured data so it renders identically
 * across locales and stays trivially indexable. Each block is rendered by
 * `ArticleBody`. Add posts by appending to `posts` (newest first).
 */
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  updatedAt?: string;
  readingMinutes: number;
  category: 'Origin' | 'Wholesale' | 'Quality' | 'Perspective';
  author: string;
  keywords: string[];
  body: ArticleBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: 'civilisational-continuity-not-nostalgia',
    title: 'Civilisational continuity, not nostalgia',
    excerpt:
      'Why Mountiva refuses the imported alpine fairy tale and instead points to the land that organised itself around water five thousand years ago.',
    publishedAt: '2026-07-14',
    readingMinutes: 5,
    category: 'Perspective',
    author: 'Mountiva',
    keywords: [
      'Indus Valley water',
      'Northern Pakistan mineral water',
      'civilisational continuity',
      'premium water brand Pakistan'
    ],
    body: [
      {
        type: 'p',
        text: 'Most premium water brands sell a picture: a distant European peak, snow that never melts, a story that was never ours. It photographs well. It also asks a Pakistani buyer to believe that purity is something imported.'
      },
      {
        type: 'p',
        text: 'Mountiva starts from a different fact. The land of the Indus basin held one of the earliest civilisations that treated water as infrastructure — wells, covered drains, bathing tanks, planned streets that sloped water away from homes. People here understood water as the foundation of order long before it became a marketing category.'
      },
      { type: 'h2', text: 'The claim, stated plainly' },
      {
        type: 'quote',
        text: 'We do not sell mountain fairy tales from Europe. We draw water from the same land that taught the world how to live with water 5,000 years ago. This is not nostalgia. It is civilisational continuity.'
      },
      {
        type: 'p',
        text: 'Continuity is a stronger idea than heritage. Heritage looks back and stops. Continuity means the same responsibility is still being carried — by the geology that filters the water, and by the people who bottle it under modern standards today.'
      },
      { type: 'h2', text: 'What this means for the brand' },
      {
        type: 'list',
        items: [
          'No borrowed imagery. The landscape on our materials is Northern Pakistan.',
          'No overstated romance. The tone is calm, confident and grounded.',
          'No vague science. Quality claims are backed by lab reports you can read.'
        ]
      },
      {
        type: 'p',
        text: 'That is the whole position. Clear water from Northern Pakistan, carried forward with precision and an old sense of duty.'
      }
    ]
  },
  {
    slug: 'how-northern-aquifers-filter-water',
    title: 'How a Northern aquifer filters water before we ever touch it',
    excerpt:
      'Rain and snowmelt, then a slow descent through stone, gravel and alluvial earth. A plain-language look at natural filtration and why we protect the recharge zone.',
    publishedAt: '2026-08-05',
    readingMinutes: 6,
    category: 'Origin',
    author: 'Mountiva',
    keywords: [
      'aquifer filtration',
      'natural mineral water source',
      'groundwater Northern Pakistan',
      'how mineral water is filtered'
    ],
    body: [
      {
        type: 'p',
        text: 'A deep aquifer is not a hidden lake. It is water held in the pore spaces of rock and sediment, moving slowly, sometimes over decades, from where it entered the ground to where it is drawn.'
      },
      { type: 'h2', text: 'The journey' },
      {
        type: 'p',
        text: 'In the Northern reaches of Pakistan, rain and snowmelt collect at elevation and begin to percolate downward. As the water passes through fractured stone, then gravel, then fine alluvial earth shaped over millennia, particles are strained out and the water equilibrates with the surrounding minerals.'
      },
      {
        type: 'list',
        items: [
          'Physical filtration: sediment layers remove suspended particles and microbial load.',
          'Residence time: years underground mean the water is stable and consistent in character.',
          'Mineral balance: calcium, magnesium and bicarbonate are acquired from the host rock, not added.'
        ]
      },
      { type: 'h2', text: 'Our job is restraint' },
      {
        type: 'p',
        text: 'The land has already done the filtration. Our responsibility is to not undo it: protect the recharge area, control abstraction so the aquifer is not drawn down faster than it refills, and move the water from source to bottle with minimal handling.'
      },
      {
        type: 'quote',
        text: 'The water has already been filtered by the land itself. We protect it, respect it, and bottle it with precision.'
      },
      {
        type: 'p',
        text: 'We describe the source in general terms on purpose. The exact wellheads and recharge zones are protected information — publishing precise coordinates protects nobody and the resource least of all.'
      }
    ]
  },
  {
    slug: 'what-a-wholesale-buyer-should-ask',
    title: 'What a serious wholesale buyer should ask a water supplier',
    excerpt:
      'A short checklist for hotels, restaurants, distributors and institutions evaluating a bulk water partner — beyond price per case.',
    publishedAt: '2026-08-28',
    readingMinutes: 4,
    category: 'Wholesale',
    author: 'Mountiva',
    keywords: [
      'wholesale water supplier Pakistan',
      'bulk mineral water pricing',
      'private label water',
      'HORECA water supply'
    ],
    body: [
      {
        type: 'p',
        text: 'Price per case is easy to compare and the least useful number on its own. These are the questions that separate a reliable supply partner from a cheap one.'
      },
      { type: 'h2', text: 'Supply reliability' },
      {
        type: 'list',
        items: [
          'What is your standing production capacity, and your lead time at MOQ versus at container volume?',
          'Can you hold safety stock for a contracted account, and how is a shortfall handled?',
          'What are your delivery terms — ex-works, delivered, palletised, and to which cities?'
        ]
      },
      { type: 'h2', text: 'Quality evidence' },
      {
        type: 'list',
        items: [
          'Do you issue a Certificate of Analysis per batch, and will you share a recent third-party lab report?',
          'Which certifications do you hold, and are they current?',
          'How is batch coding done, so a recall or a query can be traced to a production run?'
        ]
      },
      { type: 'h2', text: 'Commercial fit' },
      {
        type: 'list',
        items: [
          'What formats and pack configurations are available, and can they be mixed on a pallet?',
          'What does private label require — minimum volume, artwork process, lead time?',
          'What are payment terms for a contracted wholesale account?'
        ]
      },
      {
        type: 'p',
        text: 'Mountiva answers all of the above in a wholesale quote. Ask us the hard version of every question here.'
      }
    ]
  }
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
