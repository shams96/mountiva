import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { SourceJourney } from '@/components/sections/SourceJourney';

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
        <SectionHeading title={t('journeyHeading')} />
        <div className="mt-12">
          <SourceJourney steps={journey} />
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading title={t('stewardshipHeading')} />
        <Reveal className="prose-mountiva mt-10">
          <ul>
            {stewardship.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section tone="mist">
        <SectionHeading
          align="center"
          title={t('transparencyHeading')}
          body={t('transparency')}
          className="mx-auto"
        />
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
