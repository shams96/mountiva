import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { MountainMotif } from '@/components/brand/MountainMotif';

type Cta = { label: string; href: string; external?: boolean };

type CtaBannerProps = {
  heading: string;
  body: string;
  primary: Cta;
  secondary?: Cta;
  /** A quieter third action, e.g. a phone link. Rendered as an outline link. */
  tertiary?: Cta;
};

const outline =
  'border border-paper/25 bg-transparent text-paper hover:bg-paper/10';

export function CtaBanner({ heading, body, primary, secondary, tertiary }: CtaBannerProps) {
  return (
    <Section tone="night">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <MountainMotif className="h-6 w-auto text-glacier-soft" />
        <h2 className="mt-6 text-display-md text-paper md:text-display-lg">{heading}</h2>
        <p className="mt-4 max-w-xl text-lede leading-relaxed text-paper/75">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primary.href} variant="inverse" size="lg" external={primary.external}>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondary.href} size="lg" external={secondary.external} className={outline}>
              {secondary.label}
            </ButtonLink>
          )}
          {tertiary && (
            <ButtonLink href={tertiary.href} size="lg" external={tertiary.external} className={outline}>
              {tertiary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
