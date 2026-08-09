"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Container, CTA } from "./primitives";
import { GatsbyHeroSlideshow } from "./GatsbyHeroSlideshow";
import { waLink, waMsg } from "@/lib/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Soft spring — follows Lenis without jitter. Slightly looser than a
  // critically-damped spring so the media trails the scroll a touch, which is
  // what reads as "weight" rather than the image being glued to the wheel.
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 26,
    mass: 0.7,
    restDelta: 0.0005,
  });

  const mediaScale = useTransform(progress, [0, 1], [1, 1.22]);
  const mediaY = useTransform(progress, [0, 1], ["0%", "14%"]);

  // Tail of the pin: the whole frame eases back into a rounded card, so the
  // hero hands off to the next section instead of just scrolling away.
  const frameScale = useTransform(progress, [0.55, 1], [1, 0.93]);
  const frameRadius = useTransform(progress, [0.55, 1], ["0px", "28px"]);

  const textY = useTransform(progress, [0, 0.55], [0, -72]);
  const textOpacity = useTransform(progress, [0, 0.22, 0.55], [1, 0.85, 0]);
  const textBlur = useTransform(
    progress,
    [0, 0.35, 0.6],
    ["blur(0px)", "blur(2px)", "blur(10px)"],
  );
  const textScale = useTransform(progress, [0, 0.55], [1, 0.96]);

  // Kept light: the frame recede now carries the handoff, so the veil only has
  // to sink the media behind the incoming section — not black it out.
  const scrim = useTransform(progress, [0, 0.75], [0, 0.3]);
  const cueOpacity = useTransform(progress, [0, 0.12, 0.28], [1, 0.4, 0]);

  const animated = reduce !== true;

  return (
    <section
      ref={ref}
      id="top"
      className={
        animated
          ? "relative h-[160vh] min-h-[900px] md:h-[190vh] md:min-h-[1100px]"
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
            <GatsbyHeroSlideshow scrub={animated ? progress : undefined} />
          </motion.div>

          {/* Base legibility scrims */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-deep/60 via-forest-deep/20 to-forest-deep/85" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent" />

          {/* Scroll-deepening veil — eases the handoff into the next section */}
          {animated && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-forest-deep"
              style={{ opacity: scrim }}
            />
          )}
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
