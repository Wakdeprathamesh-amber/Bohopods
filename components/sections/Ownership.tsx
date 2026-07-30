import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container, Section, SectionHeading, SectionLead, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { RoiChart } from "../RoiChart";
import { ownership, waLink, waMsg } from "@/lib/site";

export function Ownership() {
  return (
    <Section id="ownership" className="bg-cream">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-sand">
              <Image
                src="/images/renders/boho-001.jpg"
                alt="Aerial view of a Boho Pods micro-resort across forested hills"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-paper">
                <div className="font-display text-4xl font-light">1–2 yrs</div>
                <div className="text-sm text-paper/80">to recover your investment</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionHeading>Ownership &amp; Revenue</SectionHeading>
            <SectionLead>
              Make your land pay for itself.
            </SectionLead>
            <p className="mt-5 max-w-lg leading-relaxed text-muted">
              With as little as ~2,000 sq ft, a Bohopod turns idle land into a
              high-yield rental — listed on Airbnb, StayVista and Booking.com — that
              covers upkeep and earns. Choose the path that suits you:
            </p>
            <div className="mt-7 rounded-2xl bg-forest p-6 text-paper">
              <p className="kicker text-sage">Illustrative ROI</p>
              <RoiChart className="mt-4 w-full" />
              <p className="mt-3 text-sm leading-relaxed text-paper/80">
                List a Gatsby at{" "}
                <span className="text-paper">₹15&ndash;25k a night</span> &rarr;
                roughly <span className="text-paper">₹2&ndash;3L a month</span>,
                recovering a ~₹35L investment in{" "}
                <span className="text-paper">about 1&ndash;2 years</span> — then
                earning for decades.
              </p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {ownership.map((o) => (
                <div
                  key={o.title}
                  className="rounded-2xl border border-sand bg-paper p-5"
                >
                  <h3 className="text-base">{o.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{o.body}</p>
                </div>
              ))}
            </div>
            <CTA
              href={waLink(waMsg.ownership)}
              external
              variant="primary"
              className="mt-8"
            >
              <MessageCircle className="size-4" /> Talk to us about ROI
            </CTA>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
