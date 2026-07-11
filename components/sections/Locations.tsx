import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { IndiaWestMap } from "../decor/IndiaWestMap";

export function Locations() {
  return (
    <Section id="locations" className="bg-forest text-paper md:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="text-sage">Locations</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light text-paper">
              Where will yours stand?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-paper/70">
              Down India&rsquo;s west coast — from the Western Ghats to the
              Konkan shore, most within a 2–6 hour drive of Mumbai &amp; Pune.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {/* Mobile: map keeps a legible width and pans sideways */}
          <div className="relative mx-auto mt-8 max-w-3xl overflow-x-auto rounded-3xl border border-paper/15 bg-forest-deep/40">
            <IndiaWestMap className="h-auto w-full min-w-[620px] sm:min-w-0" />
          </div>
          <p className="mt-3 text-center text-xs text-paper/50 sm:hidden">
            ← Drag the map to explore →
          </p>
          <p className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-xs text-paper/50">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-bronze" /> Bohopods destinations
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 border border-paper/60" /> Reference cities
            </span>
            <span>Stylised topography — not to scale</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
