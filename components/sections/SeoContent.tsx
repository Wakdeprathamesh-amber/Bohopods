import Image from "next/image";
import { Container, Section, SectionHeading, SectionLead } from "../primitives";
import { Reveal } from "../Reveal";
import { locations } from "@/lib/site";

/**
 * Crawlable SEO content — real, readable copy for search engines and humans
 * (not hidden). Summarises what Bohopods are, where they install, and how ownership works.
 */
export function SeoContent() {
  return (
    <Section className="border-t border-sand bg-cream/40 py-16 md:py-20" aria-labelledby="about-bohopods">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <SectionHeading id="about-bohopods">
                About Boho Pods
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionLead>
                Prefab luxury cabins &amp; glamping pods across India
              </SectionLead>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-lg">
                <p>
                  Boho Pods designs and manufactures plug-and-play prefab cabins
                  in Mumbai — Scandinavian-inspired retreats, work pods and
                  modular homes engineered for Indian weather. Every unit is
                  factory-built, then installed on your plot in typically 30–45
                  days, without counting toward FSI as a temporary structure.
                </p>
                <p>
                  Whether you want a weekend escape in the Western Ghats, a
                  high-ADR Airbnb unit in Alibaug or Goa, or a full 2/3-BHK
                  modular home, the range spans from compact work pods (from
                  ₹5L) to the Gatsby flagship and family-scale homes. Ownership
                  options include outright purchase, EMI, lease and revenue
                  share.
                </p>
                <p>
                  Popular install regions include{" "}
                  {locations.slice(0, 8).join(", ")}, and more — each site
                  surveyed before placement so access, levels and views are
                  right the first time.
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-sand sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/gatsby/ext-04.jpg"
                alt="Boho Pods prefab cabin installed on a hillside plot in India"
                fill
                quality={85}
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
