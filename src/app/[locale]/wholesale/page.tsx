import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { WholesaleForm } from '@/components/wholesale/WholesaleForm';
import { site } from '@/lib/site';

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
        <h2 className="text-display-md text-ink">{t('howHeading')}</h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {how.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.05} as="li">
              <span className="font-serif text-2xl text-northern">{s.step}</span>
              <h3 className="mt-3 text-title text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <h2 className="text-display-md text-ink">{t('logisticsHeading')}</h2>
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
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-display-md text-ink">{t('formHeading')}</h2>
            <p className="mt-4 max-w-measure text-sm leading-relaxed text-slate">
              {t('formIntro')}
            </p>
          </div>
          <div className="rounded-sm border border-stone bg-surface p-6 shadow-card md:p-9">
            <WholesaleForm />
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-display-md text-paper">{t('closingCta.heading')}</h2>
          <p className="mt-3 text-lede text-paper/75">{t('closingCta.body')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="inverse" size="lg">
              {t('closingCta.cta')}
            </ButtonLink>
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="inline-flex h-13 min-h-[3.25rem] items-center justify-center rounded-sm border border-paper/25 px-7 text-[0.95rem] font-medium text-paper no-underline transition-colors hover:bg-paper/10"
            >
              {site.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
