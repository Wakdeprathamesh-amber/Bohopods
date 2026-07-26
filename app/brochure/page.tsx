import type { Metadata } from "next";
import { Download, MessageCircle } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Eyebrow, CTA } from "@/components/primitives";
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
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6">
          {/* Compact header — the viewer is the star */}
          <div className="mx-auto max-w-2xl pt-6 text-center md:pt-8">
            <Eyebrow>The Brochure</Eyebrow>
            <h1 className="mt-3 text-3xl font-light text-balance md:text-4xl">
              Flip through Boho Pods.
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
              Drag a page corner, use the arrows, zoom in — or take the PDF with
              you from the toolbar below.
            </p>
          </div>

          {/* Immersive viewer */}
          <div className="mt-6">
            <FlipBook pages={PAGES} pdfHref="/brochure/bohopods-brochure.pdf" />
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
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
