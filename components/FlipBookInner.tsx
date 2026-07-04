"use client";

import HTMLFlipBook from "react-pageflip";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FlipEvent = { data: number };

/** Native page-flip brochure viewer (single landscape pages). */
export function FlipBookInner({ pages }: { pages: string[] }) {
  // react-pageflip's ref type isn't exported cleanly; keep a loose ref.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);

  const flip = useCallback((dir: -1 | 1) => {
    const api = bookRef.current?.pageFlip?.();
    if (!api) return;
    if (dir === 1) api.flipNext();
    else api.flipPrev();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flip(1);
      if (e.key === "ArrowLeft") flip(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip]);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-sand bg-forest-deep/5 shadow-xl shadow-forest/10">
        <HTMLFlipBook
          ref={bookRef}
          width={1000}
          height={705}
          size="stretch"
          minWidth={480}
          maxWidth={1075}
          minHeight={339}
          maxHeight={758}
          usePortrait={true}
          autoSize={true}
          showCover={false}
          maxShadowOpacity={0.35}
          flippingTime={850}
          mobileScrollSupport={true}
          showPageCorners={true}
          onFlip={(e: FlipEvent) => setPage(e.data)}
          className="mx-auto"
          style={{}}
          startPage={0}
          drawShadow={true}
          startZIndex={0}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          disableFlipByClick={false}
        >
          {pages.map((src, i) => (
            <div key={src} className="bg-cream">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Boho Pods brochure — page ${i + 1} of ${pages.length}`}
                width={1075}
                height={758}
                loading="eager"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5">
        <button
          onClick={() => flip(-1)}
          aria-label="Previous page"
          className="inline-flex size-11 items-center justify-center rounded-full border border-sand bg-paper text-forest transition-colors hover:bg-cream"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="min-w-24 text-center font-display text-sm tracking-wide text-muted">
          Page {page + 1} / {pages.length}
        </span>
        <button
          onClick={() => flip(1)}
          aria-label="Next page"
          className="inline-flex size-11 items-center justify-center rounded-full border border-sand bg-paper text-forest transition-colors hover:bg-cream"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-muted">
        Drag a page corner, swipe, or use your arrow keys
      </p>
    </div>
  );
}
