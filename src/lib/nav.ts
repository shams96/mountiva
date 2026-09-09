/** Primary navigation. `key` maps to messages under `nav.*`. */
export type NavItem = {
  key: 'story' | 'source' | 'products' | 'wholesale' | 'quality' | 'blog' | 'contact';
  href: string;
};

export const primaryNav: NavItem[] = [
  { key: 'story', href: '/story' },
  { key: 'source', href: '/source' },
  { key: 'products', href: '/products' },
  { key: 'wholesale', href: '/wholesale' },
  { key: 'quality', href: '/quality' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' }
];

export const footerNav: { headingKey: string; items: NavItem[] }[] = [
  {
    headingKey: 'footer.explore',
    items: [
      { key: 'story', href: '/story' },
      { key: 'source', href: '/source' },
      { key: 'quality', href: '/quality' },
      { key: 'blog', href: '/blog' }
    ]
  },
  {
    headingKey: 'footer.business',
    items: [
      { key: 'products', href: '/products' },
      { key: 'wholesale', href: '/wholesale' },
      { key: 'contact', href: '/contact' }
    ]
  }
];
