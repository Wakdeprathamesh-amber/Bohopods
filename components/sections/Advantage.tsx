import Image from "next/image";
import { Stamp } from "lucide-react";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { CountUp } from "../CountUp";
import { Topo } from "../decor/Topo";

const stats = [
  { to: 45, prefix: "30–", suffix: "", label: "days to install" },
  { to: 30, prefix: "", suffix: "+", label: "year lifespan" },
  { to: 12, prefix: "", suffix: "+", label: "pod models" },
  { to: 2, prefix: "1–", suffix: " yr", label: "typical ROI" },
];

/**
 * The six core USPs, each carried by an illustrated medallion from the
 * Bohopods brochure itself (crane-lift = temporary/relocatable, layers =
 * industrial build, handshake = AMC, plug = plug & play, sun/snow = weather).
 */
const usps = [
  {
    img: "/images/renders/boho-032.jpg",
    alt: "Illustration of a crane lifting a Bohopod into place",
    title: "Temporary structure — no FSI",
    body: "Classified as temporary, so it doesn't count toward your FSI.",
  },
  {
    img: "/images/renders/boho-038.jpg",
    alt: "Illustration of engineered material layers built to last decades",
    title: "Industrial-grade build",
    body: "Engineered materials, made to endure 30+ years.",
  },
  {
    img: "/images/renders/boho-034.jpg",
    alt: "Illustration of an annual maintenance handshake and checklist",
    title: "AMC after-care",
    body: "Annual maintenance & after-sales care, always on.",
  },
  {
    img: "/images/renders/boho-029.jpg",
    alt: "Illustration of a power plug — arrives ready to live in",
    title: "Plug & play install",
    body: "Arrives ready — a quick, clean on-site install.",
  },
  {
    img: "/images/renders/boho-036.jpg",
    alt: "Illustration of one pod in sunshine and snow",
    title: "Weather-tolerant",
    body: "Built for Indian extremes, coast to ghats.",
  },
  {
    img: null,
    alt: "",
    title: "No municipal permissions",
    body: "Skip the red tape — CRZ-1 friendly, nominal approvals.",
  },
];

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
            <h2 className="mt-4 text-3xl font-light md:text-4xl">
              The hard parts? Already handled.
            </h2>
          </Reveal>
        </div>

        {/* Count-up stats */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <CountUp
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-display text-4xl font-light text-forest md:text-5xl"
                />
                <div className="mt-1 text-xs uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Illustrated USP medallions */}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-6">
          {usps.map((u, i) => (
            <Reveal key={u.title} delay={(i % 6) * 0.05} className="h-full">
              <div className="group flex h-full flex-col items-center text-center">
                <div className="relative size-24 overflow-hidden rounded-full border border-sand bg-forest-deep shadow-md shadow-forest/10 transition-transform duration-500 group-hover:scale-105 md:size-28">
                  {u.img ? (
                    <Image
                      src={u.img}
                      alt={u.alt}
                      fill
                      sizes="112px"
                      className="scale-110 object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-[#efe6d3]">
                      <Stamp className="size-10 text-forest/80" strokeWidth={1.4} />
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-display text-sm font-medium leading-snug text-forest">
                  {u.title}
                </h3>
                <p className="mt-1.5 max-w-[24ch] text-xs leading-relaxed text-muted">
                  {u.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
