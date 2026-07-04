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
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("kicker text-olive-deep", className)}>{children}</span>;
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
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
