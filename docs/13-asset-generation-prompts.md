# 13 · Asset Generation Prompt Pack (Higgsfield / Midjourney / Runway / Kling / Veo)

> Ready-to-run prompts for the assets the site is missing (people/lifestyle + hero video). Generate, drop into the folder listed, tell me — **integration slots are already built.**
> Match reference: the real Gatsby renders in `public/images/gatsby/` (curved roofline, timber slats, floor-to-ceiling glass, deep deck). Attach `ext-05.jpg` / `ext-07.jpg` as image reference wherever the tool allows.
> **Global style suffix (append to every image prompt):** `photorealistic architectural photography, golden hour, warm natural grade, soft volumetric haze, 35mm, shallow depth, editorial calm, muted sage/cream/forest palette, no oversaturation, no text, no watermark`

---

## A. Lifestyle stills (the "people" gap) → drop in `media/lifestyle/`
1. **Deck coffee (hero lifestyle)** — *"Indian couple in their 30s in cozy knitwear laughing over morning coffee on the wooden deck of a luxury prefab glass cabin with curved roof, misty Western Ghats valley behind, steam rising from mugs"* + suffix. (Slots: Why Boho, Gallery.)
2. **Reading by glass wall** — *"Woman reading in a window-side lounge chair inside a warm timber cabin, floor-to-ceiling curved glass, monsoon rain outside, cozy interior lamplight"* + suffix. (Gallery, Gatsby page.)
3. **Fire-pit evening** — *"Four friends around a sunken stone fire pit at dusk beside a glowing glass pod on a cliff over the sea, string of warm light, blue hour"* + suffix. (Gallery, Final CTA background alt.)
4. **Family arrival** — *"Family with a child stepping onto the deck of a prefab cabin, host welcoming them, luggage, golden afternoon, palms and hills"* + suffix. (Experiences banner, About slot.)
5. **Work-from-pod (Nomad)** — *"Man on a video call at a small study desk inside a compact curved-glass pod, mountains through glass, laptop, coffee"* + suffix. (Nomad page.)

## B. Hero video (replaces the slideshow) → drop in `media/hero-gatsby/video/hero.mp4`
**Image-to-video** from `ext-07.jpg` (mountains) or `ext-05.jpg` (deck):
- *"Slow cinematic dolly-in toward the glass cabin, gentle mist drifting through the valley, warm interior lights glowing, leaves swaying subtly, golden hour, locked exposure, no people, no camera shake, seamless loop"*
- **Specs:** 1920×1080 (and a 720p copy), H.264 MP4 + WebM, 8–15 s, loopable, muted, target < 8 MB. I'll wire it with poster frame + reduced-motion fallback the moment it lands.

## C. Per-pod video loops (pod-page heroes, later) → `media/pods/<slug>/video/`
Same treatment per pod: 6–8 s ambient loop (mist / light shift / water ripple).

## D. Testimonial portraits (only if client can't supply real ones — real is always better)
*"Warm natural-light portrait of a smiling Indian homeowner in their 40s, soft cream backdrop, editorial, genuine"* — but **prefer real customer photos**; AI faces on testimonials can erode trust if detected. Recommendation: use real faces or none.

## E. What NOT to generate
- Pod exteriors/interiors (we have 27 real renders — consistency beats novelty)
- Diagrams/infographics (hand-built SVG, already live: timeline, ROI chart, map)
- Logos/icons (brand assets must come from the client)

---
**Workflow:** generate → drop file in the folder above → tell me → I curate, optimize (AVIF/WebP or compressed MP4), and wire into the built slots.
