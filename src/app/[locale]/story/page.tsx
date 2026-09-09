import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import { buildMetadata } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
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
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <h2 className="text-display-md text-ink">{t('philosophyHeading')}</h2>
          <Reveal className="prose-mountiva">
            {philosophy.map((line, i) => (
              <p key={i} className={i === 1 ? 'font-serif text-title text-ink' : undefined}>
                {line}
              </p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <div>
            <h2 className="text-display-md text-ink">{t('storyHeading')}</h2>
            <MountainMotif className="mt-6 hidden h-10 w-auto text-stone lg:block" />
          </div>
          <Reveal className="prose-mountiva">
            {story.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <h2 className="text-display-md text-paper">{t('voiceHeading')}</h2>
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="max-w-prose font-serif text-title text-paper">{voice.line}</p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              <Reveal>
                <h3 className="eyebrow text-paper/60">{voice.preferHeading}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {voice.prefer.map((w) => (
                    <li
                      key={w}
                      className="rounded-sm border border-paper/20 px-3 py-1 text-sm text-paper/90"
                    >
                      {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="eyebrow text-paper/60">{voice.avoidHeading}</h3>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-paper/60">
                  {voice.avoid.map((w) => (
                    <li key={w} className="flex items-center gap-2">
                      <span aria-hidden className="text-paper/40">
                        ✕
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
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
