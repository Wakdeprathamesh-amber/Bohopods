# 10 · UI/UX Design Audit & Report — Boho Pods

> **Reviewer lens:** senior product designer (taste + behavioural science).
> **Method:** heuristic evaluation against established frameworks, a full real-Chrome walkthrough (desktop 1440px + mobile 375–414px), and hand-computed WCAG contrast on the actual palette.
> **Scope:** the live local build (dev). Performance numbers must be re-measured on the production build.
> **Updated:** 2026-06-28

---

## Part A — The parameter framework
*Everything that can affect the design — the checklist this audit runs against.*

1. **Strategy & Information Architecture** — goal clarity, page/section order, navigation model, scent of information, depth vs breadth.
2. **Content & Copywriting** — message hierarchy, clarity, tone, length, scannability, microcopy, jargon, density (too much text / too much image).
3. **Visual Hierarchy & Layout** — focal points, scanning pattern (F/Z/layer-cake), grid, whitespace, alignment, balance, Gestalt grouping.
4. **Typography** — type pairing, scale/rhythm, measure (line length), line-height, weight/contrast, hierarchy, legibility.
5. **Colour & Theme** — palette logic (60-30-10), harmony, semantic use, contrast/accessibility, consistency, mood.
6. **Imagery & Illustration** — quality, relevance, art direction, people vs product, ratio of image to text, illustration/diagram support, alt text.
7. **Motion & Animation** — purpose, easing, timing, performance, restraint, reduced-motion, perceived performance.
8. **Usability & Interaction** — Nielsen's 10 heuristics, Fitts's law (target size), Hick's law (choice load), affordances, feedback, states.
9. **Conversion & Persuasion** — funnel logic, CTA clarity/placement/frequency, Cialdini principles, Fogg behaviour model, friction, risk-reversal.
10. **Trust & Credibility** — proof, specificity, social proof quality, transparency, authority signals (Stanford web-credibility).
11. **Accessibility (WCAG 2.2 AA)** — POUR: contrast, focus, keyboard, semantics, alt text, motion, target size, language.
12. **Responsive & Mobile** — breakpoints, reflow, touch targets, thumb-zones, content parity, performance on mobile.
13. **Performance & Technical** — Core Web Vitals (LCP/CLS/INP), image weight, code-split, caching, no-JS resilience.
14. **SEO & Discoverability** — metadata, structured data, semantics, headings, sitemap, local SEO.
15. **Brand Consistency** — voice, colour/type discipline, motif usage, logo, component consistency.
16. **Emotional & Aesthetic** — Norman's 3 levels (visceral/behavioural/reflective), aesthetic-usability effect, peak-end, delight.

---

## Part B — The review

### 1. Strategy & Information Architecture — 9/10
**Theory:** information scent, progressive disclosure, dual-process (System 1 emotion → System 2 logic).
**✓** Clear single goal (WhatsApp lead). Funnel re-sequenced to alternate emotion↔logic (hero → trust → concept → how → pods → flagship → *why-prefab* → proof → ROI → try → about → locations → gallery → social proof → FAQ → CTA). Pod catalogue split by intent (retreat vs utility) = clean mental model (Jakob's law).
**⚠** The homepage is **16 sections / ~11,000px** — long-scroll fatigue risk (P2). Three benefit-style list sections (Why Boho pillars, Product Advantage, Comparison) sit fairly close — mild redundancy of *format*.
**→** Add a subtle scroll-progress or section dot-nav for orientation; ensure each list section uses a distinct visual format so they don't read as "three lists."

### 2. Content & Copywriting + density — 8.5/10
**Theory:** Krug ("don't make me think"), measure 45–75 chars, Miller's chunking.
**✓** Voice is warm, confident, lightly poetic, consistent. Headlines do real work ("Own the view. Skip the wait.", "Make your land pay for itself."). Copy is chunked and scannable.
**Density verdict — well balanced, slightly image-led (good for this category).** Roughly alternating image-heavy and text sections; no wall-of-text. The hero is image-dominant (correct). The **risk is the opposite of "too much text"** — a few sections are *list-light on substance* (short bullets) and could feel thin to a high-consideration ₹35L buyer.
**⚠** Microcopy under CTAs is missing the reassurance layer (P2). Some body lines on cream are long-ish but within measure.
**→** Add risk-reversal microcopy near CTAs ("Free site visit · No obligation · We usually reply within minutes"). Add 1–2 lines of depth to thinner sections (e.g., a sentence of proof per advantage).

### 3. Visual Hierarchy & Layout — 9/10
**Theory:** Gestalt (proximity/figure-ground), visual weight, layer-cake scanning, 8-pt grid.
**✓** Strong focal flow; generous, confident whitespace; consistent container + rhythm; clear primary/secondary CTA weight (filled vs outline). Alternating cream/paper/forest bands segment the scroll well.
**⚠** The **Locations** section (forest, chips only) is visually lighter than its neighbours — a slight "dead spot" in the rhythm (P2). Stat band and pillars are strong but the eye has three similar card-grids in the mid-page.
**→** Give Locations a visual anchor (map illustration or imagery). Vary card-grid treatments.

### 4. Typography — 9/10
**Theory:** modular scale, type-pairing contrast, measure, vertical rhythm.
**✓** Excellent pairing: **Jost** (geometric display/UI) + **Cormorant Garamond** italic (editorial accent) + **Inter** (body) — high contrast, on-brand, legible. Fluid `clamp()` scale handles all viewports. Spaced-uppercase kickers feel premium.
**⚠** Kicker labels are **0.72rem with 0.3em tracking in olive/muted** — small + low-contrast (legibility + a11y, P2). Hero serif accent in sage over bright slides can lose definition.
**→** Bump kicker to ~0.78rem and darken to forest where on light bg; add a faint text-shadow/scrim under hero type.

### 5. Colour & Theme — 8/10 (one real a11y issue)
**Theory:** 60-30-10, analogous harmony, WCAG contrast.
**✓** Disciplined Scandinavian-organic system (paper/cream 60% · forest/olive 30% · bronze 10%). Forest = action, bronze = flagship — consistent semantic use. Mood is calm, premium, nature-true.
**⚠ Measured contrast (computed on actual hex):**
| Pair | Ratio | AA body (4.5) |
|---|---|---|
| ink `#2a2a22` on paper `#faf8f1` | ~13.9:1 | ✅ AAA |
| muted `#6e6f60` on paper `#faf8f1` | ~4.8:1 | ✅ pass (tight) |
| **muted `#6e6f60` on cream `#efe9da`** | **~4.2:1** | ⚠️ **fails AA** for normal text |
| paper/85 white on bright hero areas | variable | ⚠️ dips on bright slides |
**→ (P1)** Darken `--color-muted` to ~`#5b5c4d` (lifts cream contrast to ~5.3:1, paper to ~6:1) — fixes every muted-on-cream instance at once. Strengthen hero top-scrim.

### 6. Imagery & Illustration — 8/10
**Theory:** art-direction, emotional resonance, Norman's visceral level, image:text balance.
**✓** Cinematic, consistent, genuinely beautiful renders; the Gatsby crossfade hero is a standout. The **exploded diagram** is a lovely credibility/illustration asset.
**⚠ Biggest content gap: zero people / lifestyle.** Every image is an architectural render — stunning but *cool*. No humans enjoying the space, no host, no scale reference, no real-build photos. This caps emotional connection and trust (P1). Cocoon/WatchPod still on placeholder imagery (known).
**→** Add **lifestyle shots** (a couple on the deck at golden hour, morning coffee, a family) and **real installed-pod photos**. Consider faces on testimonials. Extend the exploded-diagram illustration style to Process and a Locations map.

### 7. Motion & Animation — 8/10
**Theory:** motion-with-meaning, easing/timing, perceived performance, prefers-reduced-motion.
**✓** Tasteful: scroll-reveals, Ken-Burns + crossfade hero, hover scale, animated scroll cue. Reduced-motion handled in CSS + the slideshow opts out.
**⚠** Scroll-reveals use `whileInView` with `opacity:0` initial → content is invisible until JS+scroll (a no-JS/SEO-visibility and "late-pop on fast scroll" risk, P2). No animated stat counters (missed delight, P3).
**→** Add a `@media (scripting: none)` fallback (or reveal sooner); add count-up stats; consider a subtle parallax depth on section imagery.

### 8. Usability & Interaction — 8.5/10
**Theory:** Nielsen's 10 heuristics, Fitts's law, Hick's law.
**✓** CTAs are large, rounded, finger-friendly (≥44px). Consistent components, clear affordances, native accessible FAQ accordion, sticky WhatsApp = always-available primary action (visibility of system status + user control). Choice load is well-managed (Hick).
**⚠** No **active/current-page state** in nav on sub-pages (P3). Focus-visible styling relies on browser defaults — likely too subtle on the cream theme (a11y, P2). The hero slideshow has no manual controls/pause (minor).
**→** Add `:focus-visible` ring tokens; add nav active state; optional hero pause-on-hover.

### 9. Conversion & Persuasion — 9/10
**Theory:** Fogg (motivation × ability × trigger), Cialdini, friction reduction, Von Restorff.
**✓** Triggers everywhere (WhatsApp), low ability-cost (one tap, pre-filled context messages), motivation built via dream + ROI. Cialdini well-used: social proof (testimonials/platforms), authority (specs/AMC), liking (warmth), commitment (low-friction "just ask"). Flagship stands out (Von Restorff via bronze). Comparison reframes the decision.
**⚠** Light on **scarcity/urgency** and **risk-reversal** (both honest levers — e.g., limited install slots per season, "free site survey"). No secondary capture for non-WhatsApp users (P2).
**→** Add honest urgency + risk-reversal microcopy; offer an optional lightweight enquiry form/email as an alternative path.

### 10. Trust & Credibility — 7.5/10
**Theory:** Stanford Web Credibility, specificity > adjectives.
**✓** Trust bar (platforms), testimonials, comparison, specs, AMC, ROI logic, real NAP + JSON-LD.
**⚠** Trust is **assertion-heavy, evidence-light** (P1). No hard numbers ("X pods delivered / since 20XX / N happy owners"), no faces/locations on testimonials, no press/certifications/warranty badge, no real project photos. High-ticket buyers need proof.
**→** Add concrete counts, named+located testimonials (ideally photos), a warranty/30-yr badge, and real installations.

### 11. Accessibility (WCAG 2.2 AA) — 7/10
**✓** Semantic HTML, alt text, reduced-motion, keyboard-operable native controls, language set, viewport/themeColor.
**⚠** (P1) muted-on-cream contrast fails AA; (P2) focus-visible too subtle; (P2) JS-dependent content visibility; kicker text small/low-contrast; verify hero text contrast on bright slides; confirm all icon-only controls have labels (floating WhatsApp ✓ has aria-label).
**→** Fix contrast token, add visible focus rings, ensure no-JS content visibility, re-test with axe + keyboard-only.

### 12. Responsive & Mobile — 9/10
**✓** Clean reflow at all breakpoints; hamburger menu; stacked hero text (legible, centred); spec chips & CTAs stack; grids collapse sensibly; touch targets generous. (Verified live on mobile.)
**⚠** Hero on small screens is content-tall — fine now, but watch on very short viewports. Long page = lots of mobile scrolling (mitigate with section nav).
**→** Minor: test 320px and landscape; consider a sticky mini-CTA bar on mobile.

### 13. Performance & Technical — 7.5/10 *(re-measure on prod)*
**Theory:** Core Web Vitals (LCP, CLS, INP).
**✓** Static SSG (fast TTFB), `next/image` optimization, fonts via `next/font`, clean build, CLS-safe image sizing.
**⚠** The **hero eager-loads 5 large images (~4 MB)** — strong LCP/bandwidth cost, especially mobile/India networks (P1). No blur placeholders (flash of empty). Dev paint is slow (on-demand optimize) — *prod pre-optimizes, so re-measure*.
**→** Reduce hero to 3 slides or lazy-after-first with `blurDataURL` placeholders; serve AVIF; run Lighthouse on `npm run build && start` and target LCP <2.5s.

### 14. SEO & Discoverability — 9/10
**✓** Per-page titles/descriptions, OG + Twitter, **LocalBusiness + Product JSON-LD**, sitemap/robots, semantic headings, geo keywords, canonal URLs.
**⚠** Single H1 per page ✓; ensure heading order is strictly sequential; add FAQ schema (rich-result opportunity, P2); image filenames generic (`ext-05`) — minor.
**→** Add `FAQPage` JSON-LD; descriptive alt/filenames; later, location landing pages for local SEO.

### 15. Brand Consistency — 9.5/10
**✓** Voice, palette, type, the topographic motif, the SELECT·INSTALL·STAY ribbon, component library — all coherent. Forest/bronze discipline maintained.
**⚠** Favicon is still the **default Next.js icon** (P2 — breaks brand at the tab level). Logo is a recreated wordmark (good) but not the client's exact vector.
**→** Ship a branded favicon + the real SVG logo when supplied.

### 16. Emotional & Aesthetic — 9/10
**Theory:** Norman's 3 levels, aesthetic-usability effect, peak-end.
**✓** Visceral: gorgeous. Behavioural: easy. Reflective: "legacy / your land gives back" narrative is aspirational. Strong peak (hero) and strong end (final CTA over golden pod).
**⚠** The "human warmth" peak is missing (no people) — the design is beautiful but slightly *uninhabited*.
**→** People + a signature moment (e.g., the real Gatsby video) will lift the emotional ceiling.

---

## Part C — Scorecard

| # | Parameter | Score |
|---|---|---|
| 1 | Strategy & IA | 9.0 |
| 2 | Content & density | 8.5 |
| 3 | Visual hierarchy | 9.0 |
| 4 | Typography | 9.0 |
| 5 | Colour & theme | 8.0 |
| 6 | Imagery & illustration | 8.0 |
| 7 | Motion | 8.0 |
| 8 | Usability | 8.5 |
| 9 | Conversion | 9.0 |
| 10 | Trust | 7.5 |
| 11 | Accessibility | 7.0 |
| 12 | Responsive | 9.0 |
| 13 | Performance | 7.5 |
| 14 | SEO | 9.0 |
| 15 | Brand consistency | 9.5 |
| 16 | Emotional/aesthetic | 9.0 |
| | **Overall** | **8.4 / 10** |

**One-line verdict:** a genuinely premium, well-architected, high-converting site; the gap between *very good* and *exceptional* is **proof + people + polish on contrast/perf**.

---

## Part D — Prioritised roadmap

**P1 — do before launch**
1. Fix `--color-muted` → ~`#5b5c4d` (resolves the cream-contrast AA failure site-wide).
2. Strengthen hero text scrim for bright slides; verify white-on-image contrast.
3. Hero performance: 3 slides + `blurDataURL` placeholders (or lazy-after-first), AVIF.
4. Add real **proof**: hard numbers + named/located testimonials (+ photos if possible).
5. Add at least a few **people/lifestyle** images.

**P2 — high-value polish**
6. Visible `:focus-visible` rings + nav active state.
7. No-JS / faster reveal fallback for below-fold content.
8. Reassurance + honest urgency microcopy near CTAs; optional enquiry form.
9. Branded favicon; real SVG logo.
10. Locations visual (map/illustration); FAQ JSON-LD; section/scroll nav for the long page.

**P3 — delight**
11. Animated stat counters; hero pause control; gallery lightbox; subtle parallax depth.

---

## Part E — What to add (illustration / image / animation / content)
- **Images:** lifestyle/people shots, real installed pods, testimonial faces, a Locations map.
- **Illustration:** extend the exploded-diagram style to a Process graphic and an ROI/payback diagram; keep the topographic motif as the through-line.
- **Animation:** count-up stats; the real Gatsby MP4 in the hero; gentle parallax.
- **Content:** concrete trust numbers; one extra line of proof per "advantage"; risk-reversal microcopy.
- **Balance check:** not too text-heavy and not too image-heavy — it's well-judged; the only rebalance is *adding human/proof content*, not cutting.

---
**Related:** [Website Plan](07-website-plan-and-requirements.md) · [Brand Identity](05-brand-identity-and-design.md) · [Pod Pages Plan](09-pod-product-pages-plan.md)
