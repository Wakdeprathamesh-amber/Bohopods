import { Container, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { experiences, waLink } from "@/lib/site";

/** Slim "try before you own" banner (compressed from a full section). */
export function Experiences() {
  return (
    <section className="border-y border-sand bg-cream/70">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
            <div>
              <p className="kicker text-olive">Try before you own</p>
              <p className="mt-2 max-w-md font-serif-i text-2xl leading-snug text-forest">
                Spend a night in one first — then decide with your whole heart.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {experiences.map((e) => (
                <span
                  key={e.name}
                  className="rounded-full border border-sand bg-paper px-4 py-2 text-sm text-ink"
                >
                  {e.name} · {e.price}
                </span>
              ))}
              <CTA
                href={waLink(
                  "Hi Boho Pods! I'd like to book a stay to experience a pod before buying.",
                )}
                external
                variant="primary"
                className="ml-1"
              >
                Book a stay
              </CTA>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
