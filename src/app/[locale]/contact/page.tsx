import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { ContactForm } from '@/components/contact/ContactForm';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/contact',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-contact"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ])}
      />
      <ContactContent />
      <ClosingCta />
    </>
  );
}

function ContactContent() {
  const t = useTranslations('contact');

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <ContactBlock
              heading={t('wholesaleHeading')}
              rows={[
                { label: t('emailLabel'), value: site.contact.email, href: `mailto:${site.contact.email}` },
                { label: t('phoneLabel'), value: site.contact.phoneDisplay, href: `tel:${site.contact.phoneHref}` },
                { label: t('whatsappLabel'), value: site.contact.whatsapp }
              ]}
            />
            <ContactBlock
              heading={t('generalHeading')}
              rows={[
                {
                  label: t('emailLabel'),
                  value: site.contact.generalEmail,
                  href: `mailto:${site.contact.generalEmail}`
                }
              ]}
            />
            <ContactBlock
              heading={t('directHeading')}
              rows={[
                {
                  label: t('locationLabel'),
                  value: `${site.contact.addressLocality}, ${site.contact.addressRegion}, ${site.contact.addressCountry}`
                },
                { label: t('hoursLabel'), value: t('hoursValue') }
              ]}
            />
          </div>

          <div className="rounded-sm border border-stone bg-surface p-6 shadow-card md:p-9">
            <h2 className="text-title text-ink">{t('formHeading')}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactBlock({
  heading,
  rows
}: {
  heading: string;
  rows: { label: string; value: string; href?: string }[];
}) {
  return (
    <div className="border-t border-ink pt-5">
      <h2 className="eyebrow">{heading}</h2>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-0.5">
            <dt className="text-xs text-ash">{r.label}</dt>
            <dd className="text-sm text-ink">
              {r.href ? (
                <a href={r.href} className="no-underline hover:text-northern">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ClosingCta() {
  const t = useTranslations('contact.closingCta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('cta'), href: '/wholesale' }}
    />
  );
}
