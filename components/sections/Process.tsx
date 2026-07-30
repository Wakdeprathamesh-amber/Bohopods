import { CalendarClock, MapPin, Wrench, Factory, Check } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead } from "../primitives";
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
    <Section
      id="process"
      className="bg-forest py-16 text-paper md:py-40"
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <SectionHeading className="justify-center text-paper">
              How it works
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionLead className="mx-auto text-sage">
              From Idea to Escape
            </SectionLead>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-paper/75 md:text-xl">
              Most of the magic happens in our factory. On your land, it&rsquo;s
              plug-and-play — typically 30–45 days from booking to handover.
              Three clear steps. One lasting escape.
            </p>
          </Reveal>
        </div>

        {/* Always a single horizontal line of 3 steps */}
        <div className="mt-12 grid grid-cols-3 gap-2.5 sm:mt-20 sm:gap-8 lg:gap-14">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.08}>
              <div className="relative border-t border-paper/20 pt-5 sm:pt-8">
                <span className="font-display font-light leading-none text-sage/45 text-[clamp(2.5rem,1.5rem+5vw,6rem)]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-display text-paper text-[clamp(1rem,0.75rem+1.4vw,2.25rem)] sm:mt-4">
                  {s.title}
                </h3>
                <p className="mt-2 hidden leading-relaxed text-paper/70 sm:block sm:text-base lg:text-lg">
                  {s.body}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-paper/70 sm:hidden">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 5-week timeline — infographic */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-[1.75rem] border border-paper/15 bg-forest-deep/30 p-6 sm:mt-20 md:p-12">
            <p className="kicker text-center text-sage sm:text-left">
              The 5-week timeline
            </p>
            <ol className="relative mt-8 flex flex-col gap-7 lg:mt-10 lg:grid lg:grid-cols-5 lg:gap-9">
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
                    <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-sage/40 bg-forest text-sage sm:size-14">
                      <Icon className="size-5 sm:size-6" />
                    </span>
                    <div className="lg:mt-5">
                      <div className="font-display text-sm text-sage sm:text-base">
                        Week {i + 1}
                      </div>
                      <div className="mt-0.5 text-paper/90 sm:text-lg lg:mt-1">
                        {t.label}
                      </div>
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
