/**
 * BOHO PODS — product catalogue data.
 * Drives /pods (catalogue) and /pods/[slug] (detail) from one model.
 * Content sourced from the live site + brochure. Prices shown only where the
 * live site publishes them ("from ₹X"); otherwise omitted (route to WhatsApp).
 */

export type PodFamily = "retreat" | "utility";

export type Pod = {
  slug: string;
  name: string;
  family: PodFamily;
  flagship?: boolean;
  tagline: string;
  heroLine: string;
  overview: string;
  image: string;
  imagePlaceholder?: boolean; // true = needs a real photo of this pod
  /** At-a-glance facts for catalogue cards: [area, sleeps, signature]. */
  glance: [string, string, string];
  gallery: string[];
  priceFrom?: string; // e.g. "₹20L" — omit to hide price
  priceNote?: string;
  addons?: { label: string; price: string }[];
  areaStats?: { label: string; value: string }[];
  specs: { label: string; value: string }[];
  sleeps?: string;
  included: string[];
  features: string[];
  useCases: string[];
  roi?: string;
  faqs: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
};

export const pods: Pod[] = [
  // ───────────────────────── Retreat & Stay ─────────────────────────
  {
    slug: "gatsby",
    name: "Gatsby",
    family: "retreat",
    flagship: true,
    tagline: "The New Era of Modular Living",
    heroLine: "Fully loaded. Utterly effortless.",
    overview:
      "Our flagship — the Lux version of our pods, with every bell and whistle over the premium build. A spacious living area and bedroom open onto a generous covered sit-out, wrapped in top-of-the-line materials and finished with the kind of details you'd expect from a boutique hotel suite.",
    image: "/images/gatsby/ext-05.jpg",
    glance: ["650 sq ft built", "Sleeps 2+", "Skylit roof + big deck"],
    gallery: [
      "/images/gatsby/ext-03.jpg",
      "/images/gatsby/ext-07.jpg",
      "/images/gatsby/ext-01.jpg",
      "/images/gatsby/int-03.jpg",
      "/images/gatsby/int-07.jpg",
      "/images/gatsby/int-13.jpg",
      "/images/gatsby/int-16.jpg",
      "/images/gatsby/ext-exploded.jpg",
    ],
    priceFrom: "₹35L",
    priceNote: "excl. GST",
    specs: [
      { label: "Room", value: "300 sq ft (15 × 20 ft)" },
      { label: "Bathroom", value: "150 sq ft (15 × 10 ft)" },
      { label: "Covered sit-out", value: "200 sq ft (10 × 20 ft)" },
      { label: "Total built", value: "650 sq ft" },
      { label: "Lifespan", value: "30+ years" },
    ],
    sleeps: "2+ guests",
    included: [
      "Premium bed & furnishings",
      "Cassette AC",
      "Wardrobe & storage",
      "Full bathroom — fixtures & plumbing",
      "Electricals, septic tank & installation",
    ],
    features: [
      "Built-in Bluetooth speakers",
      "In-built projector",
      "Slim-profile sliding glass",
      "Manual insect blinds",
      "Skylit roofline & front deck",
      "Top-of-the-line materials throughout",
    ],
    useCases: ["Premium weekend home", "High-ADR luxury rental", "A statement retreat"],
    roi: "Commands the top nightly rates in the range — the headline unit for a premium rental.",
    faqs: [
      { q: "What makes the Gatsby the flagship?", a: "It carries every premium feature — Bluetooth audio, a projector, slim sliding glass, insect blinds and the best materials — in the largest single-room layout we offer." },
      { q: "How much space do I need?", a: "The pod is 650 sq ft built-up; we'll confirm placement and access with a free site survey." },
      { q: "Can it earn as a rental?", a: "Yes — its luxury spec lets it command premium nightly rates on Airbnb, StayVista and Booking.com." },
    ],
    seoTitle: "Gatsby — Luxury Prefab Cabin (Flagship)",
    seoDescription:
      "The Gatsby is Boho Pods' flagship — a fully-loaded 650 sq ft luxury prefab cabin with Bluetooth audio, projector, skylit roofline and a covered deck. From ₹35L.",
  },
  {
    slug: "nomad",
    name: "Nomad",
    family: "retreat",
    tagline: "Work · Rest · Roam",
    heroLine: "Where infinite landscapes meet absolute focus.",
    overview:
      "The new standard for work-from-anywhere. A secluded micro-retreat for the modern wanderer and remote professional — tuck it into a garden, perch it by a pool, or open it to a mountain view. Proof that true luxury doesn't need a big footprint, just intelligent design.",
    image: "/images/renders/boho-125.jpg",
    glance: ["580 sq ft built", "Sleeps 1–2", "12 mm curved glass"],
    gallery: [
      "/images/renders/boho-125.jpg",
      "/images/renders/boho-126.jpg",
      "/images/renders/boho-133.jpg",
      "/images/renders/boho-145.jpg",
    ],
    priceFrom: "₹20L",
    areaStats: [
      { label: "Ground coverage", value: "630 sq ft" },
      { label: "Built-up area", value: "580 sq ft" },
      { label: "Usable carpet", value: "390 sq ft" },
      { label: "Carpet area", value: "388 sq ft" },
    ],
    specs: [
      { label: "Study & Rest", value: "15 × 10 ft" },
      { label: "Toilet", value: "10 × 8 ft" },
      { label: "Deck", value: "4 ft wide + ramp" },
      { label: "Glass", value: "12 mm curved polyplast" },
    ],
    sleeps: "1–2 guests",
    included: [
      "Single bed 6'6\" × 3'6\" & upholstered headboard",
      "Study table & wardrobe (flush door)",
      "Blackout drapes & cassette AC",
      "Rain shower & ceramic full-body tiling",
      "Open-to-sky planter inside the toilet + external planter bed",
      "Outdoor coffee table & seating, electricals, septic, plumbing & labour",
    ],
    features: [
      "8\" LGSF frame walls with aluminium-cladded panels",
      "Seamless 12 mm curved glass on U-channel aluminium frame",
      "SPC flooring & PVC soffit wall panels",
      "Sweeping curved roofline",
    ],
    useCases: ["Weekend retreat", "Creative studio", "Work-from-anywhere", "Micro-resort unit"],
    roi: "Compact footprint, full nightly rate — a favourite for micro-resort clusters.",
    faqs: [
      { q: "Is the Nomad big enough to live in?", a: "It's a smart single-room retreat (study + rest + full bath) — ideal for one or two. For families, look at the Gazepod or our 2/3-BHK homes." },
      { q: "What's the build quality?", a: "8-inch LGSF framing with aluminium-clad panels and seamless 12 mm curved glass — engineered to last 30+ years." },
      { q: "Can I run it as an Airbnb?", a: "Absolutely — the Nomad is purpose-built for micro-resorts and long-stay digital nomads." },
    ],
    seoTitle: "Nomad — Compact Work-From-Anywhere Prefab Pod",
    seoDescription:
      "The Nomad is a 388 sq ft prefab retreat pod for solo travellers and remote workers — curved glass, rain shower, study nook. Installed in 30–45 days. From ₹20L.",
  },
  {
    slug: "dojopod",
    name: "Dojopod",
    family: "retreat",
    tagline: "Panoramas on a Budget",
    heroLine: "Everything you need, nothing you don't.",
    overview:
      "Built on a high-quality mild-steel framework with industrial-grade materials that last over 30 years — a no-frills cabin with minimal automation, purpose-built for extreme-weather locations. Spacious volume and wide openings give you panoramic views inside a secure, weather-tight shell.",
    image: "/images/renders/boho-149.jpg",
    glance: ["270 sq ft room", "Sleeps 2 (grows)", "Extreme-weather build"],
    gallery: [
      "/images/renders/boho-149.jpg",
      "/images/renders/boho-143.jpg",
      "/images/renders/boho-065.jpg",
    ],
    priceFrom: "₹25L",
    addons: [{ label: "Additional bedroom", price: "₹7.99L" }],
    specs: [
      { label: "Room", value: "270 sq ft (15 × 20 ft)" },
      { label: "Bathroom", value: "150 sq ft (15 × 10 ft)" },
      { label: "Deck", value: "80 sq ft (15 × 7 ft)" },
      { label: "Installation area", value: "1,000 sq ft" },
    ],
    sleeps: "2 guests (expandable)",
    included: [
      "King bed & bedside tables",
      "Manual curtains & false ceiling",
      "Cassette AC & wardrobe",
      "Full bathroom — fixtures & plumbing",
      "Electricals, septic tank & installation",
    ],
    features: [
      "Mild-steel framework",
      "Industrial-grade materials (30+ yr)",
      "Extreme-weather rated",
      "Minimal automation — rugged & reliable",
    ],
    useCases: ["Glamping venues", "Remote & harsh-climate sites", "Durability-first buyers"],
    roi: "The value workhorse — big views and low fuss make it a dependable rental unit.",
    faqs: [
      { q: "Why choose the Dojopod over a fancier pod?", a: "It strips out the automation and electronics to maximise durability and value — ideal for remote or extreme-weather locations." },
      { q: "Can I add a bedroom later?", a: "Yes — an additional bedroom can be added for ₹7.99L." },
      { q: "Will it handle monsoon and coastal weather?", a: "Yes — the mild-steel frame and industrial-grade materials are rated for India's harshest conditions." },
    ],
    seoTitle: "Dojopod — Rugged Quad Prefab Cabin",
    seoDescription:
      "The Dojopod is a no-frills, industrial-grade quad prefab cabin built for extreme weather — 270 sq ft room, big deck, 30+ yr life. From ₹25L (+₹7.99L bedroom).",
  },
  {
    slug: "gazepod",
    name: "Gazepod",
    family: "retreat",
    tagline: "Seamless Spaces, Amplified Living",
    heroLine: "Live outdoors as much as in.",
    overview:
      "Built over the robust quad pod, the Gazepod adds a large attached gazebo and an expansive deck — blurring the line between indoor comfort and the great outdoors. For hosts and homeowners who want the view to be the living room.",
    image: "/images/renders/boho-031.jpg",
    glance: ["280 sq ft room", "Sleeps 2 (grows)", "325 sq ft deck + gazebo"],
    gallery: [
      "/images/renders/boho-031.jpg",
      "/images/renders/boho-145.jpg",
      "/images/renders/boho-000.jpg",
    ],
    priceFrom: "₹28L",
    addons: [{ label: "Additional bedroom", price: "₹7.99L" }],
    specs: [
      { label: "Room", value: "280 sq ft (15 × 20 ft)" },
      { label: "Bathroom", value: "150 sq ft (15 × 10 ft)" },
      { label: "Deck", value: "325 sq ft (10 × 20 ft)" },
      { label: "Installation area", value: "1,500 sq ft" },
    ],
    sleeps: "2 guests (expandable)",
    included: [
      "King bed & bedside tables",
      "Cassette AC & wardrobe",
      "Full bathroom — fixtures & plumbing",
      "Large attached gazebo",
      "Electricals, septic tank & installation",
    ],
    features: [
      "Massive 325 sq ft deck",
      "Large attached gazebo",
      "Robust quad-pod build",
      "Indoor-outdoor living",
    ],
    useCases: ["Entertainers", "Big-view plots", "Premium homestays"],
    roi: "That big deck photographs beautifully — and books out fast as a hosting space.",
    faqs: [
      { q: "How is the Gazepod different from the Dojopod?", a: "Same robust quad-pod core, but with a large attached gazebo and a much bigger 325 sq ft deck for outdoor living." },
      { q: "How much land do I need?", a: "About 1,500 sq ft of installation area; we'll confirm with a free site survey." },
      { q: "Can I add a bedroom?", a: "Yes — an additional bedroom can be added for ₹7.99L." },
    ],
    seoTitle: "Gazepod — Quad Prefab Cabin with Gazebo",
    seoDescription:
      "The Gazepod pairs the rugged quad pod with a large gazebo and a 325 sq ft deck for true indoor-outdoor living. From ₹28L (+₹7.99L bedroom).",
  },
  // ───────────────────────── Work & Utility ─────────────────────────
  {
    slug: "cocoon",
    name: "Cocoon",
    family: "utility",
    tagline: "Quiet, on demand",
    heroLine: "A pocket of calm, wherever you need it.",
    overview:
      "Our smallest pod — a sound-controlled private space for video calls, meetings and focused work. Designed to boost footfall in cafés and add private rooms to offices and commercial spaces, the Cocoon brings a moment of quiet to busy places.",
    image: "/images/renders/boho-133.jpg",
    imagePlaceholder: true,
    glance: ["4 × 4 ft footprint", "1 person", "Sound-insulated"],
    gallery: ["/images/renders/boho-133.jpg"],
    priceFrom: "₹5L",
    specs: [
      { label: "Room", value: "15 sq ft (4 × 4 ft)" },
      { label: "Installation area", value: "20 sq ft" },
      { label: "Acoustics", value: "Sound-insulated" },
      { label: "Power", value: "2 electric sockets" },
    ],
    sleeps: "1 person (work pod)",
    included: ["Sound insulation", "2 electric sockets", "Electrical fittings", "Installation"],
    features: [
      "Sound-controlled privacy",
      "Compact 4 × 4 ft footprint",
      "Plug-and-play install",
      "Designed for commercial spaces",
    ],
    useCases: ["Cafés & restaurants", "Offices & co-working", "Lobbies & campuses"],
    faqs: [
      { q: "Is the Cocoon a place to stay?", a: "No — it's a work/meeting pod for commercial spaces, giving cafés and offices a private, sound-controlled room for calls and focused work." },
      { q: "How big is it?", a: "A compact 4 × 4 ft footprint needing only ~20 sq ft to install." },
      { q: "Does it need permissions?", a: "As a temporary, free-standing unit it typically needs only nominal approvals — we'll advise for your space." },
    ],
    seoTitle: "Cocoon — Soundproof Work Pod for Cafés & Offices",
    seoDescription:
      "The Cocoon is a compact, sound-insulated work pod for cafés, offices and co-working spaces — private calls and focused work on demand. From ₹5L.",
  },
  {
    slug: "watchpod",
    name: "WatchPod",
    family: "utility",
    tagline: "The humble cabin, beautifully reimagined",
    heroLine: "Built like infrastructure. Finished like art.",
    overview:
      "A modern take on the watchman's cabin — industrial-grade materials engineered for the Indian subcontinent's harshest weather, with the look and feel of an art piece. Function that doesn't compromise on form.",
    image: "/images/renders/boho-143.jpg",
    imagePlaceholder: true,
    glance: ["5 × 10 ft cabin", "Utility", "Industrial-grade"],
    gallery: ["/images/renders/boho-143.jpg"],
    priceFrom: "₹5L",
    specs: [
      { label: "Room", value: "50 sq ft (5 × 10 ft)" },
      { label: "Build", value: "Industrial-grade" },
      { label: "Weather", value: "Subcontinent-rated" },
    ],
    sleeps: "Utility cabin",
    included: ["Industrial-grade shell", "Weather-rated finish", "Electrical fittings", "Installation"],
    features: [
      "Watchman / security cabin",
      "Art-piece aesthetic",
      "Engineered for harsh weather",
      "Compact & quick to install",
    ],
    useCases: ["Security / watchman cabin", "Gate house", "Compact site office", "Ticket booth"],
    faqs: [
      { q: "What's the WatchPod for?", a: "A compact, beautiful utility cabin — perfect as a watchman post, gate house, site office or ticket booth." },
      { q: "Is it weatherproof?", a: "Yes — industrial-grade materials engineered for the Indian subcontinent's harshest conditions." },
    ],
    seoTitle: "WatchPod — Designer Watchman & Utility Cabin",
    seoDescription:
      "The WatchPod reimagines the watchman's cabin as an art piece — industrial-grade, weather-rated and compact. Ideal as a gate house or site office. From ₹5L.",
  },
];

export const retreatPods = pods.filter((p) => p.family === "retreat");
export const utilityPods = pods.filter((p) => p.family === "utility");

/**
 * Family-scale modular homes — priced on the live site but specs/photos are
 * not yet published, so they surface as enquiry cards (no detail page yet).
 */
export const homesTeaser = {
  name: "The 3-BHK",
  tagline: "A full family home — prefab",
  priceFrom: "₹95L",
  altLine: "2-BHK from ₹65L",
  image: "/images/renders/boho-013.jpg",
  blurb: "Our largest modular home. Layouts & specs on request.",
} as const;

export function getPod(slug: string): Pod | undefined {
  return pods.find((p) => p.slug === slug);
}
