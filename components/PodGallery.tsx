"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Cinematic gallery: featured frame + lookbook mosaic, with full-screen lightbox. */
export function PodGallery({
  podName,
  images,
  heroLine,
}: {
  podName: string;
  images: string[];
  heroLine?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (d: number) =>
      setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  if (images.length === 0) return null;

  const [hero, ...rest] = images;

  return (
    <>
      {/* Featured cinematic frame */}
      <button
        type="button"
        onClick={() => setOpen(0)}
        aria-label={`Open ${podName} featured photo`}
        className="group relative mt-10 block aspect-[16/10] w-full overflow-hidden rounded-[1.75rem] border border-sand md:aspect-[21/9]"
      >
        <Image
          src={hero}
          alt={`${podName} featured view`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
        <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 md:bottom-8 md:left-8 md:right-8">
          <span>
            <span className="block font-display text-xs uppercase tracking-[0.22em] text-sage">
              Featured · {podName}
            </span>
            {heroLine && (
              <span className="mt-1 block max-w-lg font-serif-i text-2xl text-paper md:text-3xl">
                {heroLine}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/15 px-4 py-2 font-display text-xs text-paper backdrop-blur-sm">
            <Maximize2 className="size-3.5" /> {images.length} frames
          </span>
        </span>
      </button>

      {/* Lookbook mosaic */}
      {rest.length > 0 && (
        <div className="mt-5 columns-2 gap-4 lg:columns-3 lg:gap-5">
          {rest.map((src, i) => {
            const index = i + 1;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`Open ${podName} photo ${index + 1} of ${images.length}`}
                className={cn(
                  "group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-sand lg:mb-5",
                  [
                    "aspect-[4/3]",
                    "aspect-[3/4]",
                    "aspect-square",
                    "aspect-[4/5]",
                    "aspect-[16/11]",
                    "aspect-[3/4]",
                  ][i % 6],
                )}
              >
                <Image
                  src={src}
                  alt={`${podName} pod view ${index + 1}`}
                  fill
                  quality={85}
                  sizes="(max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 font-display text-xs text-paper opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <Maximize2 className="size-3.5" /> {podName} · {index + 1}/
                  {images.length}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${podName} gallery viewer`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-deep/96 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative h-[84vh] w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${podName} pod photo ${open + 1}`}
              fill
              quality={92}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 rounded-full bg-paper/10 p-2.5 text-paper transition-colors hover:bg-paper/25"
          >
            <X className="size-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2.5 text-paper transition-colors hover:bg-paper/25"
          >
            <ChevronLeft className="size-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2.5 text-paper transition-colors hover:bg-paper/25"
          >
            <ChevronRight className="size-7" />
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-sm text-paper/70">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
