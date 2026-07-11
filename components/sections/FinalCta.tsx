import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { Container, CTA } from "../primitives";
import { Reveal } from "../Reveal";
import { siteConfig, waLink, waMsg } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/renders/boho-145.jpg"
        alt="A Bohopod at golden hour beside the sea"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest-deep/80" />
      <Container className="relative z-10 py-24 text-center md:py-32">
        <Reveal>
          <p className="kicker text-sage">Select · Install · Stay</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-display font-light text-paper text-balance">
            Skip the wait. Start your legacy.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-paper/80">
            Tell us about your land and we&rsquo;ll help you picture the Bohopod on it —
            no pressure, just a friendly chat on WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <CTA href={waLink(waMsg.siteVisit)} external variant="light">
              <MessageCircle className="size-4" /> Book a Site Visit
            </CTA>
            <CTA href={`tel:+${siteConfig.phone}`} variant="outlineLight">
              <Phone className="size-4" /> {siteConfig.phoneDisplay}
            </CTA>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
