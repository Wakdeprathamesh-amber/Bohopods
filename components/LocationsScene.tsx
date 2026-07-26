"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/* Map image geo-bounds (Uwe Dedering "India relief location map") */
const B = { n: 37.5, s: 5.0, w: 67.0, e: 99.0 };
const xPct = (lon: number) => ((lon - B.w) / (B.e - B.w)) * 100;
const yPct = (lat: number) => ((B.n - lat) / (B.n - B.s)) * 100;

type Spot = { name: string; lat: number; lon: number; tag: string };
const SPOTS: Spot[] = [
  { name: "Manali", lat: 32.24, lon: 77.19, tag: "Himalayan hills" },
  { name: "Kasauli", lat: 30.9, lon: 76.96, tag: "Pine hills" },
  { name: "Rishikesh", lat: 30.09, lon: 78.27, tag: "River valley" },
  { name: "Jim Corbett", lat: 29.39, lon: 79.13, tag: "Forest edge" },
  { name: "Udaipur", lat: 24.58, lon: 73.68, tag: "Lakes" },
  { name: "Mount Abu", lat: 24.59, lon: 72.7, tag: "Hill station" },
  { name: "Alibaug", lat: 18.64, lon: 72.87, tag: "Konkan coast" },
  { name: "Lonavala", lat: 18.75, lon: 73.41, tag: "Western Ghats" },
  { name: "Mahabaleshwar", lat: 17.92, lon: 73.66, tag: "Ghats" },
  { name: "Goa", lat: 15.3, lon: 74.05, tag: "Beaches" },
  { name: "Gokarna", lat: 14.55, lon: 74.32, tag: "Coast" },
  { name: "Coorg", lat: 12.42, lon: 75.74, tag: "Coffee hills" },
  { name: "Wayanad", lat: 11.68, lon: 76.13, tag: "Rainforest" },
  { name: "Munnar", lat: 10.09, lon: 77.06, tag: "Tea hills" },
  { name: "Kodaikanal", lat: 10.24, lon: 77.49, tag: "Hill station" },
  { name: "Darjeeling", lat: 27.04, lon: 88.26, tag: "Tea hills" },
  { name: "Shillong", lat: 25.57, lon: 91.88, tag: "Pine hills" },
];

export function LocationsScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 8 }); // gentle parallax
  };

  return (
    <div
      ref={wrap}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative mx-auto mt-8 max-w-4xl [perspective:1400px]"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-paper/12 shadow-2xl shadow-black/40 transition-transform duration-300 ease-out will-change-transform motion-reduce:!transform-none"
        style={{ transform: `rotateX(${8 + tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Real relief base */}
        <div className="relative aspect-[1393/1500] w-full">
          <Image
            src="/images/map/india-relief.jpg"
            alt="Relief map of India showing the Himalaya, Western Ghats, Deccan plateau and rivers"
            fill
            sizes="(max-width:1024px) 100vw, 60vw"
            className="object-cover"
            priority={false}
          />
          {/* cinematic grade + spotlight on India */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_42%_55%,transparent_0%,rgba(19,27,12,0.35)_75%,rgba(19,27,12,0.7)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-forest-deep/25" />

          {/* Markers */}
          {SPOTS.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(on ? null : i)}
                aria-label={`${s.name} — ${s.tag}`}
                className="group absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={{ left: `${xPct(s.lon)}%`, top: `${yPct(s.lat)}%`, zIndex: on ? 30 : 10 }}
              >
                {/* pulse */}
                <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/50 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
                {/* dot */}
                <span
                  className={
                    "relative block rounded-full bg-bronze ring-2 ring-paper/70 shadow-[0_0_10px_2px_rgba(156,122,60,0.8)] transition-all duration-300 " +
                    (on ? "size-3.5" : "size-2.5 group-hover:size-3")
                  }
                />
                {/* label / tooltip */}
                <span
                  className={
                    "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border px-2 py-0.5 font-display backdrop-blur-sm transition-all duration-300 " +
                    (on
                      ? "border-bronze/50 bg-forest-deep/90 text-[11px] text-paper opacity-100"
                      : "border-paper/15 bg-forest-deep/60 text-[10px] text-paper/85 opacity-0 group-hover:opacity-100")
                  }
                >
                  {s.name}
                  {on && <span className="ml-1 text-sage/90">· {s.tag}</span>}
                </span>
              </button>
            );
          })}

          {/* drifting particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              [12, 22], [78, 16], [30, 70], [88, 60], [55, 40], [66, 84],
            ].map(([l, t], i) => (
              <span
                key={i}
                className="absolute size-1 rounded-full bg-paper/40 [animation:kb-bob_var(--d)_ease-in-out_infinite] motion-reduce:hidden"
                style={{ left: `${l}%`, top: `${t}%`, ["--d" as string]: `${3 + i * 0.6}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
