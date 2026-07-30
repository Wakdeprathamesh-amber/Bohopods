import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "./primitives";
import { Logo } from "./Logo";
import { nav, siteConfig, waLink, waMsg } from "@/lib/site";

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

export function Footer() {
  return (
    <footer className="bg-forest-deep text-paper/75">
      <Container className="grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="text-2xl text-paper" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
            {siteConfig.tagline}. Turn your land into a beautiful escape — and an asset.
          </p>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm transition-colors hover:text-paper"
          >
            <InstagramGlyph className="size-4" /> {siteConfig.instagramHandle}
          </a>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-sm uppercase tracking-widest text-paper">
            Explore
          </h4>
          <ul className="mt-3 space-y-0.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-block py-1.5 transition-colors hover:text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display text-sm uppercase tracking-widest text-paper">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={waLink(waMsg.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              >
                <MessageCircle className="size-4" /> WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={`tel:+${siteConfig.phone}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              >
                <Phone className="size-4" /> {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-paper"
              >
                <Mail className="size-4" /> {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-paper/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-paper/50 sm:flex-row">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <p className="font-display uppercase tracking-widest">
            Select · Install · Stay
          </p>
        </Container>
      </div>
    </footer>
  );
}
