"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "lenis/dist/lenis.css";

/**
 * Global Lenis smooth scroll, synced to Motion's frame loop so
 * useScroll / useSpring hero animations stay buttery.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!reduce.matches);
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    document.documentElement.classList.add("lenis");

    return () => {
      cancelFrame(update);
      document.documentElement.classList.remove("lenis");
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
