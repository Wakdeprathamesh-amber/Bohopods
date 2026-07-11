import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Home,
  MessageCircle,
  Mountain,
  TentTree,
} from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Section, Eyebrow, CTA } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { PodCatalogueCard } from "@/components/PodCatalogueCard";
import { retreatPods, utilityPods, getPod } from "@/lib/pods";
import { waLink, waMsg } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Pods — Explore & Compare the Range",
  description:
    "Explore and compare the full Boho Pods range — from a ₹5L work pod to the Gatsby flagship and 3-BHK modular homes. Prefab, installed in 30–45 days.",
  alternates: { canonical: "/pods" },
};

/* ---------- Find your fit ---------- */
const fits = [
  {
    icon: Mountain,
    title: "A weekend escape",
    body: "Your own view, ready this season.",
    pods: ["gatsby", "gazepod"],
  },
  {
    icon: TentTree,
    title: "A rental that earns",
    body: "Micro-resort units guests love.",
    pods: ["nomad", "dojopod"],
  },
  {
    icon: Briefcase,
    title: "Work & commercial",
    body: "Quiet rooms and utility cabins.",
    pods: ["cocoon", "watchpod"],
  },
  {
    icon: Home,
    title: "A full-time home",
    body: "Family-scale modular houses.",
    pods: [],
  },
] as const;

/* ---------- Compare table (retreat pods; values from published specs) ---------- */
const compareRows: { label: string; values: [string, string, string, string] }[] = [
  { label: "From", values: ["₹35L", "₹20L", "₹25L", "₹28L"] },
  { label: "Room", values: ["300 sq ft", "150 sq ft study + rest", "270 sq ft", "280 sq ft"] },
  { label: "Bathroom", values: ["150 sq ft", "80 sq ft", "150 sq ft", "150 sq ft"] },
  { label: "Deck / outdoor", values: ["200 sq ft covered", "4 ft + ramp", "80 sq ft", "325 sq ft + gazebo"] },
  { label: "Sleeps", values: ["2+", "1–2", "2 (expandable)", "2 (expandable)"] },
  { label: "Extra bedroom", values: ["—", "—", "+ ₹7.99L", "+ ₹7.99L"] },
  { label: "Best for", values: ["Premium weekend home", "Work-from-anywhere", "Harsh-weather rentals", "Indoor-outdoor living"] },
];
const compareSlugs = ["gatsby", "nomad", "dojopod", "gazepod"] as const;

export default function PodsPage() {
  const comparePods = compareSlugs.map((s) => getPod(s)!);

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* ---------- Range hero ---------- */}
        <Section className="border-b border-sand bg-cream/60 py-14 md:py-20">
          <Container className="mx-auto max-w-3xl text-center">
            <Reveal>
              <Eyebrow>The Range</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 text-display font-light text-balance">
                Find the pod that fits your land — and your life.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-muted">
                Every Bohopod is factory-built, plug-and-play on your plot, and
                engineered for 30+ years of Indian weather.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-display text-sm text-forest">
                <span>12+ models</span>
                <span className="hidden size-1 rounded-full bg-bronze sm:block" />
                <span>₹5L to ₹95L</span>
                <span className="hidden size-1 rounded-full bg-bronze sm:block" />
                <span>Installed in 30–45 days</span>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ---------- Find your fit ---------- */}
        <Section className="py-14 md:py-20">
          <Container>
            <Reveal>
              <p className="kicker text-olive-deep">Start here</p>
              <h2 className="mt-3 text-3xl font-light">What are you dreaming of?</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {fits.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.05} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-sand bg-paper p-5">
                    <f.icon className="size-6 text-olive" />
                    <h3 className="mt-3 text-lg">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted">{f.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-sand pt-4">
                      {f.pods.length > 0 ? (
                        f.pods.map((slug) => {
                          const p = getPod(slug)!;
                          return (
                            <Link
                              key={slug}
                              href={`/pods/${slug}`}
                              className="rounded-full border border-sand bg-cream/60 px-3 py-1 font-display text-xs text-forest transition-colors hover:border-olive hover:text-olive-deep"
                            >
                              {p.name} →
                            </Link>
                          );
                        })
                      ) : (
                        <a
                          href={waLink(waMsg.pod("2/3-BHK modular home"))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-sand bg-cream/60 px-3 py-1 font-display text-xs text-forest transition-colors hover:border-olive hover:text-olive-deep"
                        >
                          2 &amp; 3-BHK →
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* ---------- Retreat & Stay ---------- */}
        <Section id="retreat" className="bg-cream/50 py-16 md:py-24">
          <Container>
            <Reveal>
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
                <div>
                  <Eyebrow className="text-olive-deep">Retreat &amp; Stay Pods</Eyebrow>
                  <h2 className="mt-3 text-3xl font-light">Escapes that earn their keep.</h2>
                </div>
                <Link
                  href="#compare"
                  className="inline-flex items-center gap-1.5 font-display text-sm text-forest transition-colors hover:text-olive"
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
              <h2 className="mt-3 text-3xl font-light">Compare the stay pods.</h2>
              <p className="mt-2 text-sm text-muted md:hidden">Swipe the table sideways →</p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-8 overflow-x-auto rounded-2xl border border-sand">
                <table className="w-full min-w-[760px] border-collapse bg-paper text-left text-sm">
                  <thead>
                    <tr className="border-b border-sand bg-cream/60">
                      <th className="p-4 font-display text-xs uppercase tracking-wider text-muted">
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
                        <td className="whitespace-nowrap p-4 font-display text-xs uppercase tracking-wider text-muted">
                          {row.label}
                        </td>
                        {row.values.map((v, j) => (
                          <td key={j} className="p-4 text-ink">
                            {row.label === "From" ? (
                              <span className="font-display text-base text-forest">{v}</span>
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
        <Section className="pt-0">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest p-8 text-paper md:flex-row md:items-center md:p-10">
                <div>
                  <p className="kicker text-sage">Modular Homes</p>
                  <h2 className="mt-2 text-3xl font-light text-paper">
                    Need a whole house? We do those too.
                  </h2>
                  <p className="mt-2 max-w-xl text-paper/70">
                    Family-scale prefab homes — 2-BHK from ₹65L and 3-BHK from
                    ₹95L. Layouts &amp; specs on request.
                  </p>
                </div>
                <CTA
                  href={waLink(waMsg.pod("2/3-BHK modular home"))}
                  external
                  variant="light"
                  className="shrink-0"
                >
                  Enquire about homes
                </CTA>
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* ---------- Work & Utility ---------- */}
        <Section id="utility" className="bg-cream py-16 md:py-24">
          <Container>
            <Reveal>
              <Eyebrow className="text-olive-deep">Work &amp; Utility Pods</Eyebrow>
              <h2 className="mt-3 text-3xl font-light">Function, beautifully built.</h2>
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
                    className="mt-5 inline-flex items-center gap-1 font-display text-sm text-forest transition-colors hover:text-olive"
                  >
                    Get notified <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.15} className="h-full">
                <div className="flex h-full flex-col justify-between rounded-2xl bg-forest p-5 text-paper">
                  <div>
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
                    className="mt-5 inline-flex items-center gap-1 font-display text-sm text-paper transition-colors hover:text-sage"
                  >
                    Talk to us <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* ---------- Process strip ---------- */}
        <Section className="border-b border-sand py-10">
          <Container className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="font-display text-lg text-forest">
              Select <span className="text-bronze">→</span> Install{" "}
              <span className="text-bronze">→</span> Stay
              <span className="ml-3 text-sm font-normal text-muted">
                30–45 days from booking to handover
              </span>
            </p>
            <Link
              href="/#process"
              className="inline-flex items-center gap-1.5 font-display text-sm text-forest transition-colors hover:text-olive"
            >
              See how it works <ArrowRight className="size-4" />
            </Link>
          </Container>
        </Section>

        {/* ---------- Closing CTA ---------- */}
        <Section className="text-center">
          <Container className="mx-auto max-w-2xl">
            <Reveal>
              <h2 className="text-display font-light">Not sure which pod?</h2>
              <p className="mt-4 text-muted">
                Tell us about your land and how you&rsquo;ll use it — we&rsquo;ll
                recommend the right fit.
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
