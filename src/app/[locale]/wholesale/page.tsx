import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.wholesale' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/wholesale',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function WholesalePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tq = await getTranslations({ locale, namespace: 'quality' });
  const faqItems = tq.raw('faq') as { question: string; answer: string }[];

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-wholesale"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Wholesale', path: '/wholesale' }
        ])}
      />
      <JsonLd id="ld-faq-wholesale" data={faqSchema(faqItems)} />
      <WholesaleContent />
      <ClosingCta />
    </>
  );
}

function WholesaleContent() {
  const t = useTranslations('wholesale');
  const how = t.raw('how') as { step: string; title: string; text: string }[];
  const logistics = t.raw('logistics') as { title: string; text: string }[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <SectionHeading title={t('howHeading')} />
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {how.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.05} as="li">
              <span className="font-serif text-2xl text-signal">{s.step}</span>
              <h3 className="mt-3 text-title text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <SectionHeading title={t('logisticsHeading')} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-stone bg-stone sm:grid-cols-2">
          {logistics.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.05} className="bg-surface p-7">
              <h3 className="text-title text-ink">{l.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{l.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" id="request">
        <SectionHeading title={t('formHeading')} body={t('formIntro')} />
        <div className="mt-10 max-w-3xl rounded-sm border border-stone bg-surface p-6 shadow-card md:p-9">
          <WholesaleForm />
        </div>
      </Section>
    </>
  );
}

function ClosingCta() {
  const t = useTranslations('wholesale.closingCta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('cta'), href: '/contact' }}
      tertiary={{ label: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}`, external: true }}
    />
  );
}
