import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";
import { Topo } from "../decor/Topo";

// Stylised (not geographically exact) placement to evoke the getaway belts.
const pins = [
  { name: "Igatpuri", x: 42, y: 16 },
  { name: "Nashik", x: 58, y: 11 },
  { name: "Alibaug", x: 15, y: 41 },
  { name: "Karjat", x: 33, y: 33 },
  { name: "Lonavala", x: 45, y: 42 },
  { name: "Khandala", x: 53, y: 37 },
  { name: "Mahabaleshwar", x: 38, y: 58 },
  { name: "Panchgani", x: 50, y: 61 },
  { name: "Goa", x: 27, y: 78 },
  { name: "Coorg", x: 46, y: 90 },
  { name: "Kodaikanal", x: 63, y: 91 },
];

export function Locations() {
  return (
    <Section id="locations" className="bg-forest text-paper">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow className="text-sage">Locations</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light text-paper">
              Where will yours stand?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-paper/70">
              From the Western Ghats to the Konkan coast — within a 2–6 hour drive
              of Mumbai &amp; Pune.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto mt-12 aspect-[16/11] max-w-4xl overflow-hidden rounded-3xl border border-paper/15 bg-forest-deep/40 sm:aspect-[16/9]">
            <Topo className="pointer-events-none absolute inset-0 h-full w-full text-sage/15" />
            {pins.map((p) => (
              <div
                key={p.name}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="size-2 shrink-0 rounded-full bg-sage ring-4 ring-sage/20" />
                  <span className="whitespace-nowrap text-[0.7rem] text-paper/85 sm:text-sm">
                    {p.name}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
