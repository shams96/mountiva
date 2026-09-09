import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/lib/blog';
import { productSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Hero } from '@/components/sections/Hero';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { PostCard } from '@/components/blog/PostCard';
import { MountainMotif } from '@/components/brand/MountainMotif';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return buildMetadata({
    locale,
    title: 'Mountiva',
    description: t('description'),
    path: '',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tf = await getTranslations({ locale, namespace: 'quality' });
  const faqItems = (tf.raw('faq') as { question: string; answer: string }[]).slice(0, 4);

  return (
    <>
      <JsonLd id="ld-product" data={productSchema()} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqItems)} />
      <Hero />
      <Philosophy />
      <SourceTeaser />
      <ProductsPreview />
      <WholesaleBlock />
      <TrustBlock />
      <InsightsPreview posts={getAllPosts().slice(0, 3)} />
      <ClosingCta />
    </>
  );
}

function Philosophy() {
  const t = useTranslations('home.philosophy');
  return (
    <Section tone="surface">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} />
        <Reveal className="flex flex-col gap-6">
          <p className="text-lede leading-relaxed text-slate">{t('body')}</p>
          <ButtonLink href="/story" variant="ghost" className="self-start px-0">
            {t('cta')} →
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

function SourceTeaser() {
  const t = useTranslations('home.source');
  const points = t.raw('points') as { title: string; text: string }[];
  return (
    <Section tone="paper">
      <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} body={t('body')} />
      <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-stone bg-stone sm:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="bg-surface p-7">
            <span className="eyebrow">0{i + 1}</span>
            <h3 className="mt-3 text-title text-ink">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{p.text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10">
        <ButtonLink href="/source" variant="secondary">
          {t('cta')}
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

function ProductsPreview() {
  const t = useTranslations('home.products');
  return (
    <Section tone="mist">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-stone bg-surface">
            <MountainMotif className="h-16 w-auto text-stone" />
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} body={t('body')} />
          <Reveal className="mt-8">
            <ButtonLink href="/products" variant="secondary">
              {t('cta')}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function WholesaleBlock() {
  const t = useTranslations('home.wholesale');
  const stats = t.raw('stats') as { value: string; label: string }[];
  return (
    <Section tone="surface">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} body={t('body')} />
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/wholesale" size="lg">
              {t('primaryCta')}
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary" size="lg">
              {t('secondaryCta')}
            </ButtonLink>
          </Reveal>
        </div>
        <Reveal className="grid grid-cols-3 gap-6 self-center border-s border-stone ps-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-ink">{s.value}</div>
              <div className="mt-1 text-xs leading-snug text-ash">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

function TrustBlock() {
  const t = useTranslations('home.trust');
  return (
    <Section tone="paper">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} />
        <Reveal className="flex flex-col gap-6">
          <p className="text-lede leading-relaxed text-slate">{t('body')}</p>
          <ButtonLink href="/quality" variant="secondary" className="self-start">
            {t('cta')}
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}

function InsightsPreview({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  const t = useTranslations('home.insights');
  return (
    <Section tone="mist">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('heading')} />
        <ButtonLink href="/blog" variant="ghost" className="px-0">
          {t('cta')} →
        </ButtonLink>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06} as="div">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ClosingCta() {
  const t = useTranslations('story.closingCta');
  const tc = useTranslations('cta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('cta'), href: '/wholesale' }}
      secondary={{ label: tc('catalogue'), href: '/products' }}
    />
  );
}
