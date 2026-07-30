import { Factory, Leaf, ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { PillarShowcase } from "../PillarShowcase";

const craft = [
  {
    icon: Factory,
    title: "Factory-built precision",
    body: "Engineered indoors to exacting standards, installed in days.",
  },
  {
    icon: Leaf,
    title: "Light on the land",
    body: "Low-carbon build, minimal site disturbance.",
  },
  {
    icon: ShieldCheck,
    title: "Engineered for India",
    body: "Coastal salt, ghat monsoons, inland heat — handled.",
  },
];

export function WhyBoho() {
  return (
    <Section id="why" className="bg-cream">
      <Container>
        <div className="text-center">
          <Reveal>
            <Eyebrow>Owning land is the beginning of a legacy</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            {/* Mobile: readable size that wraps. ≥640px: each stays on one
                elegant single line via nowrap + fluid width-based sizing. */}
            <h2 className="mt-5 font-light">
              <span className="block text-[clamp(1.9rem,7.4vw,2.6rem)] leading-[1.12] sm:whitespace-nowrap sm:text-[clamp(1.4rem,4.6vw,3.9rem)]">
                Your land should start giving back
              </span>
              <span className="mt-1 block font-serif-i font-normal text-olive-deep text-[clamp(1.9rem,7.4vw,2.6rem)] leading-[1.2] sm:mt-0 sm:whitespace-nowrap sm:text-[clamp(1.4rem,4.6vw,3.9rem)]">
                the moment you own it.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Inspired by Scandinavian simplicity and built for the way you want to
              live, Boho Pods are more than spaces — they&rsquo;re experiences. A
              weekend retreat, a creative studio, or a bridge to your dream villa,
              in perfect balance between nature and nurture.
            </p>
          </Reveal>
        </div>

        {/* Pillars — interactive showcase: click a pillar, see the scene */}
        <Reveal delay={0.1}>
          <div className="mt-14">
            <PillarShowcase />
          </div>
        </Reveal>

        {/* Craft — merged brand/About beat */}
        <Reveal delay={0.1}>
          <div className="mt-24 border-t border-sand pt-14 md:mt-28 md:pt-16">
            <p className="text-center font-serif-i font-normal leading-[1.1] text-olive-deep text-[clamp(2.1rem,1rem+4.5vw,4.5rem)]">
              Designed in Mumbai.
              <br className="hidden sm:block" />{" "}
              <span className="text-forest">Made to last.</span>
            </p>
            <p className="mx-auto mt-5 max-w-xl text-center text-base text-muted md:text-lg">
              Scandinavian clarity, engineered in Worli — factory-built for
              Indian weather and a 30+ year life on your land.
            </p>
            <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-3">
              {craft.map((c) => (
                <div key={c.title} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sage/30 text-olive-deep">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg md:text-xl">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                      {c.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
