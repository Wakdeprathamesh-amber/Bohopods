import Image from "next/image";
import { Container, Section, Eyebrow } from "../primitives";
import { Reveal } from "../Reveal";

const shots = [
  { src: "/images/renders/boho-065.jpg", alt: "Beachfront pod glowing at golden hour" },
  { src: "/images/renders/boho-031.jpg", alt: "Pod on a deck above a misty valley" },
  { src: "/images/renders/boho-145.jpg", alt: "Seaside pod with a sunken fire pit" },
  { src: "/images/renders/boho-126.jpg", alt: "Glass pod wrapped in monsoon mist" },
  { src: "/images/renders/boho-149.jpg", alt: "Oceanfront pod framed by palms" },
  { src: "/images/renders/boho-133.jpg", alt: "Warm wood-and-glass pod interior" },
];

export function Gallery() {
  return (
    <Section className="bg-paper">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The Gallery</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display font-light">
              Inside, outside — and the line between.
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 3) * 0.05} className="h-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-sand">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
