# 06 · Content Inventory

> **Updated:** 2026-06-28 · What content/media we already have vs. what we still need.

---

## Existing site pages (from sitemap.xml)
`/` · `/pods` · `/fulllist` · `/nomaddetails` · `/dojopoddetails` · `/gazepodetails` · `/gatsbydetails` · `/cocoondetails` · `/watchpoddetails` · `/nomadpage` · `/stays` · `/location` · `/book` · `/faq` · `/cp` (channel partner) · `/terms` · `/setbreakfast` · `/setlunch` · `/setdinner` · `/404`

> The current site loads pod renders via client-side JS, so a raw scrape only retrieved the logo + a few images (see below). The brochure was the better image source.

## Content we HAVE (documented)
- ✅ Brand story, taglines, voice — [01](01-brand-overview.md)
- ✅ Full pod lineup + per-pod copy + pricing + specs (Gazepod) — [02](02-products-and-pods.md)
- ✅ Product advantages, buying options, revenue models, 5-week process — [02](02-products-and-pods.md)
- ✅ 6 testimonials (below)
- ✅ Contact / NAP / socials — [01](01-brand-overview.md)
- ✅ Locations list — [04](04-geography-and-locations.md)
- ✅ Brand palette/type/motifs (estimated) — [05](05-brand-identity-and-design.md)

### Testimonials (verbatim)
- **Ravi Chabbra** — "Absolutely love the open, airy design… build quality is top-notch."
- **Prasad Gadgil** — "Craftsmanship is incredible… perfect for work or relaxation."
- **Ritika Keswani** — "Sleek, modern, and built to last."
- **Amar A.** — "Stunning… friendly and timely service."
- **Gaurang** — "Perfect mix of style and practicality."
- **Arushi Agarwal** — "Beautifully made… great sense of space."

## Media we HAVE (in `/media`)
| Location | What | Use |
|---|---|---|
| `media/website/brochure-extracted/` | **38 curated pod renders** (cliff pod, hillside resort, Gatsby/Nomad/Curv/Flo etc.) | Build + gallery (interim) |
| `media/website/general/` | Logo (transparent + alt), a few real photos, some stock/inspo | Logo = use; rest = reference |
| `media/website/{gatsby,nomad,gazepod}/` | Same logo/shell set (per-pod renders weren't in raw HTML) | Reference |
| `media/brochures/NOMAD.pdf` | Master brand brochure (19 pp) | Source of truth |

> `_fragments/` and `_dupes/` inside `brochure-extracted/` are set aside (icons/contour bits & duplicates) — ignore for the build.

## Content we still NEED (→ see checklist in [07 §8](07-website-plan-and-requirements.md))
- ⭐ **Gatsby** interior + exterior photos (for hero + spotlight + video)
- Gatsby **video** (or go-ahead to generate from stills)
- **Vector logo (SVG)** + confirmed exact brand colours/fonts
- Higher-res, clearly-labelled per-pod photos (so each model card uses the *right* render)
- Floor plans / dimensions for pods beyond Gazepod
- Real **built/installed** pod & happy-customer photos (trust)
- Final sign-off on copy, pricing, testimonials, contact

---
**Related:** [Media & Upload Guide](08-media-and-upload-guide.md) · [Website Plan](07-website-plan-and-requirements.md)
