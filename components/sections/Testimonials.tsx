import Image from "next/image";
import { Star } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead } from "../primitives";
import { Reveal } from "../Reveal";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

function ReviewCard({
  t,
  hidden,
}: {
  t: (typeof testimonials)[number];
  hidden?: boolean;
}) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="w-[320px] shrink-0 rounded-2xl border border-sand bg-paper p-6"
    >
      <div className="flex items-center gap-3">
        <Image
          src={t.image}
          alt={hidden ? "" : t.name}
          width={44}
          height={44}
          className="size-11 shrink-0 rounded-full object-cover"
        />
        <div>
          <figcaption className="font-display text-forest">{t.name}</figcaption>
          <div className="mt-0.5 flex gap-0.5 text-bronze">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star key={k} className="size-3 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-muted">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: (typeof testimonials)[number][];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={cn("marquee-track flex w-max gap-4 py-2", reverse && "[animation-direction:reverse]")}
        style={{ "--marquee-dur": duration } as React.CSSProperties}
      >
        {[...items, ...items].map((t, i) => (
          <ReviewCard key={`${t.name}-${i}`} t={t} hidden={i >= items.length} />
        ))}
      </div>
    </div>
  );
}

/** Owner reviews — gently drifting rows; hover to pause and read. */
export function Testimonials() {
  const rowA = testimonials.slice(0, 3);
  const rowB = testimonials.slice(3);

  return (
    <Section className="overflow-hidden bg-cream">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionHeading>
              Loved by owners
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionLead className="mx-auto">
              Quietly, completely at home.
            </SectionLead>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
              <span className="flex gap-0.5 text-bronze">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="size-3.5 fill-current" />
                ))}
              </span>
              5.0 from Bohopod owners across India
            </p>
          </Reveal>
        </div>
      </Container>

      {/* Full-bleed drifting rows */}
      <Reveal delay={0.12}>
        <div className="mt-12 space-y-4">
          <MarqueeRow items={rowA} duration="52s" />
          <MarqueeRow items={rowB} reverse duration="64s" />
        </div>
      </Reveal>
    </Section>
  );
}
