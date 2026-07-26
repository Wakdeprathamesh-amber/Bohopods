"use client";

import HTMLFlipBook from "react-pageflip";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  Maximize,
  Minimize,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FlipEvent = { data: number };

const PAGE_RATIO = 758 / 1075; // native page aspect

/**
 * Heyzine-style flip-book viewer: dark immersive stage, corner-curl pages,
 * big side arrows, and a floating toolbar — thumbnails, zoom, download,
 * share (copy link), fullscreen. All self-hosted, Bohopods-branded.
 */
export function FlipBookInner({
  pages,
  pdfHref,
}: {
  pages: string[];
  pdfHref?: string;
}) {
  // react-pageflip's ref type isn't exported cleanly; keep a loose ref.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [thumbs, setThumbs] = useState(false);
  const [fs, setFs] = useState(false);
  const [copied, setCopied] = useState(false);
  const drag = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  /* ---- measure the stage; book fits both width & height ---- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setDims({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    // re-measure after layout/fonts settle (guards against an early narrow read)
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 600);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Heyzine-style: two-page spread on desktop (cover alone first),
     single page on small screens where a spread would be unreadable.
     Sized to fill the stage so pages are large & readable. */
  const spread = dims.w >= 640;
  const pageW = spread
    ? Math.min(Math.max(Math.floor((dims.w - 96) / 2), 220), 1075, Math.floor((dims.h - 84) / PAGE_RATIO))
    : Math.min(Math.max(dims.w - 48, 240), 1075, Math.floor((dims.h - 84) / PAGE_RATIO));
  const bookW = pageW;
  const bookH = Math.round(pageW * PAGE_RATIO);

  /* ---- flip controls ---- */
  const api = () => bookRef.current?.pageFlip?.();
  const flip = useCallback((dir: -1 | 1) => {
    const a = api();
    if (!a) return;
    if (dir === 1) a.flipNext();
    else a.flipPrev();
  }, []);
  const goTo = (i: number) => api()?.flip(i);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") flip(1);
      if (e.key === "ArrowLeft") flip(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip]);

  /* ---- fullscreen ---- */
  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);
  const toggleFs = () => {
    const el = stageRef.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  /* ---- zoom & pan ---- */
  const toggleZoom = () => {
    setZoomed((z) => {
      if (z) setPan({ x: 0, y: 0 });
      return !z;
    });
  };
  const onPointerDown = (e: React.PointerEvent) => {
    if (!zoomed) return;
    drag.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!zoomed || !drag.current) return;
    const d = drag.current;
    setPan({ x: d.px + (e.clientX - d.x), y: d.py + (e.clientY - d.y) });
  };
  const onPointerUp = () => (drag.current = null);

  /* ---- share ---- */
  const share = async () => {
    const url = `${location.origin}/brochure`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bohopods Brochure", url });
        return;
      }
      throw new Error("no share");
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
    }
  };

  const btn =
    "inline-flex size-10 items-center justify-center rounded-full text-paper/85 transition-colors hover:bg-paper/15 hover:text-paper";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-paper/10 bg-[radial-gradient(110%_100%_at_50%_0%,#2a3a1c_0%,#1a2410_55%,#121a0b_100%)]">
      {/* Stage */}
      <div
        ref={stageRef}
        className={cn(
          "relative flex items-center justify-center",
          fs ? "h-[100dvh]" : "h-[48vh] min-h-[340px] sm:h-[82vh] sm:min-h-[620px]",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {bookW > 0 && (
          <div
            className={cn(
              "transition-transform duration-500 ease-out",
              zoomed && "cursor-grab active:cursor-grabbing",
            )}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomed ? 1.7 : 1})`,
            }}
          >
            <div className="shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <HTMLFlipBook
                key={`${spread}-${bookW}`}
                ref={bookRef}
                width={bookW}
                height={bookH}
                size="fixed"
                minWidth={bookW}
                maxWidth={bookW}
                minHeight={bookH}
                maxHeight={bookH}
                usePortrait={!spread}
                autoSize={true}
                showCover={spread}
                maxShadowOpacity={0.7}
                flippingTime={950}
                mobileScrollSupport={true}
                showPageCorners={true}
                onFlip={(e: FlipEvent) => setPage(e.data)}
                className=""
                style={{}}
                startPage={page}
                drawShadow={true}
                startZIndex={0}
                useMouseEvents={!zoomed}
                swipeDistance={30}
                clickEventForward={false}
                disableFlipByClick={false}
              >
                {pages.map((src, i) => (
                  <div key={src} className="bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Bohopods brochure — page ${i + 1} of ${pages.length}`}
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
          </div>
        )}

        {/* Big side arrows */}
        <button
          onClick={() => flip(-1)}
          aria-label="Previous page"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-paper/10 p-2.5 text-paper backdrop-blur-sm transition-all hover:bg-paper/25 sm:left-5 sm:p-3"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={() => flip(1)}
          aria-label="Next page"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-paper/10 p-2.5 text-paper backdrop-blur-sm transition-all hover:bg-paper/25 sm:right-5 sm:p-3"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Thumbnails drawer */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-16 z-30 transition-all duration-400",
            thumbs ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          )}
        >
          <div className="mx-auto flex max-w-[92%] gap-2 overflow-x-auto rounded-2xl border border-paper/15 bg-forest-deep/85 p-3 backdrop-blur-md">
            {pages.map((src, i) => (
              <button
                key={src}
                onClick={() => {
                  goTo(i);
                  setThumbs(false);
                }}
                aria-label={`Go to page ${i + 1}`}
                className={cn(
                  "relative h-16 shrink-0 overflow-hidden rounded-md border transition-all",
                  i === page ? "border-bronze ring-1 ring-bronze" : "border-paper/20 opacity-75 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-auto" loading="lazy" draggable={false} />
                <span className="absolute bottom-0 right-0 rounded-tl bg-forest-deep/80 px-1 text-[9px] text-paper/90">
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-2 border-t border-paper/10 bg-forest-deep/70 px-3 py-2 backdrop-blur-md sm:px-5">
        <div className="flex items-center gap-1">
          <button onClick={() => setThumbs((t) => !t)} aria-label="Page thumbnails" className={cn(btn, thumbs && "bg-paper/15 text-paper")}>
            <LayoutGrid className="size-4.5" />
          </button>
          <button onClick={toggleZoom} aria-label={zoomed ? "Zoom out" : "Zoom in"} className={cn(btn, zoomed && "bg-paper/15 text-paper")}>
            {zoomed ? <ZoomOut className="size-4.5" /> : <ZoomIn className="size-4.5" />}
          </button>
        </div>

        <span className="font-display text-sm tracking-wide text-paper/90">
          {spread && page > 0 && page + 2 <= pages.length
            ? `${page + 1}–${page + 2}`
            : page + 1}{" "}
          <span className="text-paper/50">/ {pages.length}</span>
        </span>

        <div className="flex items-center gap-1">
          {pdfHref && (
            <a href={pdfHref} download="Bohopods-Brochure.pdf" aria-label="Download PDF" className={btn}>
              <Download className="size-4.5" />
            </a>
          )}
          <button onClick={share} aria-label="Share" className={btn}>
            {copied ? <Check className="size-4.5 text-sage" /> : <Share2 className="size-4.5" />}
          </button>
          <button onClick={toggleFs} aria-label={fs ? "Exit fullscreen" : "Fullscreen"} className={btn}>
            {fs ? <Minimize className="size-4.5" /> : <Maximize className="size-4.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
