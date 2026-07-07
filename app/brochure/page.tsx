import type { Metadata } from "next";
import { Download, MessageCircle } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Eyebrow, CTA } from "@/components/primitives";
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
      {/* pt-24 clears the fixed nav; the rest is a tight header → book → CTA rhythm */}
      <main className="pt-24">
        <Container className="max-w-5xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl pt-8 text-center md:pt-12">
            <Eyebrow>The Brochure</Eyebrow>
            <h1 className="mt-3 text-4xl font-light text-balance md:text-5xl">
              Flip through Boho Pods.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Our story, the full pod range, specs and ownership options — page
              by page, the way it was designed to be read.
            </p>
            <CTA
              href="/brochure/bohopods-brochure.pdf"
              download="Bohopods-Brochure.pdf"
              variant="outlineDark"
              className="mt-6"
            >
              <Download className="size-4" /> Download the brochure
              <span className="text-muted">PDF · 4 MB</span>
            </CTA>
          </div>

          {/* Flip-book */}
          <div className="mt-10">
            <FlipBook pages={PAGES} />
          </div>

          {/* Closing CTA */}
          <div className="mx-auto mt-12 max-w-xl border-t border-sand pt-10 pb-24 text-center">
            <p className="font-serif-i text-2xl text-forest">
              Saw something you loved?
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <CTA href={waLink(waMsg.general)} external variant="primary">
                <MessageCircle className="size-4" /> Ask us about it
              </CTA>
              <CTA
                href="/brochure/bohopods-brochure.pdf"
                download="Bohopods-Brochure.pdf"
                variant="outlineDark"
              >
                <Download className="size-4" /> Take the PDF with you
              </CTA>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
