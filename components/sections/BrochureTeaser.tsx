import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { cldUrl } from "@/lib/cloudinary";

/** Homepage teaser: a 3D book that peeks open — full flip-book lives at /brochure. */
export function BrochureTeaser() {
  return (
    <Section className="overflow-hidden bg-forest text-paper">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading className="text-paper">The Brochure</SectionHeading>
          <SectionLead className="text-sage">
            Our story, in your hands.
          </SectionLead>
          <p className="mt-5 max-w-md leading-relaxed text-paper/70">
            The whole world of Boho Pods — every pod, the process, ownership and
            the philosophy — laid out in nineteen beautiful pages. Go on, turn
            one.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <CTA href="/brochure" variant="light">
              Flip through it <ArrowUpRight className="size-4" />
            </CTA>
            <a
              href="/brochure/bohopods-brochure.pdf"
              download="Bohopods-Brochure.pdf"
              className="inline-block py-2 font-display text-sm text-paper/60 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
            >
              or download the PDF (4 MB)
            </a>
          </div>
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
                src={cldUrl("/brochure/page-02.jpg", { w: 900 })}
                alt=""
                width={1075}
                height={758}
                loading="lazy"
                className="book-under"
                draggable={false}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cldUrl("/brochure/page-01.jpg", { w: 900 })}
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
