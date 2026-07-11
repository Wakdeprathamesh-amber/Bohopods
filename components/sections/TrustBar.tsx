import { Container } from "../primitives";
import { Topo } from "../decor/Topo";

/**
 * Earning-platforms strip. Wordmarks are typographic (monochrome, premium
 * treatment) — swap for official brand SVGs the moment client supplies them.
 */
const platforms = [
  { name: "airbnb", className: "font-body text-xl font-extrabold lowercase tracking-tight md:text-2xl" },
  { name: "StayVista", className: "font-display text-xl font-medium tracking-wide md:text-2xl" },
  { name: "SaffronStays", className: "font-serif-i text-2xl font-semibold md:text-3xl" },
  { name: "Booking.com", className: "font-body text-xl font-bold tracking-tight md:text-2xl" },
  { name: "BONVOY CABINS", className: "font-display text-base font-medium tracking-[0.22em] md:text-lg" },
];

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-sand bg-cream/70">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-olive/15" />
      <Container className="relative flex flex-col items-center gap-6 py-12 text-center md:py-14">
        <p className="max-w-3xl font-display text-xl font-light text-forest md:text-3xl">
          Your Bohopod earns on the platforms guests{" "}
          <span className="font-serif-i text-bronze">already trust.</span>
        </p>
        <div className="flex flex-wrap items-baseline justify-center gap-x-6 gap-y-3 sm:gap-x-10 sm:gap-y-4">
          {platforms.map((p) => (
            <span
              key={p.name}
              className={`${p.className} text-forest/70 transition-colors duration-300 hover:text-forest`}
            >
              {p.name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
