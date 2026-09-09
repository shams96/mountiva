import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/sections/CtaBanner';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.source' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/source',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function SourcePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-source"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Source', path: '/source' }
        ])}
      />
      <SourceContent />
      <ClosingCta />
    </>
  );
}

function SourceContent() {
  const t = useTranslations('source');
  const journey = t.raw('journey') as { step: string; title: string; text: string }[];
  const stewardship = t.raw('stewardship') as string[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <h2 className="text-display-md text-ink">{t('journeyHeading')}</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-stone bg-stone md:grid-cols-2">
          {journey.map((j, i) => (
            <Reveal key={j.step} delay={i * 0.05} as="li" className="bg-surface p-8">
              <span className="font-serif text-2xl text-northern">{j.step}</span>
              <h3 className="mt-3 text-title text-ink">{j.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{j.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <h2 className="text-display-md text-ink">{t('stewardshipHeading')}</h2>
          <Reveal className="prose-mountiva">
            <ul>
              {stewardship.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-prose text-center">
          <Reveal>
            <h2 className="text-display-md text-ink">{t('transparencyHeading')}</h2>
            <p className="mt-5 text-lede leading-relaxed text-slate">{t('transparency')}</p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ClosingCta() {
  const t = useTranslations('source.closingCta');
  const tc = useTranslations('cta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: tc('primary'), href: '/wholesale' }}
      secondary={{ label: t('cta'), href: '/quality' }}
    />
  );
}
