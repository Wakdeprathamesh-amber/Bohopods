import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, MessageCircle, Phone, Plus } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Container, Section, Eyebrow, CTA } from "@/components/primitives";
import { Reveal } from "@/components/Reveal";
import { Topo } from "@/components/decor/Topo";
import { PodCard } from "@/components/PodCard";
import { PodGallery } from "@/components/PodGallery";
import { getPod, pods } from "@/lib/pods";
import { siteConfig, waLink, waMsg } from "@/lib/site";

export function generateStaticParams() {
  return pods.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pod = getPod(slug);
  if (!pod) return {};
  return {
    title: pod.seoTitle,
    description: pod.seoDescription,
    alternates: { canonical: `/pods/${pod.slug}` },
    openGraph: {
      title: pod.seoTitle,
      description: pod.seoDescription,
      images: [{ url: pod.image, width: 1920, height: 1800, alt: `The ${pod.name} pod` }],
    },
  };
}

export default async function PodPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pod = getPod(slug);
  if (!pod) notFound();

  const related = [
    ...pods.filter((p) => p.slug !== pod.slug && p.family === pod.family),
    ...pods.filter((p) => p.slug !== pod.slug && p.family !== pod.family),
  ].slice(0, 3);
  const lakhs = pod.priceFrom ? parseFloat(pod.priceFrom.replace(/[^0-9.]/g, "")) : null;
  const priceINR = lakhs ? Math.round(lakhs * 100000) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Boho Pods ${pod.name}`,
    description: pod.seoDescription,
    image: `${siteConfig.domain}${pod.image}`,
    brand: { "@type": "Brand", name: "Boho Pods" },
    category: pod.family === "utility" ? "Work & Utility Pod" : "Prefab Cabin",
    ...(priceINR
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: priceINR,
            availability: "https://schema.org/InStock",
            url: `${siteConfig.domain}/pods/${pod.slug}`,
          },
        }
      : {}),
  };

  const faqJsonLd =
    pod.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: pod.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Nav />
      <main>
        {/* ── Hero — image-first, minimal overlay (name + one CTA) ── */}
        <section className="relative flex min-h-[72vh] w-full items-end overflow-hidden">
          <Image
            src={pod.image}
            alt={`The ${pod.name} pod`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-forest-deep/30" />
          <Container className="relative z-10 pb-12 pt-28">
            <Link
              href="/pods"
              className="inline-flex items-center gap-1.5 text-sm text-paper/80 transition-colors hover:text-paper"
            >
              <ArrowLeft className="size-4" /> All pods
            </Link>
            <div className="hero-text-shadow mt-5">
              {pod.flagship && (
                <span className="mb-3 block w-fit rounded-full bg-bronze/90 px-3 py-1 text-xs font-display uppercase tracking-wider text-paper">
                  Flagship
                </span>
              )}
              <h1 className="text-hero font-light text-paper">{pod.name}</h1>
              <div className="mt-7">
                <CTA href={waLink(waMsg.pod(pod.name))} external variant="light">
                  <MessageCircle className="size-4" /> Enquire on WhatsApp
                </CTA>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Intro (text lives below the image now) ── */}
        <Section>
          <Container className="max-w-3xl">
            <Reveal>
              <Eyebrow>{pod.tagline}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-3 font-serif-i text-2xl text-forest md:text-3xl">
                {pod.heroLine}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg font-light leading-relaxed text-ink text-balance">
                {pod.overview}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {pod.specs.slice(0, 3).map((s) => (
                  <span
                    key={s.label}
                    className="rounded-full border border-sand bg-cream px-3 py-1 text-xs text-ink"
                  >
                    {s.label}: {s.value}
                  </span>
                ))}
                {pod.priceFrom && (
                  <span className="rounded-full bg-forest px-3 py-1 text-xs font-display text-paper">
                    from {pod.priceFrom}
                  </span>
                )}
              </div>
            </Reveal>
            {pod.imagePlaceholder && (
              <Reveal delay={0.14}>
                <p className="mt-4 text-xs text-muted">
                  (Imagery shown is indicative — real {pod.name} photos to follow.)
                </p>
              </Reveal>
            )}
          </Container>
        </Section>

        {/* ── Gallery (moved up — show the product early) ── */}
        {pod.gallery.length > 1 && (
          <Section className="pt-0">
            <Container>
              <Reveal>
                <Eyebrow>Gallery</Eyebrow>
              </Reveal>
              <PodGallery podName={pod.name} images={pod.gallery} />
            </Container>
          </Section>
        )}

        {/* ── Area stat circles (if available) ── */}
        {pod.areaStats && (
          <Section className="relative overflow-hidden bg-cream">
            <Topo className="pointer-events-none absolute inset-0 h-full w-full text-olive/10" />
            <Container className="relative">
              <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                {pod.areaStats.map((a) => (
                  <Reveal key={a.label}>
                    <div className="mx-auto flex aspect-square max-w-[180px] flex-col items-center justify-center rounded-full border border-sand bg-paper text-center">
                      <div className="font-display text-3xl font-light text-forest">
                        {a.value.replace(" sq ft", "")}
                      </div>
                      <div className="mt-1 px-4 text-[0.7rem] uppercase tracking-widest text-muted">
                        {a.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── Spec strip ── */}
        <Section className={pod.areaStats ? "pt-0" : ""}>
          <Container>
            <Reveal>
              <Eyebrow>At a glance</Eyebrow>
            </Reveal>
            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
              {pod.specs.map((s) => (
                <div key={s.label} className="bg-paper p-5">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    {s.label}
                  </div>
                  <div className="mt-1 font-display text-lg text-forest">
                    {s.value}
                  </div>
                </div>
              ))}
              {pod.sleeps && (
                <div className="bg-paper p-5">
                  <div className="text-xs uppercase tracking-widest text-muted">
                    Capacity
                  </div>
                  <div className="mt-1 font-display text-lg text-forest">
                    {pod.sleeps}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* ── Included + Features ── */}
        <Section className="bg-cream">
          <Container className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>What&rsquo;s included</Eyebrow>
              <ul className="mt-6 space-y-3">
                {pod.included.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-ink">
                    <Check className="mt-0.5 size-4 shrink-0 text-olive" />
                    {i}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow>Signature features</Eyebrow>
              <ul className="mt-6 space-y-3">
                {pod.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-ink">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-bronze" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>

        {/* ── Best used as + Pricing ── */}
        <Section>
          <Container className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Best used as</Eyebrow>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {pod.useCases.map((u) => (
                  <li
                    key={u}
                    className="rounded-full border border-sand bg-cream px-4 py-2 text-sm text-ink"
                  >
                    {u}
                  </li>
                ))}
              </ul>
              {pod.roi && (
                <div className="mt-6 rounded-2xl bg-forest p-6 text-paper">
                  <p className="kicker text-sage">As an investment</p>
                  <p className="mt-2 leading-relaxed text-paper/85">{pod.roi}</p>
                </div>
              )}
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow>Pricing &amp; options</Eyebrow>
              {pod.priceFrom ? (
                <p className="mt-5">
                  <span className="font-display text-4xl font-light text-forest">
                    from {pod.priceFrom}
                  </span>
                  {pod.priceNote && (
                    <span className="ml-2 text-sm text-muted">{pod.priceNote}</span>
                  )}
                </p>
              ) : (
                <p className="mt-5 font-display text-2xl font-light text-forest">
                  Pricing on request
                </p>
              )}
              {pod.addons && pod.addons.length > 0 && (
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {pod.addons.map((a) => (
                    <li key={a.label} className="flex items-center gap-2">
                      <Plus className="size-4 text-olive" /> {a.label} — {a.price}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Flexible ownership: outright, EMI, lease or revenue-share. Ask us
                what suits you.
              </p>
              <CTA
                href={waLink(waMsg.pod(pod.name))}
                external
                variant="primary"
                className="mt-6"
              >
                <MessageCircle className="size-4" /> Get a quote on WhatsApp
              </CTA>
            </Reveal>
          </Container>
        </Section>

        {/* ── FAQ ── */}
        {pod.faqs.length > 0 && (
          <Section className="bg-cream">
            <Container className="max-w-3xl">
              <Reveal>
                <Eyebrow>{pod.name} FAQ</Eyebrow>
              </Reveal>
              <div className="mt-8 divide-y divide-sand border-y border-sand">
                {pod.faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-display text-forest [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Plus className="size-5 shrink-0 text-olive transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* ── Explore the range ── */}
        <Section>
          <Container>
            <Reveal>
              <Eyebrow>Explore the range</Eyebrow>
              <h2 className="mt-3 text-3xl font-light">Other pods you might love</h2>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PodCard key={p.slug} pod={p} />
              ))}
            </div>
          </Container>
        </Section>

        {/* ── Final CTA ── */}
        <section className="bg-forest py-20 text-center text-paper md:py-28">
          <Container>
            <h2 className="text-display font-light text-paper text-balance">
              Make the {pod.name} yours.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-paper/75">
              Tell us about your land — we&rsquo;ll help you picture the {pod.name}{" "}
              on it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTA href={waLink(waMsg.pod(pod.name))} external variant="light">
                <MessageCircle className="size-4" /> Enquire on WhatsApp
              </CTA>
              <CTA href={`tel:+${siteConfig.phone}`} variant="outlineLight">
                <Phone className="size-4" /> {siteConfig.phoneDisplay}
              </CTA>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
