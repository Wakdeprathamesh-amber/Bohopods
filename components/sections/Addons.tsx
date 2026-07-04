import {
  Armchair,
  Bath,
  Flame,
  Sun,
  TreePine,
  Umbrella,
  UtensilsCrossed,
  Waves,
} from "lucide-react";
import { Container, Section, Eyebrow, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { waLink } from "@/lib/site";

const addons = [
  { icon: Waves, label: "Plunge pool" },
  { icon: Bath, label: "Jacuzzi" },
  { icon: Sun, label: "Solar setup" },
  { icon: Flame, label: "Fire pit" },
  { icon: UtensilsCrossed, label: "Outdoor kitchen" },
  { icon: Armchair, label: "Deck furniture" },
  { icon: Umbrella, label: "Pergola & shade" },
  { icon: TreePine, label: "Landscaping" },
];

export function Addons() {
  return (
    <Section className="border-y border-sand/60 bg-cream/50 py-16 md:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <Reveal>
            <Eyebrow>Add-ons</Eyebrow>
            <h2 className="mt-3 text-3xl font-light">Make it yours.</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              Every pod is a canvas — dress yours up for the way you&rsquo;ll
              live in it.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="lg:max-w-xl">
            <div className="flex flex-wrap gap-2.5">
              {addons.map((a) => (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-paper px-4 py-2 text-sm text-ink"
                >
                  <a.icon className="size-4 text-bronze" />
                  {a.label}
                </span>
              ))}
            </div>
            <CTA
              href={waLink(
                "Hi Boho Pods! I'd like to know more about pod add-ons (plunge pool, jacuzzi, solar…).",
              )}
              external
              variant="outlineDark"
              className="mt-5"
            >
              Ask about add-ons
            </CTA>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
