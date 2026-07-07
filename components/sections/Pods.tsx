import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { PodsCarousel } from "../PodsCarousel";
import { retreatPods, utilityPods } from "@/lib/pods";

export function Pods() {
  // Gatsby, Nomad, Dojopod first; Gazepod + work pods ride behind the arrows.
  const ordered = [...retreatPods.filter((p) => p.slug !== "gazepod"),
    ...retreatPods.filter((p) => p.slug === "gazepod"), ...utilityPods];

  return (
    <Section id="pods" className="md:py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The Pods</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display font-light">
                Discover the art of living, one pod at a time.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/pods"
              className="inline-flex items-center gap-1.5 font-display text-forest transition-colors hover:text-olive"
            >
              View all pods <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-8">
          <PodsCarousel pods={ordered} />
        </Reveal>
      </Container>
    </Section>
  );
}
