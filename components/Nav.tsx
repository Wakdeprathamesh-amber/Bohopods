"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./primitives";
import { nav, siteConfig, waLink, waMsg } from "@/lib/site";
import { cn } from "@/lib/utils";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href.startsWith("/#")
      ? false
      : href === "/pods"
        ? pathname.startsWith("/pods")
        : pathname.startsWith(href);

  // Pages whose top of page is a light background (no dark hero behind the nav):
  // the bar must start in its solid, dark-text state so the logo/links stay legible.
  const lightTop = pathname === "/pods" || pathname === "/brochure";
  const solid = scrolled || lightTop;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "bg-paper/85 backdrop-blur-md border-b border-sand/60 py-3"
          : "py-5",
      )}
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className={cn("transition-colors", solid ? "text-forest" : "text-paper")}
        >
          <Logo className="text-xl" />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((l) => {
            const active = isActive(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-display tracking-wide transition-opacity hover:opacity-60",
                  solid ? "text-forest" : "text-paper/90",
                  active && "underline decoration-olive decoration-2 underline-offset-8",
                )}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink(waMsg.siteVisit)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium font-display transition-all sm:inline-flex",
              solid
                ? "bg-forest text-paper hover:bg-forest-deep"
                : "bg-paper text-forest hover:bg-white",
            )}
          >
            <MessageCircle className="size-4" /> Book a Visit
          </a>
          <button
            onClick={() => setOpen(true)}
            className={cn(
              "-m-2 p-2 md:hidden",
              solid ? "text-forest" : "text-paper",
            )}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </Container>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-forest-deep text-paper md:hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <Logo className="text-xl" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-m-2 p-2"
            >
              <X />
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-paper/10 py-4 text-2xl font-display font-light"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <a
                href={waLink(waMsg.siteVisit)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3.5 font-display text-sm text-forest"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </a>
              <a
                href={`tel:+${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/40 px-5 py-3.5 font-display text-sm text-paper"
              >
                <Phone className="size-4" /> Call us
              </a>
            </div>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-10 mt-6 inline-flex items-center gap-2 text-sm text-paper/70"
            >
              <InstagramGlyph className="size-4" /> {siteConfig.instagramHandle}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
