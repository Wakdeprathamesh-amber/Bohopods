import { Star } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Editorial pull-quotes — three strong voices, typographically celebrated. */
export function Testimonials() {
  const picks = [testimonials[0], testimonials[1], testimonials[5]];

  return (
    <Section className="bg-cream">
      <Container className="max-w-4xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow>Loved by owners</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light">
              Quietly, completely at home.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16">
          {picks.map((t, i) => (
            <Reveal key={t.name} delay={0.05}>
              <figure
                className={cn(
                  "max-w-2xl",
                  i % 2 === 1 ? "ml-auto text-right" : "text-left",
                )}
              >
                <div
                  className={cn(
                    "flex gap-1 text-bronze",
                    i % 2 === 1 && "justify-end",
                  )}
                >
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 font-serif-i text-2xl leading-snug text-forest sm:text-3xl md:text-[2.4rem] md:leading-[1.25]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="kicker mt-5 text-muted">
                  — {t.name}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
