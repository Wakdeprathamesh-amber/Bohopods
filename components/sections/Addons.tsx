"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Armchair,
  Bath,
  Flame,
  MessageCircle,
  Sun,
  TreePine,
  Umbrella,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Container, Section, SectionHeading, SectionLead, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Addon = {
  icon: LucideIcon;
  label: string;
  body: string;
  img: string;
  alt: string;
};

const ADDONS: Addon[] = [
  {
    icon: Waves,
    label: "Plunge pool",
    body: "A cool dip with a gorge view.",
    img: "/images/addons/plunge-pool.jpg",
    alt: "Living space opening to a plunge pool above a misty gorge",
  },
  {
    icon: Armchair,
    label: "Deck lounge",
    body: "Sofas, pool table, golden hours.",
    img: "/images/addons/deck-lounge.jpg",
    alt: "Golden-hour deck with pool table and lounge seating",
  },
  {
    icon: Flame,
    label: "Fire pit",
    body: "Evenings that gather everyone.",
    img: "/images/addons/fire-pit.jpg",
    alt: "Sunken stone fire pit with a bright crackling fire at dusk",
  },
  {
    icon: Umbrella,
    label: "Pergola & shade",
    body: "An outdoor room, always cool.",
    img: "/images/renders/boho-031.jpg",
    alt: "Bohopod with an attached shaded pavilion",
  },
  {
    icon: TreePine,
    label: "Landscaping",
    body: "Gardens that hug the pod.",
    img: "/images/renders/boho-131.jpg",
    alt: "Bohopod set in landscaped gardens with a still pond",
  },
  {
    icon: Bath,
    label: "Jacuzzi",
    body: "A private soak in your bathroom.",
    img: "/images/addons/jacuzzi.jpg",
    alt: "Indoor bathroom jacuzzi with wood and stone in a Bohopod",
  },
  {
    icon: Sun,
    label: "Solar setup",
    body: "Quiet, off-grid power.",
    img: "/images/addons/solar.jpg",
    alt: "Bohopod with integrated rooftop solar panels",
  },
  {
    icon: UtensilsCrossed,
    label: "Outdoor kitchen",
    body: "Cook with the view.",
    img: "/images/addons/outdoor-kitchen.jpg",
    alt: "Covered outdoor kitchen on a Bohopod deck overlooking hills",
  },
];

export function Addons() {
  const [active, setActive] = useState(0);

  return (
    <Section className="border-y border-sand/60 bg-cream/50 py-14 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Reveal>
            <SectionHeading>Add-ons</SectionHeading>
            <SectionLead>Make it yours.</SectionLead>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="max-w-md border-l-2 border-olive pl-5 font-serif-i text-lg leading-snug text-forest md:text-xl">
              You don&rsquo;t have to buy everything at once — start with one
              pod, and let it grow.
            </p>
          </Reveal>
        </div>

        {/*
          Desktop: full-width flex accordion.
          All panels share the row; active grows, others shrink in place —
          no horizontal push, so hover can't leap onto the next panel.
        */}
        <Reveal delay={0.1}>
          <div className="mt-10 hidden h-[400px] gap-2 md:flex lg:gap-3">
            {ADDONS.map((a, i) => {
              const isActive = i === active;
              return (
                <button
                  key={a.label}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative min-w-0 overflow-hidden rounded-2xl border border-sand text-left transition-[flex-grow] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                    isActive ? "flex-[3.2]" : "flex-[0.85]",
                  )}
                >
                  <Image
                    src={a.img}
                    alt={a.alt}
                    fill
                    sizes={isActive ? "40vw" : "12vw"}
                    className={cn(
                      "object-cover transition-transform duration-[1200ms]",
                      isActive && "scale-105",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-3 lg:p-5">
                    <span className="flex items-center gap-2 text-paper lg:gap-2.5">
                      <a.icon className="size-4 shrink-0 text-sage lg:size-4.5" />
                      <span
                        className={cn(
                          "font-display transition-opacity",
                          isActive
                            ? "text-base opacity-100 lg:text-lg"
                            : "truncate text-sm opacity-90",
                        )}
                      >
                        {a.label}
                      </span>
                    </span>
                    <p
                      className={cn(
                        "mt-1 max-w-[26ch] text-sm text-paper/75 transition-opacity duration-400",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {a.body}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile: swipe cards */}
          <div className="-mx-6 mt-8 flex snap-x gap-3 overflow-x-auto px-6 pb-2 md:hidden">
            {ADDONS.map((a, i) => (
              <div
                key={a.label}
                className="relative aspect-[3/4] w-[230px] shrink-0 snap-start overflow-hidden rounded-2xl border border-sand"
                onClick={() => setActive(i)}
              >
                <Image
                  src={a.img}
                  alt={a.alt}
                  fill
                  sizes="230px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="flex items-center gap-2 text-paper">
                    <a.icon className="size-4 shrink-0 text-sage" />
                    <span className="font-display">{a.label}</span>
                  </span>
                  <p className="mt-0.5 text-xs text-paper/75">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Names — hover also expands the matching panel */}
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            {ADDONS.map((a, i) => {
              const isActive = i === active;
              return (
                <button
                  key={a.label}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                    isActive
                      ? "border-forest bg-forest text-paper shadow-sm"
                      : "border-sand bg-paper text-ink hover:border-olive/40 hover:bg-paper/80",
                  )}
                >
                  <a.icon
                    className={cn(
                      "size-4",
                      isActive ? "text-sage" : "text-bronze",
                    )}
                  />
                  {a.label}
                </button>
              );
            })}
            <CTA
              href={waLink(
                "Hi Boho Pods! I'd like to know more about pod add-ons (plunge pool, jacuzzi, solar…).",
              )}
              external
              variant="outlineDark"
              className="ml-1"
            >
              <MessageCircle className="size-4" /> Ask about add-ons
            </CTA>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
