import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BottleMark } from '@/components/brand/BottleMark';
import { media } from '@/lib/media';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden bg-paper">
      {media.heroBackground.enabled ? (
        <>
          <Image
            data-hero-bg
            src={media.heroBackground.src}
            alt={media.heroBackground.alt}
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-paper/70" />
        </>
      ) : (
        /* Soft Northern horizon wash — stands in for a landscape until one is set */
        <div
          aria-hidden
          className="hero-wash pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-glacier-pale/70 via-northern-pale/30 to-transparent"
        />
      )}

      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-28">
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{t('eyebrow')}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 text-display-lg text-ink md:text-display-xl">
              {t('headline')}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-7 border-s-2 border-signal ps-5 text-lede leading-relaxed text-slate">
              {t('claim')}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/wholesale" size="lg">
                {t('primaryCta')}
              </ButtonLink>
              <ButtonLink href="/quality" variant="secondary" size="lg">
                {t('secondaryCta')}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="justify-self-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full bg-white/70 blur-2xl"
            />
            {media.hero.enabled ? (
              <div className="relative h-[420px] w-[300px] md:h-[520px] md:w-[380px]">
                <Image
                  src={media.hero.src}
                  alt={media.hero.alt || t('imageAlt')}
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, 380px"
                  className="object-contain"
                />
              </div>
            ) : (
              <BottleMark className="relative h-[420px] w-auto md:h-[520px]" />
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
