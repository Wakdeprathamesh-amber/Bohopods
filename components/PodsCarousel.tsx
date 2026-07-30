"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PodCard } from "./PodCard";
import type { Pod } from "@/lib/pods";
import { homesTeaser } from "@/lib/pods";

/** The 3-BHK home — teaser card linking into the pods catalogue homes band. */
function HomesCard() {
  return (
    <a
      href="/pods#homes"
      className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-sand transition-shadow duration-300 hover:shadow-xl hover:shadow-forest/10"
    >
      <Image
        src={homesTeaser.image}
        alt={`${homesTeaser.name} modular family home by Boho Pods`}
        fill
        sizes="(max-width:640px) 85vw, (max-width:1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/15 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-forest/85 px-3 py-1 font-display text-xs uppercase tracking-wider text-paper">
        Homes
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1 font-display text-xs text-forest">
        from {homesTeaser.priceFrom}
      </span>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div className="min-w-0">
          <h3 className="text-2xl text-paper">{homesTeaser.name}</h3>
          <p className="truncate text-sm text-paper/80">{homesTeaser.tagline}</p>
          <p className="mt-0.5 text-xs text-paper/60">{homesTeaser.altLine}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-paper/30 bg-paper/10 px-4 py-2 font-display text-sm text-paper backdrop-blur-sm transition-colors duration-300 group-hover:bg-paper group-hover:text-forest">
          View <ArrowUpRight className="size-4" />
        </span>
      </div>
    </a>
  );
}

/**
 * Homepage pods carousel — first view: Gatsby · Nomad · Dojopod · 3-BHK;
 * arrows reveal the rest of the range.
 */
export function PodsCarousel({ pods }: { pods: Pod[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Gatsby, Nomad, Dojopod, then the 3-BHK home; the rest behind the arrows.
  const first = pods.slice(0, 3);
  const rest = pods.slice(3);

  const arrowClass =
    "inline-flex size-11 items-center justify-center rounded-full border border-sand bg-paper text-forest transition-all hover:bg-cream disabled:opacity-30 disabled:hover:bg-paper";

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-5 flex touch-pan-y">
          {first.map((pod) => (
            <div key={pod.slug} className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_25%]">
              <PodCard pod={pod} />
            </div>
          ))}
          <div className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_25%]">
            <HomesCard />
          </div>
          {rest.map((pod) => (
            <div key={pod.slug} className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_25%]">
              <PodCard pod={pod} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-muted">
          {3 + rest.length + 1} of 12+ models — swipe or use the arrows
        </p>
        <div className="flex gap-2.5">
          <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} aria-label="Previous pods" className={arrowClass}>
            <ChevronLeft className="size-5" />
          </button>
          <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext} aria-label="More pods" className={arrowClass}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
