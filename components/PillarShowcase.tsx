"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { icons } from "./icons";
import { pillars } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Each pillar gets a scene that matches the claim — text becomes picture. */
const PILLAR_IMAGES = [
  { src: "/images/gatsby/int-14.jpg", alt: "Crafted Bohopod bedroom with mountain-framed window" }, // Thoughtful Design
  { src: "/images/pillars/idea-to-escape.jpg", alt: "Freshly installed Bohopod ready for handover" }, // From Idea to Escape
  { src: "/images/gatsby/ext-exploded.jpg", alt: "Exploded view of a Bohopod's modular build" }, // Modular by Nature
  { src: "/images/pillars/smart-ownership.jpg", alt: "A Bohopod as a private land asset overlooking hills" }, // Smart Ownership
  { src: "/images/pillars/community-pioneers.jpg", alt: "A hillside community of Bohopod pioneers" }, // Community
  { src: "/images/gatsby/int-05.jpg", alt: "Glass walls opening to misty hills — living with the view" }, // In Tune with Nature
];

const DWELL_MS = 5000;

export function PillarShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % pillars.length),
      DWELL_MS,
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Scene panel */}
      <div className="relative order-first aspect-[4/3] overflow-hidden rounded-3xl border border-sand bg-forest-deep lg:order-last lg:aspect-auto lg:min-h-[460px]">
        {PILLAR_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width:1024px) 100vw, 55vw"
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-deep/60 to-transparent" />
        <span className="absolute bottom-4 left-4 rounded-full bg-forest-deep/70 px-4 py-1.5 font-display text-sm text-paper backdrop-blur-sm">
          {pillars[active].title}
        </span>
      </div>

      {/* Pillar list */}
      <div role="tablist" aria-label="Why Bohopods" className="flex flex-col justify-center">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon];
          const isActive = i === active;
          return (
            <button
              key={p.title}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => {
                setPaused(true);
                setActive(i);
              }}
              className={cn(
                "group relative rounded-xl px-4 py-3.5 text-left transition-all duration-300 will-change-transform",
                isActive
                  ? "scale-[1.02] bg-paper/80 shadow-md shadow-forest/5"
                  : "hover:scale-[1.01] hover:bg-paper/40",
              )}
            >
              {/* Progress hairline for the active pillar */}
              <span
                className={cn(
                  "absolute inset-x-4 bottom-0 h-px overflow-hidden rounded-full bg-sand",
                  !isActive && "opacity-0",
                )}
                aria-hidden="true"
              >
                {isActive && !paused && (
                  <span key={active} className="animate-grow-x block h-full w-full bg-olive" />
                )}
              </span>
              <span className="flex items-center gap-3.5">
                <span
                  className={cn(
                    "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                    isActive ? "bg-forest text-paper" : "bg-olive/15 text-forest",
                  )}
                >
                  {Icon ? <Icon className="size-4.5" /> : null}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-display text-lg transition-colors",
                      isActive ? "text-forest" : "text-ink/80",
                    )}
                  >
                    {p.title}
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden text-sm leading-relaxed text-muted">
                      {p.body}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
