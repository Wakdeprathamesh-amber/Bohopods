import { cn } from "@/lib/utils";

/** Color-adaptive wordmark (inherits `currentColor`). */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display leading-none select-none",
        className,
      )}
      aria-label="Boho Pods"
    >
      <svg
        viewBox="0 0 30 22"
        className="h-[1.05em] w-auto"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 21 L4 6 L26 2 L28 21" />
        <path d="M2 21 L28 21" />
      </svg>
      <span className="flex items-baseline">
        <span className="font-light tracking-[0.22em] pr-[0.1em]">BOHO</span>
        <span className="font-bold tracking-[0.01em]">PODS</span>
      </span>
    </span>
  );
}
