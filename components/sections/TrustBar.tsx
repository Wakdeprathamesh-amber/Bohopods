import { Container } from "../primitives";
import { Topo } from "../decor/Topo";

const platforms = [
  "Airbnb",
  "StayVista",
  "SaffronStays",
  "Booking.com",
  "Bonvoy Cabins",
];

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-sand bg-cream/70">
      <Topo className="pointer-events-none absolute inset-0 h-full w-full text-olive/15" />
      <Container className="relative flex flex-col items-center gap-5 py-9 text-center">
        <p className="kicker text-muted">
          Your pod earns on the platforms guests already trust
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
          {platforms.map((p) => (
            <span
              key={p}
              className="font-display text-lg tracking-wide text-forest/75"
            >
              {p}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
