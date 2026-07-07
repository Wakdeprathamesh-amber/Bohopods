"use client";

import HTMLFlipBook from "react-pageflip";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FlipEvent = { data: number };

const PAGE_RATIO = 758 / 1075; // native page aspect

/**
 * Native page-flip brochure viewer. The book is sized to the measured
 * container width (single landscape page everywhere — phones included),
 * remounting on meaningful resize so the engine re-inits cleanly.
 */
export function FlipBookInner({ pages }: { pages: string[] }) {
  // react-pageflip's ref type isn't exported cleanly; keep a loose ref.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      const w = Math.min(Math.floor(el.clientWidth), 1075);
      // ignore sub-24px jitter (scrollbars, rubber-banding)
      setWidth((prev) => (Math.abs(prev - w) > 24 ? w : prev || w));
    };
    measure();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    ro.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

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

  const height = Math.round(width * PAGE_RATIO);

  return (
    <div ref={wrapRef} className="mx-auto w-full">
      {width > 0 && (
        <>
          <div className="overflow-hidden rounded-2xl border border-sand bg-forest-deep/5 shadow-xl shadow-forest/10">
            <HTMLFlipBook
              key={width}
              ref={bookRef}
              width={width}
              height={height}
              size="fixed"
              minWidth={width}
              maxWidth={width}
              minHeight={height}
              maxHeight={height}
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
              startPage={page}
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
        </>
      )}
    </div>
  );
}
