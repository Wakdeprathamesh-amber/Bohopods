"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Mixed-size gallery grid with a full-screen lightbox (keyboard: Esc / ←→). */
export function PodGallery({
  podName,
  images,
}: {
  podName: string;
  images: string[];
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

  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpen(i)}
            aria-label={`Open ${podName} photo ${i + 1} of ${images.length}`}
            className={cn(
              "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-sand",
              i === 0 && "col-span-2 row-span-2",
            )}
          >
            <Image
              src={src}
              alt={`${podName} pod view ${i + 1}`}
              fill
              sizes={
                i === 0
                  ? "(max-width:1024px) 100vw, 50vw"
                  : "(max-width:1024px) 50vw, 25vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${podName} gallery viewer`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-deep/95 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative h-[82vh] w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${podName} pod photo ${open + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setOpen(null)}
            aria-label="Close gallery"
            className="absolute right-5 top-5 rounded-full bg-paper/10 p-2.5 text-paper transition-colors hover:bg-paper/25"
          >
            <X className="size-6" />
          </button>
          <button
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
