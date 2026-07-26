import Image from "next/image";
import { ArrowUpRight, MessageCircle, Stamp } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";
import { Topo } from "../decor/Topo";
import { waLink, waMsg } from "@/lib/site";

const stats = [
  { to: 45, prefix: "30–", suffix: "", label: "days to install" },
  { to: 30, prefix: "", suffix: "+", label: "year lifespan" },
  { to: 12, prefix: "", suffix: "+", label: "pod models" },
  { to: 2, prefix: "1–", suffix: " yr", label: "typical ROI" },
];

/** Brochure medallions carry the USPs (crane = temporary, layers = build, …). */
const medallions = [
  {
    img: "/images/renders/boho-038.jpg",
    alt: "Illustration of engineered material layers",
    title: "Industrial-grade build",
    body: "Engineered materials, made to endure 30+ years.",
  },
  {
    img: "/images/renders/boho-034.jpg",
    alt: "Illustration of the annual maintenance handshake",
    title: "AMC after-care",
    body: "Annual maintenance & after-sales care, always on.",
  },
  {
    img: "/images/renders/boho-029.jpg",
    alt: "Illustration of a power plug",
    title: "Plug & play install",
    body: "Arrives ready — a quick, clean on-site install.",
  },
  {
    img: "/images/renders/boho-036.jpg",
    alt: "Illustration of one pod in sunshine and snow",
    title: "Weather-tolerant",
    body: "Built for Indian extremes, coast to ghats.",
  },
];

/* Glass tiles: translucent over the topo lines, lifting toward you on hover */
const tile =
  "bento rounded-2xl border border-white/50 bg-paper/55 p-5 backdrop-blur-md " +
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_1px_2px_rgba(42,42,34,0.04)] " +
  "transition-all duration-500 will-change-transform " +
  "hover:-translate-y-1 hover:scale-[1.03] hover:border-white/70 hover:bg-paper/75 " +
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_40px_-12px_rgba(54,68,31,0.25)]";

export function Advantage() {
  return (
    <Section className="relative overflow-hidden border-b border-sand bg-cream/70 py-16 md:py-20">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-olive/10" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>The Bohopods Advantage</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light">
              The hard parts? Already handled.
            </h2>
          </Reveal>
        </div>

        {/* Bento — hover one tile and the rest soften */}
        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-4 [&:has(.bento:hover)_.bento:not(:hover)]:opacity-60 [&:has(.bento:hover)_.bento:not(:hover)]:scale-[0.985]">
            {/* Headline USP — the one nobody else can say */}
            <article className={`${tile} group relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden`}>
              <Topo className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-olive/10" />
              <div className="relative size-24 overflow-hidden rounded-full border border-sand bg-forest-deep shadow-md shadow-forest/10 transition-transform duration-500 group-hover:scale-105 md:size-32">
                <Image
                  src="/images/renders/boho-032.jpg"
                  alt="Illustration of a crane lifting a Bohopod into place"
                  fill
                  sizes="128px"
                  className="scale-110 object-cover"
                />
              </div>
              <div className="relative mt-6">
                <h3 className="font-display text-2xl text-forest md:text-3xl">
                  Temporary structure — no FSI
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">
                  A Bohopod is classified as a temporary structure, so it
                  doesn&rsquo;t count toward your FSI — and it can even be
                  lifted and relocated if your plans change.
                </p>
              </div>
            </article>

            {/* Count-up stats */}
            {stats.map((s) => (
              <article key={s.label} className={`${tile} flex flex-col justify-center text-center`}>
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-3xl font-light text-forest md:text-4xl"
                />
                <div className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </article>
            ))}

            {/* Medallion USPs */}
            {medallions.map((m) => (
              <article key={m.title} className={`${tile} group`}>
                <div className="relative size-14 overflow-hidden rounded-full border border-sand bg-forest-deep transition-transform duration-500 group-hover:scale-105">
                  <Image src={m.img} alt={m.alt} fill sizes="56px" className="scale-110 object-cover" />
                </div>
                <h3 className="mt-3 font-display text-sm font-medium leading-snug text-forest">
                  {m.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{m.body}</p>
              </article>
            ))}

            {/* Permissions */}
            <article className={`${tile} col-span-2 flex items-center gap-4`}>
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-sand bg-[#efe6d3]">
                <Stamp className="size-6 text-forest/80" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-sm font-medium text-forest">
                  No municipal permissions
                </h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  Skip the red tape — CRZ-1 friendly, nominal approvals only.
                </p>
              </div>
            </article>

            {/* CTA tile */}
            <a
              href={waLink(waMsg.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="bento col-span-2 flex items-center justify-between gap-4 rounded-2xl bg-forest/95 p-5 text-paper backdrop-blur-md transition-all duration-500 will-change-transform hover:-translate-y-1 hover:scale-[1.03] hover:bg-forest-deep hover:shadow-[0_18px_40px_-12px_rgba(33,44,19,0.45)]"
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="size-5 text-sage" />
                <div>
                  <div className="font-display text-sm font-medium">
                    Questions about any of this?
                  </div>
                  <div className="text-xs text-paper/70">
                    Ask us on WhatsApp — friendly, no pressure.
                  </div>
                </div>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-sage" />
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
