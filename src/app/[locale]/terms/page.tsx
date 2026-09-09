import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata({
    locale,
    title: 'Terms',
    description: `Terms for using the ${site.legalName} website.`,
    path: '/terms'
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Terms"
        lede={`Draft terms. ${site.legalName} will finalise this with counsel before launch.`}
        motif={false}
      />
      <Section tone="surface">
        <div className="prose-mountiva">
          <h2>Website use</h2>
          <p>
            This site presents information about Mountiva natural mineral water and its wholesale
            programme. Content is provided in good faith for general information and does not
            constitute a binding offer.
          </p>
          <h2>Quotes and orders</h2>
          <p>
            Pricing, minimum order quantities, lead times, and specifications are confirmed in a
            written quote and supply agreement. Where this site and a signed agreement differ, the
            agreement governs.
          </p>
          <h2>Intellectual property</h2>
          <p>
            The Mountiva name, wordmark, and site content are the property of {site.legalName}. Do
            not reproduce them without written permission.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.contact.generalEmail}`}>{site.contact.generalEmail}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
