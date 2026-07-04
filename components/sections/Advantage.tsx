import { Container, Section } from "../primitives";
import { Reveal } from "../Reveal";
import { icons } from "../icons";
import { CountUp } from "../CountUp";

const stats = [
  { to: 45, prefix: "30–", suffix: "", label: "days to install" },
  { to: 30, prefix: "", suffix: "+", label: "year lifespan" },
  { to: 12, prefix: "", suffix: "+", label: "pod models" },
  { to: 2, prefix: "1–", suffix: " yr", label: "typical ROI" },
];

const strip = [
  { icon: "FileCheck", label: "Temporary structure — no FSI" },
  { icon: "ShieldCheck", label: "Industrial-grade build" },
  { icon: "Wrench", label: "AMC after-care" },
  { icon: "Plug", label: "Plug & play install" },
  { icon: "CloudSun", label: "Weather-tolerant" },
  { icon: "Stamp", label: "No municipal permissions" },
];

export function Advantage() {
  return (
    <Section className="bg-paper py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-8 rounded-3xl border border-sand bg-cream/60 px-8 py-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-4xl font-light text-forest md:text-5xl"
                />
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {strip.map((a) => {
              const Icon = icons[a.icon];
              return (
                <span
                  key={a.label}
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-paper px-4 py-2 text-sm text-ink"
                >
                  {Icon ? <Icon className="size-4 text-olive" /> : null}
                  {a.label}
                </span>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
