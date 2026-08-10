"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container, CTA } from "./primitives";
import { GatsbyHeroSlideshow } from "./GatsbyHeroSlideshow";
import { waLink, waMsg } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /* Scrubbing is desktop-only (matches the md: runway below and the child's
     own guard). Starts false so SSR and the first paint agree. */
  const [scrubbing, setScrubbing] = useState(false);
  useEffect(() => {
    const decide = () =>
      setScrubbing(
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          !window.matchMedia("(max-width: 767px)").matches,
      );
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Decorative transforms ride a spring; the playhead deliberately does not. */
  const progress = useSpring(scrollYProgress, {
    stiffness: scrubbing ? 90 : 60,
    damping: scrubbing ? 22 : 26,
    mass: scrubbing ? 0.5 : 0.7,
    restDelta: 0.0005,
  });

  /* The film follows raw scroll, not the spring. Lenis has already smoothed the
     scroll itself, so a second smoothing pass only adds tail — the playhead
     keeps travelling after the wheel stops, which reads as the video "playing
     on its own", and it arrives late at the end of the pin.
     Mapped to finish at 90% so the film is always complete before the hero
     unpins and the next section takes over. */
  const scrubProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1], {
    clamp: true,
  });

  /* Two rhythms. Scrubbing gets a long runway, so the intro beats have to
     resolve in the first tenth of it; without it, the old proportions hold. */
  const K = scrubbing
    ? { text: 0.11, cueMid: 0.03, cueEnd: 0.07, recede: 0.9 }
    : { text: 0.55, cueMid: 0.12, cueEnd: 0.28, recede: 0.55 };

  /* The film's own camera move supplies the motion when scrubbing — stacking a
     zoom on top of it is what makes these effects feel synthetic. */
  const mediaScale = useTransform(progress, [0, 1], scrubbing ? [1, 1.03] : [1, 1.22]);
  const mediaY = useTransform(progress, [0, 1], scrubbing ? ["0%", "2%"] : ["0%", "14%"]);

  // Tail of the pin: the whole frame eases back into a rounded card, so the
  // hero hands off to the next section instead of just scrolling away.
  const frameScale = useTransform(progress, [K.recede, 1], [1, 0.93]);
  const frameRadius = useTransform(progress, [K.recede, 1], ["0px", "28px"]);

  const textY = useTransform(progress, [0, K.text], [0, -72]);
  const textOpacity = useTransform(
    progress,
    [0, K.text * 0.4, K.text],
    [1, 0.85, 0],
  );
  const textBlur = useTransform(
    progress,
    [0, K.text * 0.64, K.text * 1.09],
    ["blur(0px)", "blur(2px)", "blur(10px)"],
  );
  const textScale = useTransform(progress, [0, K.text], [1, 0.96]);

  // Kept light: the frame recede now carries the handoff, so the veil only has
  // to sink the media behind the incoming section — not black it out.
  /* No scroll-deepening veil any more: it darkened the film as you scrolled,
     and the frame recede already carries the handoff into the next section. */
  const cueOpacity = useTransform(
    progress,
    [0, K.cueMid, K.cueEnd],
    [1, 0.4, 0],
  );

  const animated = reduce !== true;

  return (
    <section
      ref={ref}
      id="top"
      className={
        animated
          // Desktop runway is long on purpose: the 16.4s film is mapped across
          // it, so ~420vh gives roughly 230px of scroll per second of footage —
          // a walking pace. Phones don't scrub, so they keep the short runway.
          ? "relative h-[160vh] min-h-[900px] md:h-[420vh] md:min-h-[2600px]"
          : "relative h-dvh min-h-[640px]"
      }
    >
      <div
        className={
          animated
            ? "sticky top-0 h-dvh min-h-[640px] w-full"
            : "relative h-full w-full overflow-hidden"
        }
      >
        {/* Frame — clips the media and eases back into a card on the way out */}
        <motion.div
          className="absolute inset-0 overflow-hidden will-change-transform"
          style={
            animated
              ? { scale: frameScale, borderRadius: frameRadius }
              : undefined
          }
        >
          {/* Media — slow cinematic zoom + drift on scroll */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={animated ? { scale: mediaScale, y: mediaY } : undefined}
          >
            <GatsbyHeroSlideshow
              scrub={animated ? scrubProgress : undefined}
              scrubbing={animated && scrubbing}
            />
          </motion.div>

          {/* Legibility shading only where white type actually sits — a short
              band under the nav and a pool behind the headline on the left.
              The film's own frame stays unwashed, especially the view on the
              right, which is the whole point of the shot. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-forest-deep/45 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-deep/45 via-forest-deep/8 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-deep/35 to-transparent" />

        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex flex-1 items-center pt-16">
            <Container>
              <motion.div
                className="hero-text-shadow max-w-2xl will-change-transform"
                style={
                  animated
                    ? {
                        y: textY,
                        opacity: textOpacity,
                        filter: textBlur,
                        scale: textScale,
                      }
                    : undefined
                }
              >
                <h1 className="animate-rise text-hero font-light text-paper">
                  Own the view.
                  <br />
                  <span className="font-serif-i font-normal text-sage">
                    Skip the wait.
                  </span>
                </h1>
                <div className="mt-8 animate-rise-2">
                  <CTA href={waLink(waMsg.siteVisit)} external variant="light">
                    <MessageCircle className="size-4" /> Book a Site Visit
                  </CTA>
                </div>
              </motion.div>
            </Container>
          </div>

          <motion.div
            className="flex justify-center pb-8"
            style={animated ? { opacity: cueOpacity } : undefined}
          >
            <span className="animate-bob text-paper/70" aria-hidden>
              <ChevronDown className="size-6" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
