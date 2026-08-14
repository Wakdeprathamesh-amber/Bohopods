"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead } from "../primitives";
import { Reveal } from "../Reveal";
import { PodGallery } from "../PodGallery";
import { retreatPods } from "@/lib/pods";

/** Pods with a real photo set get a tab; single-render pods join once shot. */
const tabs = retreatPods.filter((p) => p.gallery.length > 1);

export function Gallery() {
  const [active, setActive] = useState(tabs[0].slug);
  const pod = tabs.find((p) => p.slug === active) ?? tabs[0];

  return (
    <Section id="gallery" className="bg-paper py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <SectionHeading>The Gallery</SectionHeading>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionLead>
                Inside, outside — and the line between.
              </SectionLead>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                High-resolution looks at how Bohopods live on the land — glass,
                timber, decks and the views they frame. Browse by pod, then open
                any frame full-screen.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href={`/pods/${pod.slug}`}
              className="-my-1 inline-flex items-center gap-1.5 py-2 font-display text-sm text-forest transition-colors hover:text-olive"
            >
              View {pod.name} details <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Browse gallery by pod"
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {tabs.map((p) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={p.slug === active}
                onClick={() => setActive(p.slug)}
                className={
                  p.slug === active
                    ? "rounded-full border border-forest bg-forest px-5 py-2.5 font-display text-sm text-paper transition-colors"
                    : "rounded-full border border-sand bg-paper px-5 py-2.5 font-display text-sm text-ink transition-colors hover:border-olive"
                }
              >
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={pod.slug} className="animate-rise">
          <PodGallery
            podName={pod.name}
            images={pod.gallery}
            heroLine={pod.heroLine}
          />
        </div>
      </Container>
    </Section>
  );
}
