import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema, productSchema } from '@/lib/schema';
import { products, privateLabel } from '@/lib/products';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { CtaBanner } from '@/components/sections/CtaBanner';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.products' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/products',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd id="ld-product-page" data={productSchema()} />
      <JsonLd
        id="ld-breadcrumb-products"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products & Packaging', path: '/products' }
        ])}
      />
      <ProductsContent />
      <ClosingCta />
    </>
  );
}

function ProductsContent() {
  const t = useTranslations('products');
  const c = t.raw('columns') as Record<string, string>;

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <h2 className="text-display-md text-ink">{t('tableHeading')}</h2>

        {/* Table on md+, stacked cards on mobile */}
        <div className="mt-10 hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-ink text-xs uppercase tracking-eyebrow text-ash">
                <th className="py-3 pe-4 font-medium">{c.format}</th>
                <th className="py-3 pe-4 font-medium">{c.pack}</th>
                <th className="py-3 pe-4 font-medium">{c.pallet}</th>
                <th className="py-3 pe-4 font-medium">{c.moq}</th>
                <th className="py-3 font-medium">{c.channel}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-b border-stone align-top">
                  <td className="py-4 pe-4 font-medium text-ink">{p.format}</td>
                  <td className="py-4 pe-4 text-slate">{p.packConfig}</td>
                  <td className="py-4 pe-4 text-slate">{p.casesPerPallet}</td>
                  <td className="py-4 pe-4 text-slate">{p.moqCases}</td>
                  <td className="py-4 text-slate">{p.channel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid gap-4 md:hidden">
          {products.map((p) => (
            <div key={p.slug} className="rounded-sm border border-stone p-5">
              <h3 className="font-medium text-ink">{p.format}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-ash">{c.pack}</dt>
                <dd className="text-slate">{p.packConfig}</dd>
                <dt className="text-ash">{c.pallet}</dt>
                <dd className="text-slate">{p.casesPerPallet}</dd>
                <dt className="text-ash">{c.moq}</dt>
                <dd className="text-slate">{p.moqCases}</dd>
                <dt className="text-ash">{c.channel}</dt>
                <dd className="text-slate">{p.channel}</dd>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-6 max-w-measure text-xs text-ash">{t('moqNote')}</p>
      </Section>

      <Section tone="night">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-display-md text-paper">{t('privateLabelHeading')}</h2>
            <p className="mt-4 max-w-measure text-lede leading-relaxed text-paper/75">
              {t('privateLabelBody')}
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="eyebrow text-paper/60">{t('privateLabelMeta.volume')}</dt>
                <dd className="mt-1 text-paper">{privateLabel.minAnnualVolume}</dd>
              </div>
              <div>
                <dt className="eyebrow text-paper/60">{t('privateLabelMeta.leadTime')}</dt>
                <dd className="mt-1 text-paper">{privateLabel.leadTimeWeeks}</dd>
              </div>
            </dl>
          </div>
          <Reveal>
            <ul className="space-y-3 text-sm text-paper/80">
              {privateLabel.options.map((o) => (
                <li key={o} className="flex gap-3 border-b border-paper/15 pb-3">
                  <span aria-hidden className="text-northern-soft">
                    —
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
    </>
  );
}

function ClosingCta() {
  const t = useTranslations('products.closingCta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('primaryCta'), href: '/wholesale' }}
      secondary={{ label: t('secondaryCta'), href: '/wholesale' }}
    />
  );
}
