import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 md:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-14 md:py-28", className)}>
      {children}
    </section>
  );
}

/**
 * Primary section heading — the largest keyword in each band (How it works,
 * The Pods, Gallery, etc.). Sized near the hero but kept in the brand's light
 * display weight, so it reads as elegant scale rather than a bold headline.
 */
export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "section-title max-w-full text-balance font-display text-section font-light tracking-[-0.01em] text-forest",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Supporting line under a SectionHeading — quieter than the keyword title.
 */
export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 max-w-2xl text-base font-normal leading-relaxed text-muted md:mt-4 md:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Compact section marker — for secondary labels only (not primary headings).
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-display text-sm font-medium uppercase tracking-[0.26em] text-olive-deep md:text-base",
        className,
      )}
    >
      {children}
    </span>
  );
}

type CTAVariant = "primary" | "light" | "olive" | "outlineLight" | "outlineDark";

const VARIANTS: Record<CTAVariant, string> = {
  primary: "bg-forest text-paper hover:bg-forest-deep shadow-sm",
  light: "bg-paper text-forest hover:bg-white shadow-sm",
  olive: "bg-olive text-paper hover:bg-olive-deep shadow-sm",
  outlineLight: "border border-paper/50 text-paper hover:bg-paper/10",
  outlineDark: "border border-forest/25 text-forest hover:bg-forest/5",
};

export function CTA({
  href,
  children,
  variant = "primary",
  external,
  download,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  external?: boolean;
  /** Download the target instead of navigating (optionally set the filename). */
  download?: boolean | string;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: download === true ? "" : download } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-display tracking-wide transition-all duration-300 will-change-transform hover:-translate-y-px active:translate-y-0",
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
