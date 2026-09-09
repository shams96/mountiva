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
import { MountainMotif } from '@/components/brand/MountainMotif';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.story' });
  return buildMetadata({
    locale,
    title: t('title'),
    description: t('description'),
    path: '/story',
    keywords: t.raw('keywords') as string[]
  });
}

export default async function StoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd
        id="ld-breadcrumb-story"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Story', path: '/story' }
        ])}
      />
      <StoryContent />
      <ClosingCta />
    </>
  );
}

function StoryContent() {
  const t = useTranslations('story');
  const philosophy = t.raw('philosophy') as string[];
  const story = t.raw('story') as string[];
  const voice = t.raw('voice') as {
    line: string;
    preferHeading: string;
    prefer: string[];
    avoidHeading: string;
    avoid: string[];
  };

  return (
    <>
      <PageHero eyebrow={t('hero.eyebrow')} heading={t('hero.heading')} lede={t('hero.lede')} />

      <Section tone="surface">
        <SectionHeading title={t('philosophyHeading')} />
        <Reveal className="prose-mountiva mt-10">
          {philosophy.map((line, i) => (
            <p key={i} className={i === 1 ? 'font-serif text-title text-ink' : undefined}>
              {line}
            </p>
          ))}
        </Reveal>
      </Section>

      <Section tone="paper">
        <SectionHeading title={t('storyHeading')} />
        <Reveal className="prose-mountiva mt-10">
          {story.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </Reveal>
        <MountainMotif className="mt-12 hidden h-8 w-auto text-stone lg:block" />
      </Section>

      <Section tone="mist">
        <SectionHeading title={t('voiceHeading')} />
        <div className="mt-10 flex flex-col gap-10">
          <Reveal>
            <p className="max-w-prose font-serif text-title text-ink">{voice.line}</p>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2">
            <Reveal>
              <h3 className="eyebrow">{voice.preferHeading}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {voice.prefer.map((w) => (
                  <li
                    key={w}
                    className="rounded-sm border border-signal/30 bg-signal/[0.04] px-3 py-1 text-sm text-ink"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="eyebrow">{voice.avoidHeading}</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ash">
                {voice.avoid.map((w) => (
                  <li key={w} className="flex items-center gap-2">
                    <span aria-hidden className="text-signal-soft">
                      ✕
                    </span>
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}

function ClosingCta() {
  const t = useTranslations('story.closingCta');
  const tc = useTranslations('cta');
  return (
    <CtaBanner
      heading={t('heading')}
      body={t('body')}
      primary={{ label: t('cta'), href: '/wholesale' }}
      secondary={{ label: tc('exploreSource'), href: '/source' }}
    />
  );
}
