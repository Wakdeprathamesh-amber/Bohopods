import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarClock,
  Factory,
  Home,
  Leaf,
  MessageCircle,
  Mountain,
  Plug,
  ShieldCheck,
  TentTree,
  Trees,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Section, Eyebrow, SectionHeading, CTA } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { PodCatalogueCard } from "@/components/PodCatalogueCard";
import { Topo } from "@/components/decor/Topo";
import {
  retreatPods,
  utilityPods,
  getPod,
  homesTeaser,
  pods,
  AREA_FIELDS,
  sqft,
  type Pod,
} from "@/lib/pods";
import { waLink, waMsg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prefab Pods & Modular Homes Catalogue | Compare the Full Range",
  description:
    "Explore Boho Pods' full catalogue — Gatsby flagship, Nomad, Dojopod, Gazepod, work pods and 2/3-BHK modular homes. Compare specs, pricing from ₹5L, and find your fit. Installed in 30–45 days across India.",
  alternates: { canonical: "/pods" },
  openGraph: {
    title: "The Pods — Full Prefab Range | Boho Pods",
    description:
      "Compare retreat pods, utility cabins and modular homes. Factory-built in Mumbai, installed on your land in 30–45 days.",
    images: [{ url: "/images/gatsby/ext-05.jpg", width: 1200, height: 630 }],
  },
};

const fits = [
  {
    icon: Mountain,
    title: "A weekend escape",
    body: "Your own view, ready this season.",
    image: "/images/gatsby/ext-07.jpg",
    pods: ["gatsby", "gazepod"],
  },
  {
    icon: TentTree,
    title: "A rental that earns",
    body: "Micro-resort units guests love.",
    image: "/images/renders/boho-149.jpg",
    pods: ["nomad", "dojopod"],
  },
  {
    icon: Briefcase,
    title: "Work & commercial",
    body: "Quiet rooms and utility cabins.",
    image: "/images/renders/boho-133.jpg",
    pods: ["cocoon", "watchpod"],
  },
  {
    icon: Home,
    title: "A full-time home",
    body: "Family-scale modular houses.",
    image: homesTeaser.image,
    pods: [] as string[],
  },
] as const;

const promise = [
  {
    icon: Factory,
    title: "Factory precision",
    body: "Built indoors to millimetre tolerances.",
  },
  {
    icon: Plug,
    title: "Plug & play",
    body: "Clean install on your prepared plot.",
  },
  {
    icon: CalendarClock,
    title: "30–45 days",
    body: "From booking to keys in hand.",
  },
  {
    icon: ShieldCheck,
    title: "30+ year life",
    body: "Industrial-grade for Indian weather.",
  },
];

const compareSlugs = ["gatsby", "nomad", "dojopod", "gazepod"] as const;

/* Rows that aren't on the spec sheet. Positional — follow compareSlugs order:
        Gatsby                  Nomad                 Dojopod                 Gazepod              */
const compareExtras: { label: string; values: [string, string, string, string] }[] = [
  { label: "Deck / outdoor", values: ["200 sq ft covered", "4 ft + ramp",       "80 sq ft",              "325 sq ft + gazebo"] },
  { label: "Sleeps",         values: ["2+",                "1–2",               "2 (expandable)",        "2 (expandable)"] },
  { label: "Extra bedroom",  values: ["—",                 "—",                 "+ ₹7.99L",              "+ ₹7.99L"] },
  { label: "Best for",       values: ["Premium weekend home", "Work-from-anywhere", "Harsh-weather rentals", "Indoor-outdoor living"] },
];

/** Area rows come straight from each pod's spec-sheet `areas`, so this table
 *  and the pod detail pages can never fall out of sync. */
function buildCompareRows(list: Pod[]) {
  const price = { label: "From", values: list.map((p) => p.priceFrom ?? "On request") };
  const areas = AREA_FIELDS.map((f) => ({
    label: f.label,
    values: list.map((p) => (p.areas ? sqft(p.areas[f.key]) : "—")),
  }));
  return [price, ...areas, ...compareExtras.map((r) => ({ label: r.label, values: [...r.values] }))];
}

const rangeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Boho Pods — Full Product Range",
  description:
    "Catalogue of prefab luxury cabins, glamping pods, work pods and modular homes by Boho Pods.",
  url: "https://bohopods.com/pods",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: pods.length,
    itemListElement: pods.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://bohopods.com/pods/${p.slug}`,
      name: p.name,
    })),
  },
};

export default function PodsPage() {
  const comparePods = compareSlugs.map((s) => getPod(s)!);
  const compareRows = buildCompareRows(comparePods);

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rangeJsonLd) }}
      />
      <main className="pt-16">
        {/* ---------- Visual range hero ---------- */}
        <section className="relative isolate overflow-hidden border-b border-sand">
          <div className="absolute inset-0">
            <Image
              src="/images/gatsby/ext-05.jpg"
              alt=""
              fill
              priority
              quality={88}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-forest-deep/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-forest-deep/55" />
          </div>
          <Topo className="pointer-events-none absolute inset-0 opacity-[0.12] text-sage" />
          <Container className="relative py-20 text-center md:py-28">
            <Reveal>
              <Eyebrow className="justify-center text-sage">The Range</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-5 max-w-4xl text-display font-light text-balance text-paper">
                Find the pod that fits your land — and your life.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-paper/75">
                Every Bohopod is factory-built in Mumbai, plug-and-play on your
                plot, and engineered for 30+ years of Indian weather — from a
                ₹5L work pod to family-scale modular homes.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-display text-sm text-paper/90">
                <span className="inline-flex items-center gap-2">
                  <Trees className="size-4 text-sage" /> 12+ models
                </span>
                <span className="hidden size-1 rounded-full bg-bronze sm:block" />
                <span>₹5L to ₹95L</span>
                <span className="hidden size-1 rounded-full bg-bronze sm:block" />
                <span className="inline-flex items-center gap-2">
                  <Leaf className="size-4 text-sage" /> Installed in 30–45 days
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <CTA href="#retreat" variant="light">
                  Browse stay pods
                </CTA>
                <CTA href="#utility" variant="outlineLight">
                  Work &amp; utility
                </CTA>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ---------- Promise strip ---------- */}
        <Section className="border-b border-sand py-10 md:py-12">
          <Container>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {promise.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sage/25 text-olive-deep">
                    <p.icon className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-base text-forest">{p.title}</h2>
                    <p className="mt-0.5 text-sm text-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* ---------- Find your fit ---------- */}
        <Section className="py-14 md:py-20">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive-deep">Start here</Eyebrow>
              <SectionHeading className="mt-3">
                What are you dreaming of?
              </SectionHeading>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {fits.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05} className="h-full">
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-paper transition-shadow hover:shadow-lg hover:shadow-forest/10">
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <Image
                        src={f.image}
                        alt=""
                        fill
                        sizes="(max-width:640px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" />
                      <span className="absolute left-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-paper/90 text-olive-deep">
                        <f.icon className="size-4" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg">{f.title}</h3>
                      <p className="mt-1 text-sm text-muted">{f.body}</p>
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-sand pt-4">
                        {f.pods.length > 0 ? (
                          f.pods.map((slug) => {
                            const p = getPod(slug)!;
                            return (
                              <Link
                                key={slug}
                                href={`/pods/${slug}`}
                                className="rounded-full border border-sand bg-cream/60 px-3.5 py-2 font-display text-xs text-forest transition-colors hover:border-olive hover:text-olive-deep"
                              >
                                {p.name} →
                              </Link>
                            );
                          })
                        ) : (
                          <Link
                            href="#homes"
                            className="rounded-full border border-sand bg-cream/60 px-3.5 py-2 font-display text-xs text-forest transition-colors hover:border-olive hover:text-olive-deep"
                          >
                            2 &amp; 3-BHK →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* ---------- Visual break ---------- */}
        <div className="relative h-40 overflow-hidden md:h-56">
          <Image
            src="/images/gatsby/int-14.jpg"
            alt="Interior of a Bohopod with glass walls opening to nature"
            fill
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest-deep/35" />
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center font-serif-i text-2xl text-paper md:text-4xl">
            Glass, timber, and the view — in balance.
          </p>
        </div>

        {/* ---------- Retreat & Stay ---------- */}
        <Section id="retreat" className="bg-cream/50 py-16 md:py-24">
          <Container>
            <Reveal>
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <Eyebrow className="text-olive-deep">Retreat &amp; Stay Pods</Eyebrow>
                  <SectionHeading className="mt-3">
                    Escapes that earn their keep.
                  </SectionHeading>
                  <p className="mt-3 max-w-xl text-muted">
                    Weekend homes and micro-resort units — designed to photograph
                    beautifully and live comfortably year-round.
                  </p>
                </div>
                <Link
                  href="#compare"
                  className="-my-1 inline-flex items-center gap-1.5 py-2 font-display text-sm text-forest transition-colors hover:text-olive"
                >
                  Compare them side by side <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {retreatPods.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 4) * 0.05} className="h-full">
                  <PodCatalogueCard pod={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* ---------- Compare ---------- */}
        <Section id="compare" className="py-16 md:py-24">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive-deep">Side by side</Eyebrow>
              <SectionHeading className="mt-3">
                Compare the stay pods.
              </SectionHeading>
              <p className="mt-2 text-sm text-muted md:hidden">
                Swipe the table sideways →
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-sand">
                <table className="w-full min-w-[760px] border-collapse bg-paper text-left text-sm">
                  <thead>
                    <tr className="border-b border-sand bg-cream">
                      {/* Label column stays pinned while the pods scroll
                          sideways, so every figure keeps its row name. */}
                      <th className="sticky left-0 z-20 bg-cream p-4 font-display text-xs uppercase tracking-wider text-muted">
                        Pod
                      </th>
                      {comparePods.map((p) => (
                        <th key={p.slug} className="p-4">
                          <Link
                            href={`/pods/${p.slug}`}
                            className="group inline-flex flex-col"
                          >
                            <span className="font-display text-lg font-medium text-forest group-hover:text-olive">
                              {p.name}
                              {p.flagship && (
                                <span className="ml-2 rounded-full bg-bronze/90 px-2 py-0.5 align-middle font-display text-[10px] uppercase tracking-wider text-paper">
                                  Flagship
                                </span>
                              )}
                            </span>
                            <span className="mt-0.5 inline-flex items-center gap-1 text-xs font-normal text-muted group-hover:text-olive">
                              View details <ArrowUpRight className="size-3" />
                            </span>
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareRows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={i % 2 ? "bg-cream/30" : undefined}
                      >
                        <td className="sticky left-0 z-10 whitespace-nowrap bg-cream p-4 font-display text-xs uppercase tracking-wider text-muted">
                          {row.label}
                        </td>
                        {row.values.map((v, j) => (
                          <td key={j} className="p-4 text-ink">
                            {row.label === "From" ? (
                              <span className="font-display text-base text-forest">
                                {v}
                              </span>
                            ) : (
                              v
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ---------- Modular homes ---------- */}
        <Section id="homes" className="pt-0">
          <Container>
            <Reveal>
              <div className="grid overflow-hidden rounded-3xl bg-forest lg:grid-cols-2">
                <div className="relative min-h-[240px] lg:min-h-full">
                  <Image
                    src={homesTeaser.image}
                    alt="Modular 3-BHK family home by Boho Pods"
                    fill
                    sizes="(max-width:1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 text-paper md:p-12">
                  <Eyebrow className="text-sage">Modular Homes</Eyebrow>
                  <h2 className="mt-3 font-display text-4xl font-light text-paper md:text-5xl">
                    Need a whole house? We do those too.
                  </h2>
                  <p className="mt-3 max-w-xl text-paper/70">
                    Family-scale prefab homes — 2-BHK from ₹65L and 3-BHK from
                    ₹95L. Same factory precision, same 30–45 day install rhythm.
                    Layouts &amp; specs on request.
                  </p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["2-BHK from ₹65L", "3-BHK from ₹95L", "Full bathrooms", "Custom layouts"].map(
                      (item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-paper/85"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-sage" />
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                  <CTA
                    href={waLink(waMsg.pod("2/3-BHK modular home"))}
                    external
                    variant="light"
                    className="mt-8 w-fit"
                  >
                    View home options
                  </CTA>
                </div>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ---------- Work & Utility ---------- */}
        <Section id="utility" className="bg-cream py-16 md:py-24">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive-deep">Work &amp; Utility Pods</Eyebrow>
              <SectionHeading className="mt-3">
                Function, beautifully built.
              </SectionHeading>
              <p className="mt-3 max-w-xl text-muted">
                Compact commercial and site units — quiet rooms, gate houses and
                custom shells that don&rsquo;t look like afterthoughts.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {utilityPods.map((p) => (
                <Reveal key={p.slug} className="h-full">
                  <PodCatalogueCard pod={p} />
                </Reveal>
              ))}
              <Reveal delay={0.1} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-olive/40 bg-paper/60 p-5">
                  <div>
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl bg-sage/20">
                      <Image
                        src="/images/addons/outdoor-kitchen.jpg"
                        alt=""
                        fill
                        sizes="25vw"
                        className="object-cover opacity-80"
                      />
                    </div>
                    <p className="kicker text-olive-deep">Coming soon</p>
                    <h3 className="mt-3 text-2xl">Looie</h3>
                    <p className="mt-1 text-sm text-muted">
                      A beautiful portable washroom pod for farms, events &amp;
                      remote sites.
                    </p>
                  </div>
                  <a
                    href={waLink(waMsg.pod("Looie"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 py-2 font-display text-sm text-forest transition-colors hover:text-olive"
                  >
                    Get notified <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.15} className="h-full">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-forest p-5 text-paper">
                  <Topo className="pointer-events-none absolute inset-0 opacity-10 text-sage" />
                  <div className="relative">
                    <p className="kicker text-sage">Custom</p>
                    <h3 className="mt-3 text-2xl text-paper">Something else?</h3>
                    <p className="mt-1 text-sm text-paper/70">
                      Cafés, ticket booths, site offices — if it fits in a pod,
                      we can build it.
                    </p>
                  </div>
                  <a
                    href={waLink(waMsg.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-4 inline-flex items-center gap-1 py-2 font-display text-sm text-paper transition-colors hover:text-sage"
                  >
                    Talk to us <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ---------- Process strip ---------- */}
        <Section className="border-b border-sand py-12">
          <Container>
            <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-sand bg-paper px-6 py-8 text-center md:flex-row md:px-10 md:text-left">
              <div>
                <p className="font-display text-xl text-forest md:text-2xl">
                  Select <span className="text-bronze">→</span> Install{" "}
                  <span className="text-bronze">→</span> Stay
                </p>
                <p className="mt-1 text-sm text-muted">
                  30–45 days from booking to handover — factory-first, site-light.
                </p>
              </div>
              <Link
                href="/#process"
                className="-my-1 inline-flex items-center gap-1.5 py-2 font-display text-sm text-forest transition-colors hover:text-olive"
              >
                See how it works <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </Section>

        {/* ---------- Closing CTA ---------- */}
        <Section className="text-center">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-display font-light">Not sure which pod?</h2>
              <p className="mt-4 text-muted">
                Tell us about your land and how you&rsquo;ll use it — we&rsquo;ll
                recommend the right fit from the full range.
              </p>
              <CTA
                href={waLink(waMsg.general)}
                external
                variant="primary"
                className="mt-7"
              >
                <MessageCircle className="size-4" /> Ask on WhatsApp
              </CTA>
            </Reveal>
          </Container>
        </Section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
