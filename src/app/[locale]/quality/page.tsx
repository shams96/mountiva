import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, speakableWebPage } from '@/lib/schema';
import { site } from '@/lib/site';
import { routing } from '@/i18n/routing';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/sections/CtaBanner';

type Props = { params: Promise<{ locale: string }> };

/** Published lab reports. Add files to /public/reports and list them here. */
const reports: { title: string; file: string; issued: string }[] = [];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.quality' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/quality',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function QualityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'quality' });
  const faqItems = t.raw('faq') as { question: string; answer: string }[];
  const pageUrl = `${site.url}${locale === routing.defaultLocale ? '' : `/${locale}`}/quality`;

  return (
    <>
      <JsonLd
        id="ld-breadcrumb-quality"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Quality & Trust', path: '/quality' }
        ])}
      />
      <JsonLd id="ld-faq-quality" data={faqSchema(faqItems)} />
      <JsonLd id="ld-speakable-quality" data={speakableWebPage(pageUrl, t('hero.heading'))} />
      <QualityContent />
      <ClosingCta />
    </>
  );
}

function QualityContent() {
  const t = useTranslations('quality');
  const practice = t.raw('practice') as { title: string; text: string }[];
  const certs = t.raw('certs') as { name: string; detail: string }[];
  const faq = t.raw('faq') as { question: string; answer: string }[];

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <SectionHeading title={t('practiceHeading')} />
        <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-stone bg-stone sm:grid-cols-2">
          {practice.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="bg-surface p-7">
              <h3 className="text-title text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <SectionHeading title={t('reportsHeading')} />
        <div className="mt-10">
          <div>
            <p className="max-w-prose text-lede leading-relaxed text-slate">{t('reportsIntro')}</p>
            {reports.length > 0 ? (
              <ul className="mt-10 divide-y divide-stone border-y border-stone">
                {reports.map((r) => (
                  <li key={r.file} className="flex items-center justify-between gap-4 py-4">
                    <span>
                      <span className="block text-sm font-medium text-ink">{r.title}</span>
                      <span className="block text-xs text-ash">{r.issued}</span>
                    </span>
                    <a
                      href={`/reports/${r.file}`}
                      className="link-quiet group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF
                      <span className="cta-arrow" aria-hidden>
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-10 rounded-sm border border-dashed border-stone bg-mist/50 p-6 text-sm text-slate">
                {t('reportsPending')}{' '}
                <a href={`mailto:${site.contact.email}`} className="link-quiet">
                  {site.contact.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHeading title={t('certsHeading')} />
        <div className="mt-10">
          <div>
            <p className="max-w-prose text-lede leading-relaxed text-slate">{t('certsIntro')}</p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {certs.map((c) => (
                <div key={c.name} className="border-t border-ink pt-4">
                  <dt className="text-sm font-medium text-ink">{c.name}</dt>
                  <dd className="mt-1 text-sm text-slate">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading title={t('faqHeading')} />
        <div className="mt-10 divide-y divide-stone border-y border-stone">
          {faq.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-title text-ink [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="text-ash transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}

function ClosingCta() {
  const t = useTranslations('quality.closingCta');
  const tc = useTranslations('cta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('cta'), href: '/wholesale' }}
      secondary={{ label: tc('contactTeam'), href: '/contact' }}
    />
  );
}
