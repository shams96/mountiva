import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFormatter, getTranslations, setRequestLocale } from 'next-intl/server';

import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { getAllPosts, getPost } from '@/lib/blog';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/Button';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { MountainMotif } from '@/components/brand/MountainMotif';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'article',
    keywords: post.keywords,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'common' });
  const tc = await getTranslations({ locale, namespace: 'cta' });
  const format = await getFormatter({ locale });
  const url = `${site.url}${locale === routing.defaultLocale ? '' : `/${locale}`}/blog/${post.slug}`;

  return (
    <>
      <JsonLd id="ld-article" data={articleSchema(post, url)} />
      <JsonLd
        id="ld-breadcrumb-post"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />

      <article>
        <header className="border-b border-stone bg-paper">
          <Container className="py-16 md:py-24">
            <div className="max-w-3xl">
              <Eyebrow>{post.category}</Eyebrow>
              <h1 className="mt-6 text-display-lg text-ink">{post.title}</h1>
              <p className="mt-5 max-w-prose text-lede leading-relaxed text-slate">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs text-ash">
                <time dateTime={post.publishedAt}>
                  {format.dateTime(new Date(post.publishedAt), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span aria-hidden>·</span>
                <span>{t('readingTime', { minutes: post.readingMinutes })}</span>
              </div>
            </div>
          </Container>
        </header>

        <Section tone="surface">
          <ArticleBody blocks={post.body} />
          <div className="mt-14 flex items-center gap-4 border-t border-stone pt-8">
            <MountainMotif className="h-5 w-auto text-stone" />
            <ButtonLink href="/blog" variant="ghost" className="px-0">
              ← {tc('backToInsights')}
            </ButtonLink>
          </div>
        </Section>
      </article>
    </>
  );
}
