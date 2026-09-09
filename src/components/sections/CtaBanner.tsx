import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { MountainMotif } from '@/components/brand/MountainMotif';

type CtaBannerProps = {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBanner({ heading, body, primary, secondary }: CtaBannerProps) {
  return (
    <Section tone="night">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <MountainMotif className="h-6 w-auto text-glacier-soft" />
        <h2 className="mt-6 text-display-md text-paper md:text-display-lg">{heading}</h2>
        <p className="mt-4 max-w-xl text-lede leading-relaxed text-paper/75">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={primary.href} variant="inverse" size="lg">
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink
              href={secondary.href}
              size="lg"
              className="border border-paper/25 bg-transparent text-paper hover:bg-paper/10"
            >
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
