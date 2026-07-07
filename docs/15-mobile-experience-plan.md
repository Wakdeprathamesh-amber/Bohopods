# 15 · Mobile Experience Plan & Audit

> Most Bohopods visitors arrive on phones (WhatsApp forwards, Instagram taps). This doc is the
> mobile-first contract for the site: use cases, per-template audit, fixes shipped (2026-07-05),
> and the standing test matrix. Image/CDN optimisation (Cloudinary etc.) is **deferred by choice** —
> tracked in backlog, not here.

## 1 · Who is on the phone (use cases)

| Persona | Entry | Mobile job to be done |
|---|---|---|
| WhatsApp-forwarded buyer | Link from a friend / our chat | Skim hero → pods → price feel → forward brochure PDF onward |
| Instagram browser | Bio link / story swipe | See the vibe fast: hero film, gallery, book a visit |
| Land-owner on site | Standing on their plot | Check install size/process, map of belts, ask on WhatsApp |
| Spouse/partner second-opinion | Forwarded /pods/gatsby | Read specs, flip gallery, download PDF |

Design consequences: thumb-first CTAs (WhatsApp float bottom-right), one-hand scroll rhythm,
no hover-dependent info (all hover states have tap equivalents), heavy things swipe sideways
instead of shrinking (map, compare table), PDF ≤ 4 MB for mobile data.

## 2 · Global rules

- Tap targets ≥ 44px for primary actions (audited; 1–2 minor text links at ~36px accepted).
- No horizontal body overflow at 360–430px (audited: zero offenders on all four templates).
- Hover-revealed content (add-on previews) also works by tap (`onClick` + `aria-pressed`).
- Reduced-motion + no-JS fallbacks stay mandatory (already shipped site-wide).
- Wide artefacts scroll in-place: Locations map (min 620px, drag hint), compare table (min 760px, swipe hint).

## 3 · Per-template audit → decisions (all shipped)

| Area | Mobile issue found | Fix |
|---|---|---|
| Hero slideshow dots | Collided with WhatsApp float (both bottom-right) | Dots move bottom-left `< sm` |
| Process 5-week timeline | Stacked into disconnected centered blobs | True vertical timeline on mobile: icon-left rows + connector line (`lg:` keeps horizontal) |
| Locations topo map | 900×600 SVG shrank to illegible ~5px labels | Map keeps ≥620px width and pans horizontally; "drag to explore" hint |
| Add-ons showcase | 16/10 preview too short; callout oversized | `aspect-[4/3]` preview + `text-lg` callout on mobile |
| TrustBar wordmarks | Over-wide gaps forced ragged wrapping | `gap-x-6` on mobile (`sm:gap-x-10`) |
| **Flip-book (critical)** | `minWidth 480` overflowed ~342px containers | Rewritten: ResizeObserver measures container → `size="fixed"` at measured width (portrait everywhere, remounts on resize, keeps current page) |
| Pods carousel | — already swipe-native (85% slides) | verified only |
| Compare table (new) | Can't fit 5 columns | `overflow-x-auto` + explicit swipe hint |

Audited clean with no changes needed: nav drawer, WhyBoho, ownership stack, gallery tabs + lightbox,
testimonials, FAQ accordions, footer, pod detail template (0 overflow, 8 gallery tiles).

## 4 · Verified results (390×844 emulation, production build)

- `/` — zero horizontal overflow; vertical timeline ✓; map pans ✓
- `/pods` — zero overflow; fit-tiles, glance facts, table swipes ✓
- `/pods/gatsby` — zero overflow; gallery + lightbox ✓
- `/brochure` — book measures **342px on a 390px viewport** (previously 480px overflow); flips advance; 19/19 pages load

## 5 · Standing test matrix (re-run before releases)

| Viewport | Represents |
|---|---|
| 360×800 | Budget Android |
| 390×844 | iPhone 14/15 band — primary |
| 430×932 | Max-size phones |
| 768×1024 | Tablet portrait |
| 1280×800 / 1440×900 | Laptop (client's benchmark) |

Checks: body overflow, tap sizes, timeline/map/table behaviors, flip-book width, hero dots vs WA float.

## 6 · Deferred (explicitly)

- Image CDN / Cloudinary, AVIF pipeline tuning, per-viewport `sizes` refinement → performance pass later.
- Real-device lab (iOS Safari rubber-banding, Android Chrome address-bar collapse) once deployed to a URL.

---
**Related:** [UX Audit](10-ux-ui-audit-report.md) · [Director's Cut](12-design-directors-cut.md)
