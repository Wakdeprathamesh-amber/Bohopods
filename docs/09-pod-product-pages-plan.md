# 09 · Pod Product Pages — Content, Theme & Build Plan

> **Phase 2.** Individual product pages for each pod. Content sourced from the **live site** (bohopods.com detail pages) + the brochure. Prices on the live site are redacted — figures below are from the homepage range and **must be confirmed with the client**.
> **Updated:** 2026-06-28

---

## 0. Locked decisions (2026-06-28)
- **Taxonomy** (best-practice UX, two buckets on `/pods`): **🌿 Retreat & Stay Pods** (Nomad, Dojopod, Gazepod, Gatsby; + Quadpod/Flo/Curv/EcoPod/2-3BHK as data lands) and **🛠️ Work & Utility Pods** (Cocoon, WatchPod; + Looie). Homepage leads with retreat pods; "View all pods →" opens the categorised catalogue.
- **Pricing:** show **"from ₹X"** wherever the live site lists it (homepage range does) + exact base & add-ons where detail pages give them (Dojopod ₹25L, Gazepod ₹28L, +₹7.99L bedroom). Where unpublished, **hide and route to WhatsApp**. Never invent a number.
- **Scope:** full pages now for pods with complete data — **Gatsby, Nomad, Dojopod, Gazepod, Cocoon, WatchPod**. The rest appear as catalogue cards (copy + from-price) and graduate to full pages as specs/photos arrive.
- **Templates:** advanced extras (video walkthrough, cross-pod compare table, dual rental/home framing) → **backlog**, refine together later.
- **Brochure:** add an on-site **interactive flip-book embed** + **"Download brochure"** (see §9); full content mined (all 19 pages).
- **Spec pattern:** adopt the brochure's **area-stat circles** (Ground coverage · Built-up · Usable carpet · Carpet) on pod pages where data exists.

## 1. Role in the buyer journey
The homepage creates desire and trust and pushes "talk to us." **Pod pages convert a *specific* interest into a *specific* WhatsApp enquiry.** Each page must (a) make *this* pod feel desirable, (b) answer "is it right for me / my plot / my budget," and (c) drive a pod-specific WhatsApp CTA.

## 2. Product taxonomy (clarified — the live naming is tangled)
| Pod | Family | Live page | From* | One-liner |
|---|---|---|---|---|
| **Gatsby** ⭐ | Signature (flagship) | ✅ | ₹35L | The Lux version — fully loaded |
| **Curv** | Signature | — | ₹25L | Focused vistas, elegant curves |
| **Flo** | Signature | — | ₹28L | Fluid lines, unbound space |
| **Gazepod** | Quad-pod family | ✅ | ₹28L | Quad pod + a big gazebo |
| **Dojopod** | Quad-pod family | ✅ | ₹25L | The no-frills quad pod |
| **Quadpod** | Quad-pod (platform) | — | ~₹22–25L? | The base quad platform |
| **Nomad** | Retreat | ✅ | ₹20L | Compact solo/digital-nomad retreat |
| **EcoPod** | Retreat (entry) | — | ₹15L | Entry-level premium pod |
| **2-BHK** | Homes | — | ₹65L | Family-scale modular home |
| **3-BHK** | Homes | — | ₹95L | Largest modular home |
| **Cocoon** | Utility — **work pod** | ✅ | ₹5L | Sound-proof work/meeting pod for cafés & offices |
| **WatchPod** | Utility | ✅ | ₹5L | Watchman cabin, built like an art piece |
| **Looie** | Utility | — | ₹7L | Compact restroom/utility pod |

\*Starting prices to confirm. **Key clarifications:** "Quad Pod" is a *platform* — **Dojopod** (no-frills) and **Gazepod** (+gazebo) are built on it. **Cocoon is a commercial work pod**, not a glamping retreat — its page needs a different angle (cafés/offices/co-working). **WatchPod** is a utility/security cabin.

**Recommended `/pods` listing groups:** Signature (Gatsby, Flo, Curv) · Quad family (Quadpod, Dojopod, Gazepod) · Retreats (EcoPod, Nomad) · Homes (2-BHK, 3-BHK) · Utility & Work (Cocoon, WatchPod, Looie).

## 3. URL & architecture
- **Routes:** `/pods` (listing) + `/pods/[slug]` (detail) — Next.js dynamic route, statically generated via `generateStaticParams` (stays static, no backend).
- **Data:** new `lib/pods.ts` with a rich `Pod` model — one template renders all pods from data, so they stay consistent and new pods are trivial to add.
- **Links:** homepage Pods cards + footer + listing all deep-link to `/pods/[slug]`; every pod page deep-links back to the range and to WhatsApp.

```ts
type Pod = {
  slug; name; family; flagship?;
  tagline; heroLine; overview;            // copy
  image; gallery[];                       // media
  specs: { room; bath; deck; total; install; sleeps; lifespan };
  included[]; features[]; useCases[];     // value
  pricing: { from; addons[]; gstNote };   // money
  roi?;                                   // income models only
  faqs[]; seo: { title; description };
};
```

## 4. The product-page template (every pod)
1. **Breadcrumb** (Home / Pods / Pod) + "← Back to the range".
2. **Pod hero** — full-width signature render; pod name (display) + tagline; **spec chips** (total area · footprint · sleeps · install time); "from ₹X"; primary CTA **Enquire on WhatsApp** + secondary **Book a site visit**.
3. **Overview / the story** — 2–3 short paras: the feeling + what it is + who it's for.
4. **Spec strip** — Room · Bathroom · Deck · Total built · Installation area · Capacity · 30+ yr lifespan.
5. **What's included** — turnkey fit-out list (bed, cassette AC, wardrobe, false ceiling, plumbing, septic, electrical, labour…) so buyers see it's complete.
6. **Signature features** — this pod's unique highlights.
7. **Gallery** — exterior + interior (lightbox).
8. **Floor plan / layout** — simple dimension diagram (we can render an SVG from the dims).
9. **Best used as** — use cases (weekend home / Airbnb unit / studio / micro-resort / work pod).
10. **Pricing & options** — base (excl. GST noted) · add-ons (+bedroom ₹7.99L) · finance (EMI / lease / revenue-share) · "from ₹X".
11. **ROI snippet** — income models only: illustrative nightly rate → payback.
12. **Explore the range** — sibling mini-cards (smart up/down-sell, e.g., Dojopod ↔ Gazepod ↔ Gatsby).
13. **Pod-specific FAQ** — 3–5.
14. **Final CTA band** — "Make the [Pod] yours" → WhatsApp (pod-prefilled) + phone.
15. **SEO** — title, meta, **Product JSON-LD** (name, image, brand, offers), OG image.

## 5. Per-pod content

### ⭐ Gatsby — *the flagship*
- **Tagline:** "The New Era of Modular Living" · hero line: *"Fully loaded. Utterly effortless."*
- **Overview:** The Lux version of our pods — every bell and whistle over the premium build: built-in Bluetooth speakers, projector, slim-profile sliding windows, manual insect blinds, and top-of-the-line materials. A spacious living + bedroom opening to a generous covered sit-out.
- **Specs:** Room 300 sq ft (15×20) · Bath 150 sq ft (15×10) · Covered sit-out 200 sq ft (10×20) · **Total 650 sq ft** · Lifespan 30+ yrs.
- **Signature features:** Bluetooth speakers · projector · slim sliding glass · insect blinds · premium finishes.
- **Best for:** the headline weekend home; a premium, high-ADR rental.
- **Price:** from **₹35L** (confirm; excl. GST). · **Accent:** bronze "flagship."
- **SEO:** "Gatsby — Luxury Prefab Cabin (Flagship) | Boho Pods".

### Nomad — *Work · Rest · Roam*
- **Tagline:** "Where Infinite Landscapes Meet Absolute Focus."
- **Overview:** A perfect micro-resort unit for solo travellers and long-stay digital nomads — tucked into a garden, perched by a pool, or overlooking a mountain. Proof that true luxury doesn't need a big footprint, just intelligent design.
- **Specs:** Room 150 sq ft (15×10) · Bath 100 sq ft (10×8) · Deck 80 sq ft (20×4) · **Install 500 sq ft** · Sleeps 1–2 (queen or single).
- **Included:** curved fixed windows · queen/single bed · bedside tables · manual curtains · false ceiling · cassette AC · wardrobe · electricals · septic tank · bathroom fixtures · plumbing · labour.
- **Best for:** compact retreat, studio, micro-resort cluster.
- **Price:** from **₹20L**. **SEO:** "Nomad — Compact Prefab Retreat Pod | Boho Pods".

### Dojopod — *the no-frills Quad Pod*
- **Tagline:** "It's everything you need and nothing you don't."
- **Overview:** Built on a high-quality mild-steel framework with industrial-grade materials that last 30+ years — a no-frills cabin with minimal automation, purpose-built for extreme-weather locations.
- **Specs:** Room 270 sq ft (15×20) · Bath 150 sq ft (15×10) · Deck 80 sq ft (15×7) · **Install 1,000 sq ft** · 1 bed / 2 guests (+bedroom add-on).
- **Included:** king bed · bedside tables · manual curtains · false ceiling · cassette AC · wardrobe · electricals · septic · bathroom fixtures · plumbing.
- **Best for:** glamping venues, remote/harsh-climate sites, durability-first buyers.
- **Price:** from **₹25L** · **+ bedroom ₹7.99L**. **SEO:** "Dojopod — Rugged Quad Prefab Cabin | Boho Pods".

### Gazepod — *Quad Pod + gazebo*
- **Tagline:** "Seamless spaces, amplified by the outdoors."
- **Overview:** Built over the robust quad pod, the Gazepod adds a large attached gazebo and an expansive deck — for those who want to live outdoors as much as in.
- **Specs:** Room 280 sq ft (15×20) · Bath 150 sq ft (15×10) · **Deck 325 sq ft (10×20)** · **Install 1,500 sq ft.**
- **Best for:** entertainers, big-view plots, premium homestays.
- **Price:** from **₹28L** · **+ bedroom ₹7.99L**. **SEO:** "Gazepod — Quad Prefab Cabin with Gazebo | Boho Pods".

### Cocoon — *the work pod* (different angle!)
- **Tagline:** "Quiet, on demand."
- **Overview:** Our smallest pod — a sound-controlled private space for video calls, meetings and focused work. Designed to boost footfall in cafés and add private rooms to commercial spaces.
- **Specs:** Room 15 sq ft (4×4) · **Install 20 sq ft** · sound insulation · 2 electric sockets.
- **Best for:** cafés, offices, co-working, lobbies, campuses. *(Page should sell to businesses, not homeowners.)*
- **Price:** from **₹5L**. **SEO:** "Cocoon — Soundproof Work Pod for Cafés & Offices | Boho Pods".

### WatchPod — *utility as art*
- **Tagline:** "The humble cabin, beautifully reimagined."
- **Overview:** A modern take on the watchman's cabin — industrial-grade materials engineered for the Indian subcontinent's harshest weather, with the look and feel of an art piece.
- **Specs:** Room 50 sq ft (5×10).
- **Best for:** security/watchman cabin, gate house, compact site office, ticket booth.
- **Price:** from **₹5L**. **SEO:** "WatchPod — Designer Watchman Cabin | Boho Pods".

### Framework entries (copy from brochure; need specs + photos from client)
- **EcoPod** (₹15L) — entry-level premium pod; the easiest way into a Boho Pod. *Need specs.*
- **Quadpod** (~₹22–25L?) — the base quad platform; "Seamless Spaces, Amplified Living," massive covered deck. *Need price + specs.*
- **Curv** (₹25L) — "Focused Vistas, Elegant Curves"; curvilinear roofline + extended front deck to frame the view. *Need specs.*
- **Flo** (₹28L) — "Fluid Lines, Unbound Space"; curves-and-angles footprint + expansive deck. *Need specs.*
- **Looie** (₹7L) — compact restroom/utility pod. *Need specs + use case.*
- **2-BHK** (₹65L) / **3-BHK** (₹95L) — family-scale modular homes. *Need specs, layouts, photos.*

## 6. Design & theme
- Same Scandinavian-organic system and components (CTA, Container, Section, Reveal, Topo). Pod hero uses that pod's signature render; **Gatsby** carries the bronze "flagship" accent; topographic motif behind the spec strip.
- WhatsApp uses `waMsg.pod(name)` pre-fill already in `lib/site.ts`.
- Consistent voice: warm, confident, a touch poetic — same as the homepage.

## 7. What we need from the client (per pod)
1. **Real photos** (exterior + interior) → `media/pods/<slug>/`
2. **Confirmed prices** (live site redacts them) + GST handling
3. **Floor plans / exact dimensions** confirmation
4. Any **pod-specific features/inclusions** to highlight

## 8. Recommended build order
1. `/pods` listing + `/pods/[slug]` template, with **Gatsby** as the first complete page (sets the bar).
2. **Nomad, Dojopod, Gazepod** (full data available).
3. **Cocoon + WatchPod** (adjust template copy for their different use cases).
4. **EcoPod, Quadpod, Curv, Flo, Looie, 2-/3-BHK** as specs & photos arrive.

## 9. Brochure — on-site & downloadable
- **Interactive flip-book:** embed the Heyzine flip-book (`https://heyzine.com/flip-book/2187e889b9.html`) via iframe on a `/brochure` page and a homepage "Flip through our brochure" strip.
- **Download:** a "Download brochure" button. Master PDF is ~98 MB (too heavy for web) → compress to a ~5–10 MB web version, or link Heyzine's own download.
- **Lead-gen (optional, later):** gate the download behind a WhatsApp tap ("Get the brochure on WhatsApp") to capture intent.
- **Content mined:** all 19 pages — brand story, why-choose, ownership, buying options, product advantage, the full pod lineup, and the detailed Nomad spread.

## 10. Nomad — full spec (brochure-grade benchmark, build first)
The brochure's Nomad deep-dive gives us enough to make this the *reference* product page.
- **Positioning:** "Where Infinite Landscapes Meet Absolute Focus" — the work-from-anywhere sanctuary.
- **Area:** Ground coverage **630 sq ft** · Built-up **580 sq ft** · Usable carpet **390 sq ft** · Carpet **388 sq ft** *(render as the four brochure "area circles")*.
- **Plan:** Study & Rest 15'×10' · Toilet 10'×8' · 4'-wide deck + entry ramp · sweeping curved roofline.
- **Construction:** 8" LGSF frame walls with aluminium-cladded panels · seamless **12 mm curved polyplast glass** on U-channel aluminium frame · SPC flooring · PVC soffit wall panels.
- **Turnkey fit-out:** single bed 6'6"×3'6" · upholstered headboard · study table · wardrobe (flush door) · blackout drapes · cassette AC · rain shower · ceramic full-body tiling · **open-to-sky planter inside the toilet** · external planter bed · outdoor coffee table + seating.
- **Materials palette (brochure):** warm wood → cream → sage → olive → taupe → charcoal (matches our site tokens ✔).
- **Imagery:** real Nomad renders (beach, misty-mountain, interior bed+study, rain-shower bath) already in `media/website/brochure-extracted/`.
- **From ₹20L** (live "from"; confirm).

---
**Related:** [Products & Pods](02-products-and-pods.md) · [Website Plan](07-website-plan-and-requirements.md) · [Media & Upload Guide](08-media-and-upload-guide.md)
