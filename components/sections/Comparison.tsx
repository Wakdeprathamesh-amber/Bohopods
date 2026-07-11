import { Check, X } from "lucide-react";
import { Container, Section, Eyebrow, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { Topo } from "../decor/Topo";
import { waLink, waMsg } from "@/lib/site";

const boho = [
  "Ready in 30–45 days",
  "No municipal permissions",
  "One fixed, known price",
  "Low-maintenance, AMC-backed",
  "Modular — extend or relocate",
  "Starts earning in months",
  "Light, low-carbon footprint",
];

const villa = [
  "1–3 years of construction",
  "Heavy approvals & red tape",
  "Budgets that overrun",
  "Constant upkeep & staffing",
  "Fixed in place forever",
  "Years before any return",
  "Heavy material & site waste",
];

export function Comparison() {
  return (
    <Section className="relative overflow-hidden bg-paper">
      <Topo className="pointer-events-none absolute -top-8 left-0 h-72 w-full text-olive/10" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Why prefab</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light text-balance">
              Why wait years to build, when you can stay this season?
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl bg-forest p-8 text-paper shadow-xl shadow-forest/10">
              <h3 className="text-2xl text-paper">A Bohopod</h3>
              <ul className="mt-6 space-y-3.5">
                {boho.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/25">
                      <Check className="size-3.5 text-sage" />
                    </span>
                    <span className="text-paper/90">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-sand bg-cream/50 p-8">
              <h3 className="text-2xl text-muted">Building the old way</h3>
              <ul className="mt-6 space-y-3.5">
                {villa.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-sand">
                      <X className="size-3.5 text-muted" />
                    </span>
                    <span className="text-muted">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 text-center">
            <CTA href={waLink(waMsg.siteVisit)} external variant="primary">
              Start the faster way
            </CTA>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
