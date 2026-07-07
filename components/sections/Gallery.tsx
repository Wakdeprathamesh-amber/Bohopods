"use client";

import { useState } from "react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { PodGallery } from "../PodGallery";
import { retreatPods } from "@/lib/pods";

/** Pods with a real photo set get a tab; single-render pods join once shot. */
const tabs = retreatPods.filter((p) => p.gallery.length > 1);

export function Gallery() {
  const [active, setActive] = useState(tabs[0].slug);
  const pod = tabs.find((p) => p.slug === active) ?? tabs[0];

  return (
    <Section className="bg-paper">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>The Gallery</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-display font-light">
                Inside, outside — and the line between.
              </h2>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Browse gallery by pod"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {tabs.map((p) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={p.slug === active}
                onClick={() => setActive(p.slug)}
                className={
                  p.slug === active
                    ? "rounded-full border border-forest bg-forest px-5 py-2 font-display text-sm text-paper transition-colors"
                    : "rounded-full border border-sand bg-paper px-5 py-2 font-display text-sm text-ink transition-colors hover:border-olive"
                }
              >
                {p.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Remount on tab change so the grid rises in fresh */}
        <div key={pod.slug} className="animate-rise">
          <PodGallery podName={pod.name} images={pod.gallery} />
        </div>
      </Container>
    </Section>
  );
}
