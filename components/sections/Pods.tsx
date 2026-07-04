import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { PodCard } from "../PodCard";
import { retreatPods } from "@/lib/pods";

export function Pods() {
  return (
    <Section id="pods">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {retreatPods.map((pod, i) => (
            <Reveal key={pod.slug} delay={(i % 4) * 0.06} className="h-full">
              <PodCard pod={pod} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
