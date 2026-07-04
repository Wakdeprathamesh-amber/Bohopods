import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Section, Eyebrow, CTA } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { PodCard } from "@/components/PodCard";
import { retreatPods, utilityPods } from "@/lib/pods";
import { waLink, waMsg } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Pods — Explore the Range",
  description:
    "Explore the full Boho Pods range — from a compact work-from-anywhere retreat to the Gatsby flagship, plus work & utility pods. Prefab, installed in 30–45 days.",
  alternates: { canonical: "/pods" },
};

export default function PodsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        <Section className="pb-4">
          <Container className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>The Range</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 text-display font-light text-balance">
                Find the pod that fits your land — and your life.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-muted">
                From a compact work-from-anywhere retreat to the fully-loaded
                Gatsby flagship, every pod is plug-and-play and built to last 30+
                years.
              </p>
            </Reveal>
          </Container>
        </Section>

        <Section id="retreat" className="pt-6">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive">Retreat &amp; Stay Pods</Eyebrow>
              <h2 className="mt-3 text-3xl font-light">Escapes that earn their keep.</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {retreatPods.map((p) => (
                <Reveal key={p.slug} className="h-full">
                  <PodCard pod={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="utility" className="bg-cream">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive">Work &amp; Utility Pods</Eyebrow>
              <h2 className="mt-3 text-3xl font-light">Function, beautifully built.</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {utilityPods.map((p) => (
                <Reveal key={p.slug} className="h-full">
                  <PodCard pod={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section className="text-center">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-display font-light">Not sure which pod?</h2>
              <p className="mt-4 text-muted">
                Tell us about your land and how you&rsquo;ll use it — we&rsquo;ll
                recommend the right fit.
              </p>
              <CTA
                href={waLink(waMsg.general)}
                external
                variant="primary"
                className="mt-7"
              >
                Ask on WhatsApp
              </CTA>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
