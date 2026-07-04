# 15 · "WALK IN" — The Gatsby Continuous Walkthrough Film
## Director's Plan, Cinematography Bible & Production Pipeline

> **Supersedes** the slideshow-style hero loop from doc 14 (that cut survives as the fallback).
> **Goal:** one apparently-unbroken cinematic camera journey through the Gatsby — arrival → entry → living/kitchen → bedroom → bath → central garden → rise through the roof → deck → farewell — indistinguishable in feel from a high-end real-estate film shoot.
> **Core technique:** Kling 3.0 start-frame → end-frame chaining. Every segment is generated as a camera journey *between two fixed anchor frames*; the next segment starts on the exact frame the previous one ended. Joins are pixel-continuous or hidden on thresholds. **This is a film, not animated stills.**
> **Deliverables:** (A) 80–90s master walkthrough (brand film), (B) 25s hero loop recut, (C) 9:16 vertical recut.
> **Updated:** 2026-07-04 · Sources: `public/images/gatsby/`, generated connective stills in `media/hero-gatsby/anchors/`

---

## 1 · The concept

**Title:** *WALK IN — one unbroken dawn at the Gatsby.*

One camera, one journey, one day. The camera descends from the misty ridge, walks to the door, the door opens for it, and it moves through the pod the way a guest would — pausing where a guest would pause — until the garden at the pod's heart lifts it out through the roof and the day lets it go golden over the deck. The viewer never feels a cut.

**Why this reads as "real shoot":** luxury property films are *not* single takes — they are 10–15 disciplined moves cut on doorways, turns and pans. What sells continuity is (1) constant forward motivation, (2) consistent screen direction, (3) speed discipline, (4) one light-arc across the film. All four are engineered below.

---

## 2 · Cinematography bible (applies to every segment)

| Discipline | Rule |
|---|---|
| **Virtual lens** | Interiors 35mm equiv at eye level (~1.6m). Aerials 24mm. Never ultra-wide (flattens depth), never long (kills space). |
| **Walk speed** | Half natural walking pace: ~0.35–0.4 m/s. If the viewer can't look around the room while moving, it's too fast. |
| **Push-ins** | 0.5–1m of travel per 4–6s beat. |
| **Orbits** | Max 60–90° arc, ≤ 12°/s, subject dead-center, only in the open-plan space (clearance rule). Never full 360° (forces the model to invent unseen walls). |
| **Drone** | 3–5 m/s, low altitude, horizon level, two aerial beats maximum at each end of the film. |
| **Easing** | Every move eases in and out — long Bezier feel, zero linear velocity. The final 8–10 frames of any segment ease toward stillness (protects the chain-join). |
| **Frame rate / shutter** | 24fps, 180°-shutter motion blur feel. Locked exposure within a segment; exposure only shifts across thresholds (motivated). |
| **Screen direction** | Forward motion + clockwise yaw throughout (entry → living is a right turn; living → bedroom returns through frame-left, mirroring the floor plan). Never reverse screen direction mid-act. |
| **Camera "weight"** | Prompt for gimbal-smooth but *breathing* movement — micro-drift, not shake. Sterile = CG; tremor = amateur. |
| **Composition** | Rule of thirds; leading lines down the corridor axis; doorways as natural frames-within-frame; subjects weighted right-of-center in hero-recut segments (site headline sits left). |

**Universal prompt suffix (every segment):**
`single continuous take, no cuts, gimbal-smooth camera with subtle organic drift, 35mm lens, eye level, static architecture, glass and window frames rigid and undistorted, all interior furniture and finishes locked and consistent, no people, photorealistic luxury architectural film, 24fps, 180-degree shutter motion blur, locked exposure, ease-in ease-out camera motion`

**Universal negative:** `warping walls, melting glass, morphing furniture, extra rooms, invented objects, people, text artifacts, flicker, exposure pumping, camera shake, fast motion, fisheye distortion`

---

## 3 · The light arc (the film's clock)

One dawn-to-dusk day compressed into 90 seconds. The grade never jumps — it *walks*:

| Act | Segments | Light | Palette |
|---|---|---|---|
| I ARRIVE | S1–S3 | Cool blue-grey mist, sun below ridge, soft omnidirectional | Sage, slate, cool haze |
| II DWELL | S4–S7 | Neutral-warm morning, low sun shafts raking the floor, dust in light | Cream, timber, living green |
| III BREATHE | S8–S10 | Warm mid-golden, courtyard top-light, first amber edges | Gold on green |
| IV GLOW | S11–S12 | Peak golden hour → early blue-hour dusk, practicals and soffit lights on | Amber against deep sage |

Practicals (pendants, orb lamp, deck soffits) come on progressively from S7 onward — light "hands over" from sun to house, which is the emotional turn of the film.

---

## 4 · Anchor frames (generate & approve BEFORE any video)

Chaining requires a fixed image at both ends of every segment. Existing renders cover most; seven connective stills must be generated first (nano_banana_pro / seedream, using existing renders as style+material references — World A misty-green-hills landscape ONLY):

| ID | Anchor | Source |
|---|---|---|
| A | High aerial wide — misty ridgelines, pod small on its terrace, dawn | generate (refs: ext-08, ext-10 hills) |
| B | Ground-level approach — stone path, portal mid-distance | generate (refs: ext-10) |
| — | Portal close | **ext-10 (existing)** |
| — | Corridor | **int-01 (existing)** |
| — | Corridor→kitchen turn | **int-10 (existing)** |
| — | Kitchen/living w/ courtyard doors | **int-06 (existing)** |
| — | Living money frame | **int-05 (existing)** |
| — | Bedroom from courtyard axis | **int-16 (existing)** |
| — | Bedroom window wall | **int-14 (existing)** |
| C | Bathroom — terrazzo, timber, skylight shaft | generate (refs: exploded-view bath zone, int-15 materials) |
| D | Inside the courtyard, low among bamboo, looking along canes | generate (refs: int-04, int-16 courtyard) |
| E | Aerial directly above the roof aperture, courtyard green glowing in the void | generate (refs: ext-exploded roof, A) |
| F | Deck at golden hour — pool table, loungers, hills (NOT sea) | generate (refs: ext-03 contents transposed to World A, int-05 valley) |
| G | Dusk farewell wide — pod glowing amber in blue-hour hills | generate (grade-shifted variant of A) |

**Gate:** all seven anchors are reviewed (and shown to you) before a single video credit is spent. Anchors are the film's set — get the set right first.

---

## 5 · THE SHOT LIST — 12 chained segments (~87s master)

Format: **camera placement → movement → speed → rotation → in-shot action → light → seam-hide.**

---

**S1 — "Above the Clouds"** · anchors A → B · 0:00–0:08 (8s)
- **Placement:** drone, ~60m above the valley, 24mm, horizon level, pod center-right small.
- **Move:** descending forward glide, 4 m/s easing to 2 m/s; gentle -15° tilt easing toward level as we near the ridge.
- **Action beats:** mist rivers sliding between ridge layers; birds cross far frame at 5s.
- **Light:** pre-dawn blue-grey; the pod's entry light is the only warm pixel — the eye's destination.
- **Seam out:** ends settled on anchor B's exact ground-approach composition (altitude reaches eye level in the last 2s — the drone "lands into" the walk).

**S2 — "The Walk Up"** · anchors B → ext-10 · 0:08–0:15 (7s)
- **Placement:** eye level on the stone path, 35mm.
- **Move:** walking dolly 0.4 m/s, dead-level, path leading-lines to the portal.
- **Action:** grass plumes brushing frame edges L/R; mango-leaf shadows breathing on the slats; the BOHO PODS · GATSBY disc resolves legible in the final 2.5s (text locked, Kling 3.0 native-text consistency).
- **Light:** first sun hits the ridge behind; portal still in cool shade — warm interior glow visible through glass.
- **Seam out:** ends exactly on the ext-10 composition (our strongest frame — also the film's poster).

**S3 — "The Door Opens"** · ext-10 → int-01 · 0:15–0:23 (8s)
- **Placement/Move:** continue the same axis push at 0.3 m/s — zero hesitation at the join (motion continuity is the seam's disguise).
- **Beats (timed in prompt):** at 2s the glass entry door slides open silently, left-to-right; at 4s we cross the threshold — exposure dips half a stop in the portal's shade (motivated exposure shift = hidden join); at 6s the corridor's far glass wall blooms ahead.
- **Rotation:** none — one-point perspective held; the corridor's symmetry does the work.
- **Light:** compression from bright exterior → dark corridor → glowing green lightwell. The film's *inhale*.
- **Risk note:** door-open is a prompted action — expect 2–3 takes; judge door glass rigidity at 200% zoom.

**S4 — "The Green Heart"** · int-01 → int-06 · 0:23–0:31 (8s)
- **Placement:** corridor axis, eye level.
- **Move:** push 0.35 m/s; **at 4s a slow clockwise yaw begins (35–40° total, ≤10°/s)** as the courtyard's glass box slides past frame-left — bamboo and monstera trembling behind glass, dappled light crawling the floor.
- **Reveal:** the yaw lands on the kitchen — terrazzo island foreground-right, curved glass corner and valley beyond (int-06 composition).
- **Light:** neutral-warm morning; first sun shaft rakes the timber floor.
- **Seam:** the yaw itself is the transition — turning a corner is where the eye expects the world to change.

**S5 — "The Living Orbit"** · int-06 → int-05 · 0:31–0:40 (9s)
- **Placement:** open-plan zone (the only room with orbit clearance), island centered.
- **Move:** 70° counter-clockwise arc at ~9°/s, radius ~2.5m, island dead-center; counter-parallax: slat wall wipes foreground once (the doc-13 "best parallax asset"); ease to stillness on the int-05 money-frame composition (curved boucle sofa, orb lamp, gorge + waterfall beyond glass).
- **Action:** valley mist rolling; waterfall motion; dust motes in the sun shaft; orb lamp fades ON at 7s (first practical — the day is warming).
- **Light:** morning → first gold on the ridge tops.
- **Hold:** final 1.5s nearly still — the film's first *rest*, mid-film awe beat.

**S6 — "To the Private Wing"** · int-10 → int-16 · 0:40–0:47 (7s)
- **Placement/Move:** track backward-then-turn: retreat from the island 0.3 m/s, yaw left 45° re-crossing the courtyard glass (bamboo again — the courtyard is the film's continuity anchor, touched in S3/S4/S6/S9/S10), then forward push through the bedroom doorway.
- **Beat:** at 4s the bedroom's sliding glass panel glides open ahead of us (prompted action, take-heavy).
- **Rotation discipline:** one yaw only; screen direction consistent with floor plan (bedroom is across the courtyard from living).
- **Seam:** doorway frame wipes the lens at the join point.

**S7 — "Waking Room"** · int-16 → int-14 · 0:47–0:56 (9s)
- **Placement:** foot of the bed, eye level dropping to 1.3m (bed height intimacy).
- **Move:** slow 55° pan right at 7°/s across the linen and headboard, then 0.5m push toward the square window; the pan *pauses* 0.5s on the courtyard glass (green wall) before continuing — pacing = luxury.
- **Action:** THE money motion — cloud inversion pooling and sliding between ridges in the window; pendant orbs glowing, breathing; duvet edge stirring.
- **Light:** warm mid-gold now; pendants ON.
- **Seam out:** ends composed on the bathroom doorway edge at frame-right (door frame = next join's hiding place).

**S8 — "Terrazzo & Steam"** · anchor C · 0:56–1:01 (5s)
- **Placement:** bathroom doorway, 35mm.
- **Move:** single gentle push 0.2 m/s, ~0.4m total. No rotation — small room, slide/push only (clearance rule).
- **Action:** skylight shaft on terrazzo; a wisp of steam drifting through the light; brass fixture glints.
- **Light:** top-lit, warmest interior beat.
- **Duration note:** deliberately the shortest segment — a *peek*, real-estate grammar for secondary rooms.

**S9 — "Into the Garden"** · C/int-04-side → anchor D → sky · 1:01–1:09 (8s)
- **Placement:** courtyard threshold → *inside* the glass box, among the bamboo.
- **Move:** two slow steps forward (0.3 m/s), then **tilt up 0° → 70° at 10°/s** climbing the bamboo canes to the open sky aperture; leaves cross the lens close (near-field parallax).
- **Action:** bamboo sway, leaf-shadow dapple sliding across the lens, one bird crosses the sky aperture.
- **Light:** golden top-light pouring down the green — the brand promise ("inside but outside") in one move.
- **Seam out:** frame is mostly sky + aperture rim — minimal geometry = clean join to the rise.

**S10 — "THE RISE"** · sky frame → anchor E · 1:09–1:17 (8s) — **the signature move**
- **Placement:** inside the courtyard void, lens up.
- **Move:** pure vertical crane, 0 → 6 m/s ease-in; the roof aperture's edges enter, wipe past, and fall away; camera pitches from +70° down through 0° to -30° as it clears the roof — ending looking *down* at the roof's cutout with the garden glowing green in the black roof plane, hills all around (anchor E).
- **Why it works:** the roof genuinely has this aperture (exploded view) — the move is architecturally true, and rising *through the building* out into landscape is the inside-outside thesis as pure camera language.
- **Risk note:** hardest segment — camera passes geometry at close range. Budget 3 takes; judge roof-edge rigidity. Fallback: hide the roof-crossing moment in a 4-frame luminance bloom (sun flare as the lens clears the roofline).

**S11 — "Deck Life"** · E → anchor F · 1:17–1:24 (7s)
- **Placement/Move:** from overhead, a descending arc (drone 3 m/s, 40° sweep) around the pod's deck side, settling to a 10° high three-quarter view of the deck: pool table under the floating roof, loungers, grass plumes backlit.
- **Action:** soffit lights ON, warm pools on timber; grass swaying en masse; long shadows raking.
- **Light:** peak golden hour, sun kissing the horizon.
- **Rotation:** the descending arc is the film's last yaw — closing the clockwise circle begun in S4.

**S12 — "Let the Day Go"** · F → anchor G · 1:24–1:32 (8s)
- **Placement/Move:** slow pull-back + rise, 2 m/s easing to near-still; pod recedes glowing amber in blue-hour hills; settle on a symmetric wide with the pod's lit windows as the only warmth (logo space upper-right third).
- **Action:** mist re-forming in the valley (the day closing its own loop — mirrors S1).
- **End:** 1.5s hold to stillness. Brand-film cut: logo fade-in. Hero-loop cut: mist bloom dissolve back to S1 (seamless loop, same engineering as doc-14 §3).

**Pacing curve:** 8·7·8·8·9·7·9·5·8·8·7·8 — long-move rhythm with the two 9s "dwell" beats (S5 living, S7 bedroom) where buyers linger, the 5s bath "peek", and no segment under 5s. Cuts land on motion or thresholds exclusively.

**Optional cold open (test before committing):** the exploded build-up — components descending and assembling in the air (ext-exploded), 6s, before S1. Doc-14 flags rigid-part warping; Kling 3.0 element-binding may fix it. **2 test takes max**; if parts bend, drop it (the beat is spectacle, not story).

---

## 6 · Production pipeline

1. **Anchor pass** — generate stills A–G (+2 variants each of E and F, the hardest), 4K, watermark-free, 16:9 pre-cropped. **User approves anchors before video.**
2. **Video pass** — segments in dependency order (S1→S12), each submitted with `start_image` + `end_image` + timed-beat prompt + universal suffix. Duration per table. 3-take budget on S3, S6, S10; 2 on the rest. Take selection: (a) architecture rigidity at 200% zoom — one warped mullion kills it, (b) motion believability & speed discipline, (c) join-frame fidelity to the anchor (the chain depends on it).
3. **Upscale pass** — winning takes → 2K (bytedance upscaler) before edit.
4. **Assembly (ffmpeg)** — hard cuts on the pixel-matched joins; 92% optical-flow retime globally (slightly slower than life = luxury); micro ease-to-still on the final 6 frames of S5, S7, S12; S10's optional 4-frame bloom.
5. **Grade** — single LUT matched to int-05 (doc-14 §5 recipe: +8 amber highlights, shadows to deep sage `#36441f` family, blacks lifted +3, −8% global sat except greens/practicals, 4% fine grain) + the §3 light-arc keyframed as a subtle temperature ramp across acts.
6. **Deliver** — master 90s (brand film, 4K + sound design per doc-14 §5); hero loop 25s recut (S2·S3·S4·S5·S10·S12, mist-loop seam) at ≤8MB H.264 + WebM; vertical 9:16 recut (S3, S7, S9, S10 reframed).

## 7 · Budget & risk register

| Item | Est. credits |
|---|---|
| 7 anchor stills + variants (~11 images) | 30–60 |
| 12 segments first pass (~90s total video) | ~180–220 |
| Retakes (S3, S6, S10 ×2 extra; others ×0.5 avg) | ~100–140 |
| Exploded cold-open test (2 takes) | ~25 |
| Upscale pass | ~50–80 |
| **Total** | **~400–520** (balance: 1,720) |

| Risk | Mitigation |
|---|---|
| S10 roof-crossing warps | 3 takes → luminance-bloom fallback → worst case: cut from tilt-up directly to anchor E (still reads) |
| Door-open actions fail | Takes; fallback "door already open" (user approved this alternative) |
| Anchor E/F style drift from renders | Multi-reference generation + user approval gate |
| Model invents furniture in orbits | 70° cap, element-consistency suffix, rigidity QC |
| Chain-join micro-jump | End-frame ease-to-still + 92% retime absorbs 1-frame deltas |

## 8 · What changed vs. doc-14 hero loop
- Segments **journey between anchors** (start+end frame) instead of animating single stills — the "slideshow" feel is structurally impossible now.
- 5s clips → **7–9s choreographed takes** with timed in-prompt beats (Kling 3.0 3–15s flexible duration).
- Prompted **in-shot actions**: doors sliding open, practicals switching on, exposure handovers.
- **One continuous geography** honoring the floor plan (courtyard as hub, consistent screen direction) instead of eight disconnected vignettes.
- The World-B sea frames are **out** of the master (deck rebuilt in World A via anchor F); they remain available for a separate coastal cut.

---
**Related:** [Gatsby Hero Film Treatment](14-gatsby-hero-film-treatment.md) · [Asset Generation Prompts](13-asset-generation-prompts.md)
