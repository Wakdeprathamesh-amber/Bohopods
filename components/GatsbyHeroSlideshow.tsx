"use client";

import Image from "next/image";
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
 * Cinematic Gatsby hero — "FIRST LIGHT" 20.5s looping film with the Ken-Burns
 * slideshow as the reduced-motion / slow-connection fallback.
 */
export function GatsbyHeroSlideshow() {
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
  }, []);

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
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero/hero-poster.jpg"
        className="absolute inset-0 size-full object-cover transition-opacity duration-1000 will-change-[opacity]"
        style={{ opacity: videoMode ? 1 : 0 }}
        aria-hidden={videoMode ? undefined : true}
      >
        <source src="/videos/hero/hero.webm" type="video/webm" />
        <source src="/videos/hero/hero.mp4" type="video/mp4" />
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
