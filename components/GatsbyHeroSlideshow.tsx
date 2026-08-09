"use client";

import Image from "next/image";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SLIDES = [
  {
    src: "/images/gatsby/ext-07.jpg",
    alt: "The Gatsby pod set against dramatic mountains",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAACQAAAAD/wAARCAAJABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAPDw8PDw8aDw8aJBoaGiQxJCQkJDE+MTExMTE+Sz4+Pj4+PktLS0tLS0tLWlpaWlpaaWlpaWl2dnZ2dnZ2dnZ2/9sAQwESExMeHB40HBw0e1RFVHt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7/90ABAAC/9oADAMBAAIRAxEAPwBltql1FGFjbI9OtXX1S/W2EhOGJPGD2rjrfqK0E++azu0BoajMZ0jnuf3ny/MMYxWP5+n/APPKnXn+sb/drJpWuO5//9k=",
  },
  {
    src: "/images/gatsby/ext-03.jpg",
    alt: "",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAACQAAAAD/wAARCAAJABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAPDw8PDw8aDw8aJBoaGiQxJCQkJDE+MTExMTE+Sz4+Pj4+PktLS0tLS0tLWlpaWlpaaWlpaWl2dnZ2dnZ2dnZ2/9sAQwESExMeHB40HBw0e1RFVHt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7/90ABAAC/9oADAMBAAIRAxEAPwDGhSWRi3QYPKkZJ7cVZeIeWqBpCQQdrZ2g9+lZidF+gq2P9YKwbsNM1rK2s41Ml0Tlumz1/GrmNK9ZfzFc+/31/wB+rdO9gP/Z",
  },
  {
    src: "/images/gatsby/ext-09.jpg",
    alt: "",
    blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAACQAAAAD/wAARCAAJABgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwAPDw8PDw8aDw8aJBoaGiQxJCQkJDE+MTExMTE+Sz4+Pj4+PktLS0tLS0tLWlpaWlpaaWlpaWl2dnZ2dnZ2dnZ2/9sAQwESExMeHB40HBw0e1RFVHt7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7/90ABAAC/9oADAMBAAIRAxEAPwCCHVb0kRrIyJjqBn/GrsWq6ioC7mfPX5elc5adE/Ct+XqahXY0WJdZuY/lJJOOM8c1V/t69/uj9a5qb/j4H+9VimTc/9k=",
  },
];

/**
 * Cinematic Gatsby hero film, with the Ken-Burns slideshow as the
 * reduced-motion / slow-connection fallback.
 *
 * When a `scrub` progress value is supplied and the viewport is wide enough,
 * the film is paused and its playhead is driven by scroll instead of looping —
 * scrolling plays the walkthrough. That mode loads `hero-scrub.mp4`, which is
 * encoded all-intra (every frame a keyframe) so seeking lands instantly; the
 * regular file only carries 7 keyframes and would stutter badly.
 */
export function GatsbyHeroSlideshow({
  scrub,
  scrubbing = false,
}: {
  scrub?: MotionValue<number>;
  /** Decided by the hero, which also sizes the scroll runway to match. */
  scrubbing?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [videoMode, setVideoMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Swap the film in only once it can play through (slideshow stays the fallback).
    const v = videoRef.current;
    if (v) {
      const onReady = () => setVideoMode(true);
      v.addEventListener("canplaythrough", onReady, { once: true });
      v.load();
      return () => v.removeEventListener("canplaythrough", onReady);
    }
  }, [scrubbing]);

  /* Drive the playhead from scroll. Seeks are coalesced into one per frame so
     a fast flick can't queue up more seeks than the decoder can service. */
  useEffect(() => {
    const v = videoRef.current;
    if (!scrubbing || !scrub || !v || !videoMode) return;

    v.pause();
    let raf = 0;
    let target = 0;

    const apply = () => {
      raf = 0;
      const d = v.duration;
      if (!d || Number.isNaN(d)) return;
      const t = Math.min(d - 0.05, Math.max(0, target * d));
      if (Math.abs(v.currentTime - t) > 0.01) v.currentTime = t;
    };

    const unsub = scrub.on("change", (p) => {
      target = p;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    apply();
    return () => {
      unsub();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrub, scrubbing, videoMode]);

  useEffect(() => {
    if (videoMode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [videoMode]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-deep">
      {/* The hero film (preload after first paint; fades in over the slideshow) */}
      <video
        ref={videoRef}
        // Scroll owns the playhead when scrubbing — no autoplay, no loop.
        {...(scrubbing ? {} : { autoPlay: true, loop: true })}
        muted
        playsInline
        // Seeking only feels instant once the file is buffered.
        preload={scrubbing ? "auto" : "metadata"}
        poster="/videos/hero/hero-poster.jpg"
        className="absolute inset-0 size-full object-cover transition-opacity duration-1000 will-change-[opacity]"
        style={{ opacity: videoMode ? 1 : 0 }}
        aria-hidden={videoMode ? undefined : true}
        // Remount on mode change so the browser picks up the other source
        // instead of keeping the one it already committed to.
        key={scrubbing ? "scrub" : "loop"}
      >
        {scrubbing ? (
          <source src="/videos/hero/hero-scrub.mp4" type="video/mp4" />
        ) : (
          <>
            <source src="/videos/hero/hero.webm" type="video/webm" />
            <source src="/videos/hero/hero.mp4" type="video/mp4" />
          </>
        )}
      </video>

      {!videoMode &&
        SLIDES.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out motion-reduce:transition-none"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i === active ? undefined : true}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={s.blur}
            {...(i === 0 ? { priority: true } : { loading: "eager" as const })}
            className="animate-kenburns object-cover"
          />
        </div>
        ))}

      {/* Slide dots (hidden in video mode) */}
      {/* Dots sit bottom-left on mobile so they don't collide with the WhatsApp float */}
      {!videoMode && (
        <div className="absolute bottom-8 left-5 z-20 flex items-center gap-2 sm:left-auto sm:right-10">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-pressed={i === active}
              className={
                i === active
                  ? "h-2 w-6 rounded-full bg-paper transition-all duration-300"
                  : "size-2 rounded-full bg-paper/40 transition-all duration-300 hover:bg-paper/70"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
