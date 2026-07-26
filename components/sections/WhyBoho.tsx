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
            {/* Two hard single lines — fluid size keeps each on one line at any width */}
            <h2 className="mt-5 font-light">
              <span className="block whitespace-nowrap text-[clamp(1.05rem,4.6vw,3.9rem)] leading-[1.15]">
                Your land should start giving back
              </span>
              <span className="block whitespace-nowrap font-serif-i font-normal text-olive-deep text-[clamp(1.05rem,4.6vw,3.9rem)] leading-[1.25]">
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
          <div className="mt-20 border-t border-sand pt-10">
            <p className="text-center font-serif-i text-2xl text-olive-deep sm:text-3xl">
              Designed in Mumbai. Made to last.
            </p>
            <div className="mx-auto mt-9 grid max-w-4xl gap-8 sm:grid-cols-3">
              {craft.map((c) => (
                <div key={c.title} className="flex gap-3">
                  <c.icon className="mt-0.5 size-5 shrink-0 text-olive" />
                  <div>
                    <h3 className="text-base">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
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
