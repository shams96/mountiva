import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Fraunces, Inter, Noto_Nastaliq_Urdu, Noto_Naskh_Arabic } from 'next/font/google';

import { routing, isRtl, hasLocale } from '@/i18n/routing';
import { buildMetadata, metadataBaseUrl } from '@/lib/seo';
import { site } from '@/lib/site';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans'
});

const serif = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['opsz']
});

const urdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-urdu'
});

const arabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-arabic'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
  width: 'device-width',
  initialScale: 1
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: metadataBaseUrl(),
    applicationName: site.name,
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    publisher: site.legalName,
    formatDetection: { telephone: true, address: false, email: false },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    ...buildMetadata({
      locale,
      title: site.name,
      description: t('description'),
      path: '',
      keywords: t.raw('keywords') as string[]
    })
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = isRtl(locale) ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sans.variable} ${serif.variable} ${urdu.variable} ${arabic.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd id="ld-org" data={organizationSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
