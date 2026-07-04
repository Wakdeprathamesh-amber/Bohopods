/** Decorative topographic contour lines — the Boho Pods brand motif. */
export function Topo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 420"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M0,210 C220,170 420,230 620,190 C820,150 1020,210 1200,170" />
        <path d="M0,240 C220,200 420,260 620,220 C820,180 1020,240 1200,200" />
        <path d="M0,270 C220,230 420,290 620,250 C820,210 1020,270 1200,230" />
        <path d="M0,300 C220,260 420,320 620,280 C820,240 1020,300 1200,260" />
        <path d="M0,330 C220,290 420,350 620,310 C820,270 1020,330 1200,290" />
        <path d="M0,180 C240,140 440,200 640,160 C840,120 1040,180 1200,140" />
        <path d="M0,150 C240,110 440,170 640,130 C840,90 1040,150 1200,110" />
      </g>
    </svg>
  );
}
