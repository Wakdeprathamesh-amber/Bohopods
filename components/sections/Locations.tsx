import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { LocationsScene } from "../LocationsScene";

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
              Across India&rsquo;s most beautiful country — ghats, coasts,
              forests and Himalayan foothills, wherever your land dreams big.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {/* Cinematic miniature India — 3D terrain, glowing destinations */}
          <LocationsScene />
          <p className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center text-xs text-paper/50">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-bronze" /> Where Bohopods thrive
            </span>
            <span className="hidden sm:inline">Move your cursor · hover a light</span>
            <span className="sm:hidden">Tap a light to explore</span>
            <span>Stylised terrain — not to scale</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
