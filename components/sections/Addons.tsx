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
import { Container, Section, Eyebrow, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { Topo } from "../decor/Topo";
import { waLink } from "@/lib/site";

type Addon = { icon: LucideIcon; label: string; img?: string; alt?: string };

const ADDONS: Addon[] = [
  { icon: Waves, label: "Plunge pool", img: "/images/gatsby/int-02.jpg", alt: "Pod living room opening onto a deck with a plunge pool" },
  { icon: Flame, label: "Fire pit", img: "/images/renders/boho-145.jpg", alt: "Sunken fire pit on a seaside pod deck" },
  { icon: Armchair, label: "Deck furniture", img: "/images/gatsby/ext-03.jpg", alt: "Outdoor sofas on a covered pod deck at golden hour" },
  { icon: Umbrella, label: "Pergola & shade", img: "/images/renders/boho-031.jpg", alt: "Pod with an attached open-air pavilion" },
  { icon: TreePine, label: "Landscaping", img: "/images/renders/boho-131.jpg", alt: "Pod set in landscaped gardens with a still pond" },
  { icon: Bath, label: "Jacuzzi" },
  { icon: Sun, label: "Solar setup" },
  { icon: UtensilsCrossed, label: "Outdoor kitchen" },
];

export function Addons() {
  const [active, setActive] = useState(0);
  const current = ADDONS[active];

  return (
    <Section className="border-y border-sand/60 bg-cream/50 py-20 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <Eyebrow>Add-ons</Eyebrow>
          <h2 className="mt-4 text-display font-light">Make it yours.</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">
            Every Bohopod is a canvas — dress yours up for the way you&rsquo;ll
            live in it.
          </p>
          <p className="mt-6 max-w-md border-l-2 border-olive pl-5 font-serif-i text-lg leading-snug text-forest md:text-2xl">
            You don&rsquo;t have to buy everything at once — start with one pod,
            and let it grow.
          </p>
          <CTA
            href={waLink(
              "Hi Boho Pods! I'd like to know more about pod add-ons (plunge pool, jacuzzi, solar…).",
            )}
            external
            variant="outlineDark"
            className="mt-8"
          >
            <MessageCircle className="size-4" /> Ask about add-ons
          </CTA>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Preview — hover / tap a chip and see the add-on */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-sand bg-forest sm:aspect-[16/10]">
            {ADDONS.map(
              (a, i) =>
                a.img && (
                  <Image
                    key={a.label}
                    src={a.img}
                    alt={a.alt ?? a.label}
                    fill
                    sizes="(max-width:1024px) 100vw, 55vw"
                    className="object-cover transition-opacity duration-700"
                    style={{ opacity: i === active ? 1 : 0 }}
                  />
                ),
            )}
            {!current.img && (
              <div className="absolute inset-0">
                <Topo className="absolute inset-0 h-full w-full text-sage/15" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper">
                  <current.icon className="size-12 text-sage" />
                  <p className="font-display text-2xl font-light">{current.label}</p>
                  <p className="text-sm text-paper/60">Visuals on request — ask us on WhatsApp</p>
                </div>
              </div>
            )}
            <span className="absolute bottom-4 left-4 rounded-full bg-forest-deep/70 px-4 py-1.5 font-display text-sm text-paper backdrop-blur-sm">
              {current.label}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {ADDONS.map((a, i) => (
              <button
                key={a.label}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={
                  i === active
                    ? "inline-flex items-center gap-2 rounded-full border border-forest bg-forest px-4 py-2 text-sm text-paper transition-colors"
                    : "inline-flex items-center gap-2 rounded-full border border-sand bg-paper px-4 py-2 text-sm text-ink transition-colors hover:border-olive"
                }
              >
                <a.icon className={i === active ? "size-4 text-sage" : "size-4 text-bronze"} />
                {a.label}
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
