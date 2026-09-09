import { Reveal } from '@/components/ui/Reveal';

type Step = { step: string; title: string; text: string };

/**
 * "The descent" — a light scrollytelling treatment for Our Source.
 *
 * On desktop a sticky rail shows a red dot that travels down as the four
 * steps pass through the viewport (CSS `view-timeline`, zero JS). Without
 * scroll-timeline support, or under reduced motion, it degrades to a
 * stacked sequence with a static rail — still deliberate, never broken.
 * See `.descent*` rules in globals.css.
 */
export function SourceJourney({ steps }: { steps: Step[] }) {
  return (
    <div className="descent">
      <div className="descent-rail" aria-hidden>
        <span className="descent-dot" />
      </div>

      <ol className="descent-steps">
        {steps.map((s, i) => (
          <Reveal key={s.step} as="li" delay={i * 0.05} className="max-w-xl">
            <span className="font-serif text-4xl text-signal md:text-5xl">{s.step}</span>
            <h3 className="mt-4 text-title text-ink md:text-display-md">{s.title}</h3>
            <p className="mt-3 text-lede leading-relaxed text-slate">{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
