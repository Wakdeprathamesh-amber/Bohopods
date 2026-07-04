# 11 · Change, Modification & Enhancement Report

> Actionable build-list derived from the [UX/UI audit](10-ux-ui-design-audit.md). Includes the **pod-page gallery placement** decision and a **text → visual (image/diagram/infographic)** opportunity pass.
> **Tags:** `[Now]` I can build without new assets · `[Asset]` needs client photos/data/decision · severity **P1** (pre-launch) / **P2** (high-value) / **P3** (delight).
> **Updated:** 2026-06-28

---

## 1. Global / site-wide changes
| # | Change | Why (principle) | Sev | Build |
|---|--------|-----------------|-----|-------|
| G1 | Darken `--color-muted` → `#5b5c4d` | Fixes measured **4.2:1 → ~5.3:1** muted-on-cream (WCAG AA) site-wide | P1 | `[Now]` |
| G2 | Strengthen hero top scrim (+ subtle text-shadow) | White hero text dips on bright slides (contrast) | P1 | `[Now]` |
| G3 | Visible `:focus-visible` ring tokens on links/CTAs/inputs | Keyboard a11y (WCAG 2.4.7) | P2 | `[Now]` |
| G4 | Reassurance microcopy under primary CTAs ("Free site visit · No obligation · Replies in minutes") | Risk-reversal, Fogg ability↑ | P2 | `[Now]`* |
| G5 | Honest urgency (e.g., "limited install slots this season") | Cialdini scarcity | P2 | `[Asset]` confirm truth |
| G6 | Branded favicon + real SVG logo | Brand consistency at tab level | P2 | favicon `[Now]`, logo `[Asset]` |
| G7 | No-JS / earlier reveal fallback for below-fold content | Resilience + SEO visibility | P2 | `[Now]` |
| G8 | `FAQPage` JSON-LD | Rich-result SEO | P2 | `[Now]` |
| G9 | Count-up animated stats | Delight, draws eye to proof | P3 | `[Now]` |

\*G4 wording is generic-safe; confirm "replies in minutes" is realistic.

---

## 2. Homepage — section-by-section
| Section | Verdict | Change | Sev | Build |
|---|---|---|---|---|
| Hero | Keep, optimise | 3 slides + `blurDataURL` + AVIF (perf/LCP); swap to real MP4 later | P1 perf | `[Now]` (video `[Asset]`) |
| Trust bar | Strengthen | Add 1–2 **hard numbers** beside platforms | P2 | `[Asset]` |
| Why Boho | Keep | Ensure format differs from Advantage (it does) | — | — |
| **How it works** | **Upgrade to visual** | Replace plain 5-week text with a **timeline infographic** (see §4) | P2 | `[Now]` |
| The Pods | Keep | — | — | — |
| Gatsby spotlight | Minor | Add "View full details →" link to `/pods/gatsby` | P3 | `[Now]` |
| **Comparison** | Enhance | Add a **time-bar** for "30–45 days vs 1–3 years" (§4) | P3 | `[Now]` |
| Product Advantage | Keep (icons) | — | — | — |
| **Ownership / ROI** | **Upgrade to visual** | Add an **ROI payback chart** (break-even ~1.5 yr) (§4) | P2 | `[Now]` |
| Experiences | Keep | — | — | — |
| About | Add humanity | Add a real-build / people image | P1 | `[Asset]` |
| **Locations** | **Upgrade to visual** | Replace flat chips with a **stylised map + pins** (§4) | P2 | `[Now]` |
| Gallery | Keep | Add 1–2 lifestyle (people) shots | P1 | `[Asset]` |
| Testimonials | Strengthen | Names + locations + faces | P1 | `[Asset]` |
| FAQ | Minor | Add "Still have questions? WhatsApp us" footer CTA | P3 | `[Now]` |
| Final CTA | Keep | — | — | — |
| Long-page nav | Add | Optional scroll-progress / section dot-nav (16 sections) | P3 | `[Now]` |

---

## 3. Pod pages — section order & GALLERY PLACEMENT

### 3a. Gallery placement — **move it UP** ⭐ (the answer to your question)
**Current order:** Hero → Overview → Area-circles → Spec strip → Included+Features → **Gallery (pos. 6)** → Best-used+Pricing → FAQ → Explore → CTA.

**Problem:** for a *visual, high-desire* product, the gallery sits **too late** — the buyer reads ~4 fact/text blocks before seeing more of the pod. That inverts how people actually shop visual products (see first, justify later = System 1 → System 2; "show, don't tell").

**Recommended order (move Gallery to position 3, right after Overview):**
1. Hero (1 image + key chips + CTA)
2. Overview (the story)
3. **Gallery** ⬅ *immersive imagery early*
4. Area-stat circles
5. Spec strip ("At a glance")
6. What's included + Signature features
7. Best used as + Pricing + ROI
8. FAQ
9. Explore the range
10. Final CTA

**Why this is right (principles):** Picture-Superiority Effect, e-commerce PDP convention (Jakob's law — gallery is expected near the top), emotion-before-detail, and it **breaks the text-heavy middle** so facts don't arrive as a wall. Severity **P1**, `[Now]`.

*Future option:* a **sticky gallery (left) + scrolling details (right)** two-column layout, like premium real-estate/PDPs — keeps imagery in view the whole scroll. `[Now, larger effort]`.

### 3b. Other pod-page changes
| # | Change | Why | Sev | Build |
|---|--------|-----|-----|-------|
| P1 | Gallery: larger/immersive + **lightbox/zoom** | Visual product; let people inspect | P2 | `[Now]` |
| P2 | Add **floor-plan / layout diagram** per pod | Spatial info is best *shown* (§4) | P2 | `[Now]` Nomad+Gatsby; `[Asset]` others |
| P3 | "What's included" → **icon grid** | Scannability (vs plain list) | P3 | `[Now]` |
| P4 | Nav **active state** on current pod | Orientation feedback (Nielsen) | P3 | `[Now]` |
| P5 | Real photos for **Cocoon / WatchPod** (placeholders now) | Accuracy/trust | P1 | `[Asset]` |
| P6 | "Download spec / brochure" link on pod page | Lead capture / utility | P3 | `[Now]` |

---

## 4. Text → Visual opportunities (only where principle-supported)
*Basis: Dual-Coding Theory, Picture-Superiority Effect, Tufte data-ink (numbers→charts), spatial-info→diagrams, cognitive-load reduction. I can build all of these as on-brand inline SVG.*

| Where | Currently | Proposed visual | Principle | Build |
|---|---|---|---|---|
| **Process / How it works** | 5 text "Week N" labels | **Horizontal timeline infographic** (connected nodes + icons) | Process is inherently sequential/visual | `[Now]` ⭐ |
| **Ownership / ROI** | "Illustrative ROI" sentence | **Payback chart** — cumulative rent vs investment, break-even marker | Numbers → chart (data-ink); makes the money *felt* | `[Now]` ⭐ |
| **Locations** | Text chips on forest | **Stylised India/Maharashtra map** with location pins | Spatial data → map; far stronger than chips | `[Now]` ⭐ |
| **Comparison** ("time") | "30–45 days" vs "1–3 years" text | A small **two-bar time comparison** | Magnitude → length (pre-attentive) | `[Now]` |
| **Pod layout** | (none) | **Floor-plan diagram** from dimensions | Spatial → diagram | `[Now]` where data |
| Pod "What's included" | bullet list | **Icon grid** | Scannability, picture-superiority | `[Now]` |
| Stats band | numbers | **count-up** on scroll | Motion draws attention | `[Now]` |

**Where to KEEP text (do *not* over-visualise):**
- Emotional/concept lines ("Owning land is the beginning of a legacy", "Make your land pay for itself") — typography *is* the design here; an image would dilute it.
- **Testimonials** — quotes belong as text (add *faces*, not infographics).
- **FAQ** — the accordion is the correct pattern.
- Hero — already image-led; don't crowd it.

**Net read on "too much text vs image":** balanced and slightly image-led (correct). The opportunity is **converting 3–4 *number/process/spatial* text blocks into diagrams** (above) — that's where visuals genuinely beat words — not adding decorative images.

---

## 5. Needs from you (assets / decisions)
1. **People & real-build photos** (lifestyle on deck, a host/family, installed pods) — biggest emotional/trust lift.
2. **Trust numbers** (pods delivered, since-year, owners) + **testimonial names/locations/photos**.
3. **Confirm prices & GST**; confirm any **urgency** claim before we state it.
4. **Real SVG logo**; real photos for **Cocoon/WatchPod**.
5. (Optional) **Gatsby MP4** for the hero.

---

## 6. Suggested implementation order
- **Batch 1 `[Now]` P1:** contrast token (G1) · hero scrim + perf (G2, Hero) · **gallery move-up** (3a) · focus rings (G3).
- **Batch 2 `[Now]` P2:** Process **timeline infographic** · **ROI chart** · **Locations map** · CTA microcopy (G4) · FAQ CTA + JSON-LD (G8) · favicon (G6).
- **Batch 3 `[Now]` P3:** count-up stats (G9) · gallery lightbox · floor-plan diagrams · included icon-grid · nav active state · comparison time-bar.
- **Batch 4 `[Asset]`:** people/proof content, real Cocoon/WatchPod photos, hard numbers, logo, MP4.

---
**Related:** [UX/UI Audit](10-ux-ui-design-audit.md) · [Pod Pages Plan](09-pod-product-pages-plan.md) · [Brand Identity](05-brand-identity-and-design.md)
