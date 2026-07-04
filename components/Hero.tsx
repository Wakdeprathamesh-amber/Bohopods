import { ChevronDown, MessageCircle } from "lucide-react";
import { Container, CTA, Eyebrow } from "./primitives";
import { GatsbyHeroSlideshow } from "./GatsbyHeroSlideshow";
import { waLink, waMsg } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="relative h-dvh min-h-[640px] w-full overflow-hidden"
    >
      {/* Cinematic Gatsby slideshow (swap for a real MP4 in media/hero-gatsby/video when ready) */}
      <GatsbyHeroSlideshow />

      {/* Legibility scrims — stronger top + bottom for white text on bright slides */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/20 to-forest-deep/85" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center pt-16">
          <Container>
            <div className="hero-text-shadow max-w-3xl animate-rise">
              <Eyebrow className="text-paper/85">Select · Install · Stay</Eyebrow>
              <h1 className="mt-5 text-hero font-light text-paper">
                Own the view.
                <br />
                <span className="font-serif-i font-normal text-sage">
                  Skip the wait.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/90 sm:text-lg">
                Plug-n-play prefab cabins with Scandinavian design — installed on
                your land in 30–45 days, and built to last 30+ years.
              </p>
              <div className="mt-9 flex flex-wrap gap-4 animate-rise-2">
                <CTA href={waLink(waMsg.siteVisit)} external variant="light">
                  <MessageCircle className="size-4" /> Book a Site Visit
                </CTA>
                <CTA href="/pods/gatsby" variant="outlineLight">
                  Explore the Gatsby
                </CTA>
              </div>
              <p className="mt-5 text-sm text-paper/75">
                Free site visit · No obligation · Just a friendly WhatsApp chat
              </p>
            </div>
          </Container>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center pb-8">
          <span className="animate-bob text-paper/70">
            <ChevronDown className="size-6" />
          </span>
        </div>
      </div>
    </section>
  );
}
