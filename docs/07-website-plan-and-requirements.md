# 07 · Website Plan & Requirements

> **Updated:** 2026-06-28 · The strategic plan for the new Boho Pods website.
> **Scope (locked with client):** Premium **UI/UX showcase** site. **No backend, no database, no e-commerce.** Pure showcase + **WhatsApp** conversion via CTAs throughout. Hero built around the **Gatsby** pod.

---

## 1. Goals
1. **Make people *feel* the escape** in the first 3 seconds (hero).
2. **Build trust** (design quality, real pods, proof, specs, testimonials).
3. **Convert to WhatsApp** — book a site visit / ask for details — from many touch-points.
4. **Rank** for prefab-cabin / glamping-pod / pod-investment searches in India.

**Primary CTA:** WhatsApp → *Book a Site Visit / Enquire*.
**Primary KPI:** WhatsApp click-throughs (+ scroll depth, time-on-page).

## 2. Recommended stack
**Next.js (App Router) + Tailwind CSS + Framer Motion, deployed on Vercel** (static — no server needed).
- **Why:** best-in-class performance + SEO (SSG), `next/image` optimization, smooth scroll/parallax, clean path to add per-pod pages later, one-click Vercel deploy, custom domain ready.
- **Motion/UX libs:** Framer Motion (reveals), Lenis (smooth scroll), Embla (pod carousel), a lightweight lightbox (gallery), lucide-react (icons). Optional GSAP for the hero.
- **Alternative considered:** single self-contained `index.html` + CSS + vanilla JS/GSAP — max portability, zero build, but weaker SEO/scaling/maintainability. *(Viable since there's no backend — fallback only.)*

> ⛳ **Open decision for client:** confirm **Next.js** (recommended) vs single-HTML. Default = Next.js.

## 3. Sitemap — Phase 1 (one stunning long-scroll page)
| # | Section | Purpose | CTA |
|---|---|---|---|
| 0 | Sticky nav (transparent → solid) | Logo + anchors + WhatsApp button | WhatsApp |
| 1 | **HERO — Gatsby cinematic** | Emotional hook; SELECT·INSTALL·STAY | Book a Site Visit · Explore Gatsby |
| 2 | Brand promise | "Owning land is the beginning of a legacy" + aerial micro-resort | — |
| 3 | Why Boho (6 pillars) | Build credibility fast | — |
| 4 | **The Pods** | Showcase all models (brochure card pattern, carousel/grid) | Enquire per pod |
| 5 | **Gatsby spotlight** | Flagship deep-dive (where hero photos shine) | Enquire about Gatsby |
| 6 | Product Advantage | Temporary structure · 30+ yr · AMC · Plug & Play · Weather · No permissions | — |
| 7 | **Ownership & ROI** | "Earn revenue"; Outright/EMI/Lease + Revenue-share; ROI 1–2 yrs; platform logos | Talk to us |
| 8 | Process | SELECT·INSTALL·STAY + 5-week timeline (animated stepper) | Start now |
| 9 | Locations | "Where will yours stand?" (Lonavala, Alibaug, Goa, Coorg…) | — |
| 10 | Gallery | Cinematic masonry + lightbox (brochure renders + client photos) | — |
| 11 | Testimonials | 6 real quotes | — |
| 12 | FAQ | Durability, permissions, finance, plot, timeline, AMC, resale (accordion) | — |
| 13 | Final CTA band | "Skip the wait. Start your legacy." | WhatsApp · Call · Email |
| 14 | Footer | Logo, nav, NAP, IG, legal | WhatsApp |
| — | **Floating WhatsApp button** | Always visible | WhatsApp |

**Phase 2 (later):** individual pod detail pages (Nomad, Gatsby, …), Stays/Experiences, Channel-Partner, full gallery.

## 4. The Hero (the centerpiece) — Gatsby
**Experience:** full-screen cinematic Gatsby pod + logo + headline + sub-line + dual CTA + SELECT·INSTALL·STAY ribbon + scroll cue, with a faint topographic overlay and slow, eased motion.

**Headline directions (draft):**
- "Own the view. Skip the wait."
- "Your escape, installed in 30 days."
- "Inside. Outside. Effortless." (riff on *inside but outside but still inside*)

**Build approach (so it's stunning even before final video):**
1. **Interim (immediate):** parallax + slow Ken-Burns on the **Gatsby stills** the client uploads → looks cinematic now.
2. **Final:** swap in a looping **Gatsby video**, produced from the stills via AI video tools (Runway Gen-3 / Kling / Luma / Google Veo / Pika) or an After Effects/Premiere Ken-Burns montage; or real drone footage if available.

**Video specs:** 1920×1080 (+720p mobile) · MP4 (H.264) **and** WebM · muted, autoplay, loop · 8–15s · target < 6–8 MB · first-frame **poster** image for fast LCP · `prefers-reduced-motion` fallback to a still.

## 5. WhatsApp / CTA strategy
- **WhatsApp:** `https://wa.me/919137578427?text=<prefilled>` · **Phone:** +91 98197 79900 · **Email:** hello@bohopods.com
- **Context-aware prefilled messages**, e.g.
  - Hero → "Hi Boho Pods 👋 I'd like to book a site visit."
  - Pod card → "Hi! I'm interested in the *Gatsby* pod — please share details & pricing."
  - Ownership → "Hi! I'd like to understand the revenue-share / ROI."
- **Placements:** nav button · hero (×2) · each pod card · Gatsby spotlight · ownership · process · final band · footer · floating button.

## 6. Animation / interaction plan
- Section reveals on scroll (fade/slide, staggered), parallax imagery, sticky-scroll pod showcase, animated stat counters (30+ yrs, 30–45 days, 1–2 yr ROI), animated SELECT·INSTALL·STAY stepper, hover micro-interactions, smooth-scroll anchors. Always eased & calm; respect reduced-motion.

## 7. SEO / performance / accessibility
- SSG, semantic HTML, meta + Open Graph + Twitter cards, **JSON-LD** (`Organization` + `LocalBusiness` + `Product` per pod), `sitemap.xml`, `robots.txt`.
- Responsive **AVIF/WebP**, lazy-load, preloaded fonts (`font-display: swap`), Lighthouse target **≥ 95**.
- Alt text everywhere, focus states, color-contrast, keyboard nav, reduced-motion.
- Geo keywords (see [Geography](04-geography-and-locations.md)).

## 8. Requirements / asset checklist
**From client**
- ⭐ **Gatsby photos** — exterior (golden-hour, deck, dusk-lit) + interior (living, bedroom, courtyard/skylight) → `media/hero-gatsby/`
- Gatsby **video** (or approval for us to generate one from stills) → `media/hero-gatsby/video/`
- **Vector (SVG) logo** + confirmed brand colours/fonts → `media/brand/`
- Per-pod photos (≥1 hero + 2–3 detail each) — interim: use brochure renders
- Floor plans / dimensions per pod (have Gazepod) — confirm others
- Real **built/installed** pod photos (trust) + any real project locations
- Final approval of copy, pricing, testimonials, contact details
- Domain/hosting decision (deploy to Vercel? point bohopods.com / a subdomain?)

**We provide**
- Design system, all sections, animations, copywriting drafts, hero build, SEO, deploy.

**Have already (in repo)**
- Logo PNG, 38 curated brochure renders, full copy/specs/pricing/testimonials, contact info, brochure PDF.

## 9. Roadmap
1. ✅ Research + docs + media (this stage)
2. **Design direction sign-off** (mood, palette, type, hero concept) ← *next*
3. Scaffold (Next.js + Tailwind + tokens) + layout skeleton
4. Hero (interim Gatsby parallax) + nav + WhatsApp system
5. Build all sections with real content
6. Polish: animation, responsive, performance, SEO
7. Swap in final Gatsby video
8. Review → deploy to Vercel → connect domain

## 10. Success criteria
Sub-3s "wow", Lighthouse ≥95, fully responsive, WhatsApp CTA on every screen, on-brand (Scandinavian-organic), and a hero that makes people stop scrolling.

---
**Related:** [Brand Overview](01-brand-overview.md) · [Products](02-products-and-pods.md) · [Customers](03-target-customers.md) · [Brand Identity](05-brand-identity-and-design.md) · [Media & Upload Guide](08-media-and-upload-guide.md)
