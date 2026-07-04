# 16 · "WALK IN" — Full Production Spec
## Every prompt, parameter, model and gate — the executable version of doc 15

> **Companion to:** [15-gatsby-walkthrough-film-plan.md](15-gatsby-walkthrough-film-plan.md) (creative rationale, cinematography bible, floor-plan logic).
> This doc is the **runbook**: copy-paste prompts, exact tool parameters, reference stacks, QC criteria, budgets, and the order of operations.
> **Updated:** 2026-07-04 · Balance at writing: 1,720 credits

---

## 0 · Pipeline & gates

```
GATE 0  Pilot bake-off (3 clips) ─── pick engines ──► user reviews
GATE 1  Anchor stills A–G ────────── user approves ─► the "set" is locked
GATE 2  Video segments S1–S12 ────── QC per take ───► winning takes locked
GATE 3  Upscale → assembly → grade → user review ──► delivery encodes
```

Every generation is preflighted with `get_cost: true` before submission. No step proceeds past a gate without review.

---

## 1 · Global settings (all video segments)

| Setting | Value |
|---|---|
| Aspect ratio | `16:9` |
| Resolution | `1080p` (Seedance) / `pro` mode (Kling) |
| Frame rate | 24 fps (model native) |
| Audio | OFF (web hero is muted; brand-cut audio added in post via `seed_audio`) |
| Count | 1 per take (judge, then retake — never batch blind) |

**UNIVERSAL SUFFIX — append to every video prompt:**

```
single continuous take, no cuts, gimbal-smooth camera with subtle organic drift,
35mm lens at eye level, static architecture, glass and window frames rigid and
undistorted, all furniture and finishes locked and consistent with the reference
images, no people, photorealistic luxury architectural film, 24fps motion blur,
locked exposure, ease-in ease-out camera motion
```

**UNIVERSAL NEGATIVE (models that accept it; otherwise fold "avoid:" into prompt):**

```
warping walls, melting glass, morphing furniture, extra rooms, invented objects,
people, text artifacts, flicker, exposure pumping, camera shake, fast motion,
fisheye distortion
```

**QC per take (in order — fail any = retake):**
1. Architecture rigidity at 200% zoom (mullions, slats, counter edges)
2. Sign legibility where visible (S2, S12)
3. Motion speed discipline (walk ≈ 0.4 m/s; if the eye can't wander, too fast)
4. End-frame fidelity to the anchor (the chain depends on it)
5. Design consistency vs reference renders (no invented furniture)

---

## 2 · GATE 0 — Pilot bake-off (~60–90 credits)

Three test clips of **S4 "The Green Heart"** (chosen because it has a yaw + courtyard glass + kitchen reveal — every failure mode in one segment):

| Take | Model ID | Params | Purpose |
|---|---|---|---|
| P1 | `seedance_2_0` | duration 8, 1080p, start+end+2 refs | The presumed primary |
| P2 | `kling3_0` | duration 8, pro, start+end | The budget benchmark |
| P3 | `cinematic_studio_3_0` | duration 8, start frame | Higgsfield's film-look flagship |

All three use the S4 prompt from §5 verbatim. Winner(s) decided on QC criteria 1/3/5, judged side by side. Expected outcome: Seedance primary + Kling B-cam; Cinema Studio kept only if it visibly outclasses on the dwell look.

---

## 3 · GATE 1 — Anchor stills (7 required + variants)

Generated with `generate_image`. All 16:9, no people, no watermark. Landscape anchors use **Soul Location** (prompt-only, best-in-class environments). Design-locked anchors use **Nano Banana Pro** (`nano_banana_pro`) with reference stacks from our renders (role `image`).

**Shared style tail for all anchor prompts:**

```
photorealistic architectural photography, misty green rolling hills of the Western
Ghats, modern prefab pod with charcoal board-formed concrete portal and vertical
timber slat cladding, floor-to-ceiling glass, 35mm, natural light only, cinematic
composition, no people, no text overlays
```

---

**ANCHOR A — High aerial dawn wide** · model `soul_location` · aspect 16:9
```
High aerial drone view at dawn, 60 meters above a misty green valley, rivers of
white cloud inversion flowing between layered rounded ridgelines, a single modern
prefab pod with a dark flat roof and warm glowing entry light sits small on a
grassy terrace center-right, pre-dawn blue-grey light, the pod's warm light is
the only warm tone, [style tail]
```
Variants: 2 · Judge: pod reads as OUR pod (dark roof + timber + portal), believable terrain.

**ANCHOR B — Ground approach** · model `nano_banana_pro` · refs: `ext-10`, `ext-08` (role image)
```
Eye-level view standing on a natural stone path in tall dew-covered grass, looking
toward the entrance of the pod 15 meters ahead: charcoal concrete entry portal
with a circular white sign disc on vertical timber slats, glass door glowing
warmly, thin morning mist between the hills behind the pod, cool blue-grey dawn
light, path leading-lines to the door, [style tail]
```
Judge: portal/slats/sign match ext-10's design exactly.

**ANCHOR C — Bathroom** · model `nano_banana_pro` · refs: `int-15`, `int-14`, `ext-exploded` (role image)
```
Compact luxury pod bathroom: speckled terrazzo floor and walk-in shower zone,
warm timber slat ceiling with a square skylight casting a soft light shaft, matte
brass fixtures, floating light-oak vanity with a round mirror, one small green
fern, a wisp of steam drifting through the light shaft, warm golden morning
top-light, materials matching the reference images, [style tail]
```
Judge: material continuity (terrazzo = kitchen island family, timber = ceiling family).

**ANCHOR D — Inside the courtyard** · model `nano_banana_pro` · refs: `int-16`, `int-04`, `int-01` (role image)
```
Standing inside the pod's central glass-walled garden courtyard among tall bamboo
canes and monstera, camera low looking slightly upward along the green canes
toward the open sky aperture in the dark roof above, glass walls on all sides
showing the corridor and bedroom beyond, dappled golden light pouring down
through the opening, leaves close to the lens, [style tail]
```
Judge: courtyard planting matches int-16/int-04; roof aperture visible.

**ANCHOR E — Aerial over the roof aperture** · model `nano_banana_pro` · refs: `ext-exploded`, anchor A (role image)
```
Aerial view looking straight down at the pod's dark flat roof from 25 meters:
the rectangular courtyard cutout in the roof glows green with the garden below
lit by golden light, timber deck extending from one side, misty green ridgelines
rolling away on all sides, late golden-hour light, long soft shadows, [style tail]
```
Variants: 2 (hardest anchor) · Judge: roof shape matches exploded view; aperture placement per floor plan.

**ANCHOR F — World-A deck golden hour** · model `nano_banana_pro` · refs: `ext-03` (contents), `int-05` (landscape), `ext-10` (materials) (role image)
```
Golden-hour view of the pod's floating-roof timber deck: pool table under the
canopy, low outdoor lounge sofas, backlit grass plumes at the deck edge, warm
soffit lights glowing under the roof, and beyond the deck a misty green gorge
with layered ridgelines — NO sea, NO beach — peach-to-lavender sky, long golden
shadows, [style tail]
```
Judge: deck furniture/roof from ext-03 successfully transposed to the green-hills world.

**ANCHOR G — Dusk farewell wide** · model `soul_location` · aspect 16:9
```
Wide symmetric dusk view of the modern pod glowing amber on its grassy terrace,
warm light from every window, deep blue-hour sky, mist re-forming in the valley
below, ridgelines fading into haze layers, the pod's lit windows are the only
warmth in a cool sage-blue landscape, [style tail]
```

Anchor budget: ~9–11 images ≈ **30–60 credits**.

---

## 4 · Reference stacks (Seedance segments)

Seedance 2.0 accepts extra refs beyond start/end. Per segment, attach the room's best render(s) with role `image` to pin materials:

| Segments | Extra refs |
|---|---|
| S3, S4 | `int-01`, `int-10` |
| S5 | `int-05`, `int-06` |
| S6, S7 | `int-16`, `int-14` |
| S8 | anchor C only |
| S9, S10 | anchor D, `ext-exploded` |
| S11 | anchor F, `ext-03` |
| S1, S2, S12 | anchor A / B / G (landscape continuity) |

---

## 4A · Continuity & chaining method (READ BEFORE GENERATING)

**The rule:** the last frame of each segment must equal the first frame of the next. `end_image` is only a *target* the model interpolates toward — the rendered last frame is close but **not pixel-identical** to the anchor. Relying on the anchor alone risks a 1-frame pop at the seam.

**Frame-perfect protocol (mandatory for every true-chain join):**
1. Generate segment N with `start_image` + `end_image` (anchor steers the motion).
2. On approval, **extract the actual final frame** of the winning take:
   `ffmpeg -sseof -0.05 -i takeN.mp4 -frames:v 1 joinN.png`
3. Use `joinN.png` as segment N+1's **`start_image`** (NOT the anchor still). Keep N+1's own `end_image` anchor as its target.

This welds N+1 onto N's exact last pixel. Anchors remain the compositional targets; extracted frames are the literal joins.

**Join audit — 8 true chains, 3 motivated cuts:**

| Join | Type | Mechanism |
|---|---|---|
| S1→S2 · S2→S3 · S3→S4 · S4→S5 | ✅ true chain | extract-frame weld |
| S5→S6 (living→corridor) | ✂️ motivated cut | camera turns 180° out of living; hide on the turn |
| S6→S7 | ✅ true chain | extract-frame weld |
| S7→S8 (bedroom→bath) | ✂️ motivated cut | separate room; hide on doorway |
| S8→S9 (bath→courtyard) | ✂️ motivated cut | back out; hide on threshold |
| S9→S10 · S10→S11 · S11→S12 | ✅ true chain | extract-frame weld |

The 3 cuts are unavoidable (no continuous camera path exists between those rooms) and land on turns/thresholds — standard real-estate-film grammar. **Optional:** generate 3 bridge stills (§4B) to convert them into true chains for a fully cut-free film.

## 4B · Image coverage audit

**Sufficient to shoot the full film.** Room *content* is fully covered by existing World-A renders; the 7 anchors fill exterior/bathroom gaps.

| Category | Status |
|---|---|
| Living, kitchen, bedroom, corridor, courtyard content | ✅ existing renders (int-01,04,05,06,10,14,16) |
| Aerials (A, E), approach (B), dusk (G) | ⚠️ generate — no such angle exists |
| Bathroom (C) | ⚠️ generate — **no bathroom render exists at all**; fully invented from materials; budget 2–3 takes |
| World-A deck (F) | ⚠️ generate — deck exists only in coast world (ext-03); transpose to hills; budget 2–3 takes |

**Optional bridge stills** (only if zero-cut continuity is wanted):
- **BR1** living-pivot: from the sofa (int-05) looking back toward the courtyard/corridor mouth → welds S5→S6. Model `nano_banana_pro`, refs int-05, int-10.
- **BR2** bedroom→bath: bedroom corner showing the bathroom doorway → welds S7→S8. Refs int-16, anchor C.
- **BR3** bath→courtyard: bathroom door threshold looking toward the courtyard glass → welds S8→S9. Refs anchor C, anchor D.
- Cost: ~15–20 credits. Decision left to user at Gate 1.

---

## 5 · GATE 2 — The 12 segments (full generation specs)

Tool: `generate_video` · aspect `16:9` · resolution 1080p · every prompt ends with the UNIVERSAL SUFFIX.

---

### S1 "Above the Clouds" · 8s · A/B test: `seedance_2_0` vs `veo3_1` (high)
`start_image`: anchor A · `end_image`: anchor B (Seedance only — Veo takes start only)
```
Aerial drone shot descending slowly forward over a misty green valley at dawn,
gliding down from high above toward a modern prefab pod on a grassy terrace,
rivers of cloud sliding between ridge layers below, two birds crossing the far
frame, the camera descends smoothly and levels out to eye height on the stone
path facing the pod's entry portal, deceleration easing to walking pace,
pre-dawn blue-grey light with one warm glowing entry light,
```
Takes: 2 · Risk: altitude-to-eye-level transition; if it warps, split at cloud layer.

### S2 "The Walk Up" · 7s · `kling3_0` (native text-lock for the sign)
`start_image`: anchor B · `end_image`: `ext-10` (shot1 crop)
```
Steady walking-pace dolly forward along the stone path toward the pod entrance,
camera perfectly level at eye height, tall grass plumes brushing the bottom
frame edges, mango-leaf shadows breathing on the timber slats, the circular
BOHO PODS GATSBY sign disc becoming sharply legible as we approach, thin mist
drifting between the green hills behind the pod, cool morning light warming
slightly, the sign text stays perfectly sharp and static,
```
Takes: 2 · QC: sign at 200% zoom (the reason Kling gets this shot).

### S3 "The Door Opens" · 8s · `seedance_2_0`
`start_image`: `ext-10` · `end_image`: `int-01` · refs: int-01, int-10
```
Continuous forward dolly at slow walking pace toward the charcoal concrete entry
portal, at 2 seconds the glass entry door slides open silently from left to
right, at 4 seconds the camera crosses the threshold into the dark entry
corridor and exposure dims half a stop, ahead the corridor's far glass wall
glows with green courtyard plants and soft light bloom, dappled palm shadow on
the corridor floor, one-point perspective held dead center,
```
Takes: 3 (door action) · Fallback: "the glass door stands open" (static open door).

### S4 "The Green Heart" · 8s · winner of pilot
`start_image`: `int-01` · `end_image`: `int-06` · refs: int-01, int-10
```
Slow forward push down the dark corridor toward the glowing glass courtyard,
tropical plants trembling gently behind the static glass, at 4 seconds the
camera begins a smooth clockwise turn of about 40 degrees while continuing
forward, the glass garden courtyard sliding past the left side of frame, the
turn reveals the kitchen: terrazzo island in the near right foreground, curved
corner glazing packed with tropical plants and a golden misty valley beyond,
a low sun shaft raking across the timber floor, dust motes in the light,
```
Takes: 2 (+3 pilot takes already exist).

### S5 "The Living Orbit" · 9s · `seedance_2_0` (or Cinema Studio if pilot wins)
`start_image`: `int-06` · `end_image`: `int-05` · refs: int-05, int-06
```
Slow smooth 70 degree counter-clockwise arc around the terrazzo kitchen island,
keeping the island centered, foreground timber slat wall wiping past once with
strong parallax, the arc settling to near stillness on the living room: curved
white boucle sofa, glowing orb floor lamp switching on at 7 seconds, floor-to-
ceiling glass with a misty gorge and distant waterfall beyond, golden mist
rolling slowly through the valley, the final second almost completely still,
```
Takes: 2 · QC: no furniture invention during the arc (worst-case segment for it).

### S6 "To the Private Wing" · 7s · `seedance_2_0`
`start_image`: `int-10` · `end_image`: `int-16` · refs: int-16, int-01
```
Camera retreats slowly from the kitchen island then turns left 45 degrees and
pushes forward along the corridor beside the glass garden courtyard, bamboo
and monstera passing on the right behind glass, at 4 seconds the bedroom's
sliding glass door panel glides open ahead of the camera, revealing the bedroom:
rumpled cream linen bed, cane-webbed wardrobes, the same green courtyard seen
from its far side, warm mid-morning light, dappled light on the corridor floor,
```
Takes: 3 (turn + door) · Fallback: door already open.

### S7 "Waking Room" · 9s · `seedance_2_0`
`start_image`: `int-16` · `end_image`: `int-14` (shot5 crop) · refs: int-14, int-16
```
From the foot of the bed the camera pans slowly right across the rumpled linen
and upholstered headboard, pausing half a second on the glass courtyard wall
of green bamboo, then continuing the pan and pushing gently toward the square
window centered above the bed, through the window a sea of clouds pooling and
sliding between mountain ridges in golden light, three black pendant orbs
glowing softly, the room otherwise perfectly still,
```
Takes: 2 · This is the awe beat — motion must be ONLY clouds + glow.

### S8 "Terrazzo & Steam" · 5s · `seedance_2_0`
`start_image`: anchor C · no end frame (peek shot, cuts on door frame) · refs: anchor C
```
Very gentle forward push through the bathroom doorway, 40 centimeters of travel
total, the skylight shaft catching a wisp of steam drifting slowly through the
light, brass fixtures glinting, terrazzo floor texture sharp and static, warm
golden top-light, serene and quiet,
```
Takes: 1–2 (lowest risk).

### S9 "Into the Garden" · 8s · `seedance_2_0`
`start_image`: anchor D low-angle variant · `end_image`: sky-dominant crop of D · refs: anchor D, int-04
```
Standing inside the glass garden courtyard among tall bamboo, the camera steps
slowly forward then tilts upward from eye level to 70 degrees, climbing the
green bamboo canes toward the open rectangular sky aperture in the dark roof,
leaves crossing close to the lens with soft parallax, dappled golden light
pouring down, one bird crossing the open sky above, the frame ending mostly
sky and roof aperture rim,
```
Takes: 2.

### S10 "THE RISE" · 8s · `seedance_2_0` — the signature move
`start_image`: S9's final sky frame · `end_image`: anchor E · refs: anchor E, ext-exploded
```
The camera rises vertically upward out of the garden courtyard through the
rectangular roof opening, the dark roof edges entering the frame, sliding past,
and falling away below, the camera pitching gently downward as it clears the
roofline until it looks down at the pod's dark flat roof with the courtyard
cutout glowing green below, misty ridgelines rolling away on all sides, golden
hour light, one soft sun flare as the lens clears the roof edge, the ascent
easing to a stop at 25 meters,
```
Takes: 3 · Fallbacks in order: (1) 4-frame luminance bloom at roof-crossing in post;
(2) hard cut from S9's sky frame to a descending-start take from anchor E.

### S11 "Deck Life" · 7s · `seedance_2_0`
`start_image`: anchor E · `end_image`: anchor F · refs: anchor F, ext-03
```
From overhead the camera descends in a smooth 40 degree arc around the pod
toward the timber deck, settling to a high three-quarter view: pool table under
the floating roof canopy, low lounge sofas, warm soffit lights glowing, backlit
grass plumes swaying at the deck edge, long golden-hour shadows raking across
the timber, peak warm light, the descent easing to a gentle stop,
```
Takes: 2.

### S12 "Let the Day Go" · 8s · A/B: `seedance_2_0` vs `veo3_1`
`start_image`: anchor F · `end_image`: anchor G (Seedance only)
```
Slow pull-back and rise away from the pod's deck, the pod receding glowing
amber in the blue-hour hills, mist re-forming in the valley below, warm window
light becoming the only warmth in a cool sage-blue landscape, the camera easing
to complete stillness on a symmetric wide view, the final one and a half
seconds perfectly still,
```
Takes: 2 · The hero-loop cut dissolves this through mist back into S1.

### S0 (OPTIONAL) "Assembly" cold open · 6s · `kling3_0` (element binding)
`start_image`: sky-only crop of anchor A · `end_image`: anchor A
```
High above the misty valley at dawn, prefab building components descend slowly
from the sky in sequence and assemble into a modern pod on the grassy terrace:
first the floor platform, then the walls with their timber slats, then the glass
panels, finally the dark roof lowering into place, each component moving rigidly
like a precision crane lift, no deformation,
```
Takes: 2 HARD MAX (doc-14 flags rigid-body warping) — drop if either take bends.

---

## 6 · GATE 3 — Finish

1. **Upscale:** each winning take → `upscale_video` (provider bytedance, resolution 2k, fps 24; pass true source w/h 1920×1080).
2. **Assembly (ffmpeg):** hard cuts at pixel-matched joins → global 92% optical-flow retime (`minterpolate`/`setpts`) → ease-to-still on final 6 frames of S5/S7/S12 → optional 4-frame white bloom at S10 roof-crossing.
3. **Grade (single pass):** match target int-05 — highlights +8 toward amber, shadows toward `#36441f` sage, blacks +3, saturation −8% globally except greens, temperature ramp keyframed cool→warm→amber across acts (I→IV), 4% fine grain.
4. **Encodes:**
   | Asset | Spec |
   |---|---|
   | Brand master | 90s, 2K H.264 CRF 18 + sound design (`seed_audio`: valley birdsong → crickets/breeze bed, −20 LUFS) |
   | Web hero loop | 25s recut (S2·S3·S4·S5·S10·S12), 1080p ≤8MB H.264 CRF ~24 + WebM |
   | Mobile hero | 720p ≤4MB |
   | Vertical | 9:16 via `reframe` tool on S3, S7, S9, S10 |
   | Poster | S2 final frame (sign legible) |
5. **Objective check:** run `virality_predictor` on the brand master for hook/retention scoring before publishing.

---

## 7 · Budget

| Item | Est. credits |
|---|---|
| Pilot bake-off (3×8s) | 60–90 |
| Anchors (9–11 images) | 30–60 |
| Segments first pass (12 × 7–9s @ 1080p) | 200–280 |
| Retakes (S3/S6/S10 ×2, others ×0.5 avg) | 100–150 |
| S0 test (2 takes) | 25 |
| Upscale pass (12 clips) | 50–80 |
| **Total** | **~465–685** of 1,720 |

Every submission preflighted with `get_cost:true`; if Seedance 1080p prices high, hybrid fallback = Seedance for S3/S5/S7/S10 (hero segments), Kling 3.0 for the rest — saves ~30%.

---

## 8 · Execution checklist

- [ ] GATE 0: pilot P1/P2/P3 → side-by-side review → engines locked
- [ ] GATE 1: anchors A–G (+variants) → **user approval**
- [ ] GATE 2: S1–S12 in order (chain dependency), QC each take
- [ ] S0 test (optional beat)
- [ ] GATE 3: upscale → assemble → grade → **user review**
- [ ] Encodes + site wiring (`GatsbyHeroSlideshow` already video-ready)
- [ ] Virality check on brand master

---
**Related:** [Walkthrough Film Plan](15-gatsby-walkthrough-film-plan.md) · [Hero Film Treatment](14-gatsby-hero-film-treatment.md)
