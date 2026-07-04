import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow, CTA } from "../primitives";
import { Reveal } from "../Reveal";

/** Homepage teaser: a 3D book that peeks open — full flip-book lives at /brochure. */
export function BrochureTeaser() {
  return (
    <Section className="overflow-hidden bg-forest text-paper">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow className="text-sage">The Brochure</Eyebrow>
          <h2 className="mt-4 text-display font-light text-paper">
            Our story, in your hands.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-paper/70">
            The whole world of Boho Pods — every pod, the process, ownership and
            the philosophy — laid out in nineteen beautiful pages. Go on, turn
            one.
          </p>
          <CTA href="/brochure" variant="light" className="mt-8">
            Flip through it <ArrowUpRight className="size-4" />
          </CTA>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/brochure"
            aria-label="Open the Boho Pods brochure flip-book"
            className="book-scene group mx-auto block w-full max-w-xl"
          >
            <div className="book">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brochure/page-02.jpg"
                alt=""
                width={1075}
                height={758}
                loading="lazy"
                className="book-under"
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brochure/page-01.jpg"
                alt="Boho Pods brochure cover"
                width={1075}
                height={758}
                loading="lazy"
                className="book-cover"
                draggable={false}
              />
            </div>
            <p className="mt-6 text-center text-sm text-paper/60 transition-colors group-hover:text-paper/90">
              Hover to peek · click to read
            </p>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
