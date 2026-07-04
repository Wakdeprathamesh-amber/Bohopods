import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Section, Eyebrow, CTA } from "@/components/primitives";
import { FlipBook } from "@/components/FlipBook";
import { waLink, waMsg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brochure",
  description:
    "Flip through the Boho Pods brochure — our story, the full pod range, specs and ownership options, page by page.",
  alternates: { canonical: "/brochure" },
};

const PAGES = Array.from(
  { length: 19 },
  (_, i) => `/brochure/page-${String(i + 1).padStart(2, "0")}.jpg`,
);

export default function BrochurePage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <Section className="pb-8">
          <Container className="mx-auto max-w-3xl text-center">
            <Eyebrow>The Brochure</Eyebrow>
            <h1 className="mt-4 text-display font-light text-balance">
              Flip through Boho Pods.
            </h1>
            <p className="mt-5 text-muted">
              Our story, the full pod range, specs and ownership options — page
              by page, the way it was designed to be read.
            </p>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container>
            <FlipBook pages={PAGES} />
          </Container>
        </Section>

        <Section className="pt-0 text-center">
          <Container className="mx-auto max-w-xl">
            <p className="font-serif-i text-2xl text-forest">
              Saw something you loved?
            </p>
            <CTA
              href={waLink(waMsg.general)}
              external
              variant="primary"
              className="mt-5"
            >
              <MessageCircle className="size-4" /> Ask us about it
            </CTA>
          </Container>
        </Section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
