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
    title: 'Privacy',
    description: `How ${site.legalName} handles the information you share through this site.`,
    path: '/privacy'
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageHero
        eyebrow="Legal"
        heading="Privacy"
        lede={`Draft policy. ${site.legalName} will finalise this with counsel before launch.`}
        motif={false}
      />
      <Section tone="surface">
        <div className="prose-mountiva">
          <p>
            We collect only what you send us through the wholesale and contact forms: your name,
            company, contact details, and what you tell us about your enquiry. We use it to respond
            to you and to manage a business relationship if one begins.
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>Contact and company information you submit in a form.</li>
            <li>Enquiry details: formats, volumes, destination, and your message.</li>
            <li>Standard server logs (IP address, user agent) for security and diagnostics.</li>
          </ul>
          <h2>How we use it</h2>
          <ul>
            <li>To prepare and send a quote or a reply.</li>
            <li>To manage a supply relationship if one begins.</li>
            <li>We do not sell your data or use it for advertising.</li>
          </ul>
          <h2>Retention and your rights</h2>
          <p>
            We keep enquiry records for as long as needed for the relationship and legal
            requirements. To access, correct, or delete your information, email{' '}
            <a href={`mailto:${site.contact.generalEmail}`}>{site.contact.generalEmail}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
