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
    <section className="relative overflow-hidden bg-gradient-to-br from-glacier-pale via-northern-pale/50 to-paper">
      {/* Restrained droplet wash — echoes the water motif without a literal splash graphic */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 right-[6%] h-80 w-80 rounded-full bg-glacier/20 blur-3xl" />
        <div className="absolute top-1/3 -right-10 h-56 w-56 rounded-full bg-northern/15 blur-3xl" />
        <div className="absolute bottom-[-4rem] left-[18%] h-48 w-48 rounded-full bg-glacier-pale blur-2xl" />
      </div>

      <Container className="relative grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:py-28">
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

        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-sm shadow-lift md:aspect-[16/10]">
            {media.hero.enabled ? (
              <Image
                src={media.hero.src}
                alt={media.hero.alt || t('imageAlt')}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-surface">
                <BottleMark className="h-64 w-auto" />
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
