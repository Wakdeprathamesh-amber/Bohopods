import Image from "next/image";
import { Star } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { testimonials } from "@/lib/site";

/** Owner reviews — avatar, five stars, quote. */
export function Testimonials() {
  return (
    <Section className="bg-cream">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Loved by owners</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light">
              Quietly, completely at home.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-sand bg-paper p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <figcaption className="font-display text-forest">
                      {t.name}
                    </figcaption>
                    <div className="mt-0.5 flex gap-0.5 text-bronze">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="size-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-4 leading-relaxed text-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
