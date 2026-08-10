"use client";

import Image from "next/image";
import type { MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cldVideoUrl } from "@/lib/cloudinary";

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

  const posterSrc = cldVideoUrl("/videos/hero/hero-poster.jpg", { poster: true });
  const scrubSrc = cldVideoUrl("/videos/hero/hero-scrub.mp4", { scrub: true });
  const loopWebm = "/videos/hero/hero.webm";

  /**
   * Nothing is mounted until the client has decided which film to use. The
   * scrub flag arrives one render late, so mounting the <video> immediately
   * meant desktop began downloading the loop file, then swapped to the scrub
   * file — pulling ~14MB it never plays. The slideshow covers this render.
   */
  const [ready, setReady] = useState(false);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(max-width: 767px)");
    const sync = () => setNarrow(m.matches);
    sync();
    setReady(true);
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);

  /* Phones get a 720p cut of the loop. The 1080p file is far more than a muted
     background needs on a handset, and at ~400px wide the difference isn't
     visible. Desktop (reduced-motion) keeps the 1080p file. */
  const loopMp4 = cldVideoUrl(
    narrow ? "/videos/hero/hero-mobile.mp4" : "/videos/hero/hero.mp4",
  );

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Reveal the film as soon as a frame exists, not once the whole thing can
       play through. The scrub cut is ~55MB off the CDN, so `canplaythrough`
       can take many seconds or never fire on a slow line — which used to leave
       the slideshow up and the scroll effect dead. `loadeddata` means frame
       one is decoded, which is all the hero needs to show something real. */
    const v = videoRef.current;
    if (v) {
      const onReady = () => setVideoMode(true);
      v.addEventListener("loadeddata", onReady, { once: true });
      v.addEventListener("canplaythrough", onReady, { once: true });
      v.load();
      return () => {
        v.removeEventListener("loadeddata", onReady);
        v.removeEventListener("canplaythrough", onReady);
      };
    }
  }, [scrubbing, ready]);

  /**
   * Pull the scrub cut fully into memory before scroll ever touches it.
   *
   * Streaming it doesn't work: browsers deliberately stop buffering far ahead
   * of the playhead, so "wait until it's buffered" can wait forever, and any
   * seek past the buffered edge costs a fresh range request — which is what
   * showed up as lag, hangs, and the playhead stopping on a stale frame. Held
   * as a blob, every seek is a memory read, so scrubbing is instant and
   * behaves identically on every load. The slideshow covers the download.
   */
  const [filmReady, setFilmReady] = useState(false);
  useEffect(() => {
    if (!ready || !scrubbing) return;
    let objectUrl: string | null = null;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(scrubSrc, { cache: "force-cache" });
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        const v = videoRef.current;
        if (!v) return;
        v.loop = false;
        v.src = objectUrl;
        v.load();
        setFilmReady(true);
        setVideoMode(true);
      } catch {
        // Network refused the whole file — fall back to streaming the source,
        // which still scrubs, just less smoothly on the first pass.
        if (!cancelled) setFilmReady(true);
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [ready, scrubbing, scrubSrc]);

  /* Drive the playhead from scroll. Seeks are coalesced into one per frame so
     a fast flick can't queue up more seeks than the decoder can service. */
  useEffect(() => {
    const v = videoRef.current;
    if (!scrubbing || !scrub || !v || !filmReady) return;

    v.loop = false;
    v.pause();

    let raf = 0;
    let target = 0;

    const apply = () => {
      raf = 0;
      const d = v.duration;
      if (!d || Number.isNaN(d)) return;
      // A seek is already in flight — let it land. Queuing on top of it is what
      // makes the decoder fall behind and the picture appear to freeze. The
      // `seeked` listener below re-runs this with the newest target.
      if (v.seeking) return;
      const t = Math.min(d - 0.04, Math.max(0, target * d));
      if (Math.abs(v.currentTime - t) > 0.015) v.currentTime = t;
    };

    const unsub = scrub.on("change", (p) => {
      target = p;
      if (!raf) raf = requestAnimationFrame(apply);
    });

    /* Re-run whenever more data lands (so scrub arms itself), and again each
       time a seek settles — scroll may have moved on while that seek was in
       flight, and without this the playhead stops at a stale frame. */
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    v.addEventListener("progress", kick);
    v.addEventListener("canplaythrough", kick);
    v.addEventListener("seeked", kick);

    /* Bound to metadata rather than to the reveal: duration is all a seek
       needs, and waiting for the file to be playable-through left the
       playhead pinned at 0 on the larger CDN cut. */
    v.addEventListener("loadedmetadata", kick);
    v.addEventListener("durationchange", kick);
    apply();

    return () => {
      unsub();
      for (const e of [
        "progress",
        "canplaythrough",
        "seeked",
        "loadedmetadata",
        "durationchange",
      ]) {
        v.removeEventListener(e, kick);
      }
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrub, scrubbing, filmReady]);

  useEffect(() => {
    if (videoMode) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [videoMode]);


  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-deep">
      {/* The hero film — mounted only once we know which cut to fetch, so the
          browser never starts on the wrong one. Fades in over the slideshow. */}
      {ready && (
      <video
        ref={videoRef}
        /* Autoplay + loop in both modes. When scrubbing, the film plays
           normally until it's buffered end to end, then scroll takes the
           playhead over (see the scrub effect, which clears `loop`). That way
           a cold load shows real motion instead of a frozen first frame. */
        autoPlay
        loop
        muted
        playsInline
        // Seeking only feels instant once the file is buffered.
        preload={scrubbing ? "auto" : "metadata"}
        poster={posterSrc}
        className="absolute inset-0 size-full object-cover transition-opacity duration-1000 will-change-[opacity]"
        style={{ opacity: videoMode ? 1 : 0 }}
        aria-hidden={videoMode ? undefined : true}
        // Remount on mode change so the browser picks up the other source
        // instead of keeping the one it already committed to.
        key={scrubbing ? "scrub" : "loop"}
      >
        {scrubbing ? (
          <source src={scrubSrc} type="video/mp4" />
        ) : (
          <>
            {/* The webm is the 1080p cut. Offering it on a phone means Chrome
                takes it over the 720p mp4 — 14MB instead of 5MB — so it's
                desktop-only, and skipped entirely once the CDN is serving. */}
            {narrow || loopMp4.startsWith("http") ? null : (
              <source src={loopWebm} type="video/webm" />
            )}
            <source src={loopMp4} type="video/mp4" />
          </>
        )}
      </video>
      )}

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
