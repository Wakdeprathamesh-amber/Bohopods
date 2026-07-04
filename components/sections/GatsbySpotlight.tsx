import Image from "next/image";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { waLink, waMsg } from "@/lib/site";

const features = [
  "Nature-filled central courtyard",
  "Skylit roofline that follows the sun",
  "Spacious living area + private bedroom",
  "A massive front deck for the view",
];

export function GatsbySpotlight() {
  return (
    <Section id="gatsby" className="bg-cream">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <Eyebrow className="text-bronze">The Flagship</Eyebrow>
            <h2 className="mt-4 text-display font-light">The Gatsby</h2>
            <p className="mt-2 font-serif-i text-2xl text-olive-deep">
              The new era of modular living.
            </p>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              Our flagship redefines the architectural sanctuary — a spacious
              living area and private bedroom connected by a nature-filled central
              courtyard, crowned by a skylit roofline and opening onto a massive
              front deck. Ultimate luxury, installed in weeks.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-olive" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <CTA href={waLink(waMsg.gatsby)} external variant="primary">
                Enquire about the Gatsby <ArrowUpRight className="size-4" />
              </CTA>
              <span className="text-sm text-muted">
                from <span className="font-display text-forest">₹35 Lakhs</span>
              </span>
            </div>
            <Link
              href="/pods/gatsby"
              className="group mt-5 inline-flex items-center gap-1.5 font-display text-sm text-forest transition-colors hover:text-olive"
            >
              Full details, specs &amp; gallery
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sand shadow-xl shadow-forest/5">
              <Image
                src="/images/gatsby/int-03.jpg"
                alt="Inside the Gatsby — open living with panoramic mountain views"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
