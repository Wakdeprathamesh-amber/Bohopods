import { CalendarClock, MapPin, Wrench, Factory, Check } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { steps } from "@/lib/site";

const timeline = [
  { icon: CalendarClock, label: "Meeting & booking" },
  { icon: MapPin, label: "Site survey" },
  { icon: Wrench, label: "Site preparation" },
  { icon: Factory, label: "Prefab build" },
  { icon: Check, label: "Handover & stay" },
];

export function Process() {
  return (
    <Section id="process" className="bg-forest text-paper">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className="text-sage">How it works</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light text-paper">
              Three steps from idea to escape.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-paper/70">
              Most of the magic happens in our factory. On your land, it&rsquo;s
              plug-and-play — typically 30–45 days from booking to handover.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="relative border-t border-paper/15 pt-6">
                <span className="font-display text-6xl font-light text-sage/40">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-2xl text-paper">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-paper/70">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 5-week timeline — infographic */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl border border-paper/15 p-6 md:p-10">
            <p className="kicker text-sage">The 5-week timeline</p>
            {/* Mobile: vertical timeline rows · Desktop: 5 nodes on a line */}
            <ol className="relative mt-8 flex flex-col gap-7 lg:mt-9 lg:grid lg:grid-cols-5 lg:gap-9">
              <span
                className="pointer-events-none absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-paper/15 lg:hidden"
                aria-hidden="true"
              />
              <span
                className="pointer-events-none absolute inset-x-6 top-6 hidden h-px bg-paper/15 lg:block"
                aria-hidden="true"
              />
              {timeline.map((t, i) => {
                const Icon = t.icon;
                return (
                  <li
                    key={t.label}
                    className="relative flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0"
                  >
                    <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-sage/40 bg-forest text-sage">
                      <Icon className="size-5" />
                    </span>
                    <div className="lg:mt-4">
                      <div className="font-display text-sm text-sage">
                        Week {i + 1}
                      </div>
                      <div className="mt-0.5 text-paper/90 lg:mt-1">{t.label}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
