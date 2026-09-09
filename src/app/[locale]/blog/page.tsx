import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { getAllPosts } from '@/lib/blog';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PostCard } from '@/components/blog/PostCard';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.blog' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/blog',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-blog"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' }
        ])}
      />
      <BlogIndexContent count={posts.length} />
      <Section tone="surface">
        {posts.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05} as="div">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

function BlogIndexContent({ count }: { count: number }) {
  const t = useTranslations('blog');
  return (
    <PageHero
      eyebrow={t('hero.eyebrow')}
      heading={t('hero.heading')}
      lede={count > 0 ? t('hero.lede') : t('empty')}
    />
  );
}

function Empty() {
  const t = useTranslations('blog');
  return <p className="text-slate">{t('empty')}</p>;
}
