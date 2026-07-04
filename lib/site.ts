/**
 * BOHO PODS — central content & config.
 * Single source of truth for copy, links and the WhatsApp conversion layer.
 * (See /docs for the full brand + product context.)
 */

export const siteConfig = {
  name: "Boho Pods",
  legalName: "Boho Pods",
  tagline: "Plug-n-Play Prefab Cabins with Scandinavian Design",
  domain: "https://bohopods.com",
  phoneDisplay: "+91 98197 79900",
  phone: "919819779900",
  whatsapp: "919137578427",
  email: "hello@bohopods.com",
  instagram: "https://instagram.com/bohopods",
  instagramHandle: "@bohopods",
  address: "Zahra Building, Office 303-B, E Moses Road, Worli, Mumbai, Maharashtra, India",
} as const;

/** Build a WhatsApp deep-link with an optional pre-filled message. */
export function waLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Context-aware pre-filled WhatsApp messages. */
export const waMsg = {
  siteVisit: "Hi Boho Pods 👋 I'd like to book a site visit. Please share the next steps.",
  general: "Hi Boho Pods 👋 I'd love to know more about your prefab pods.",
  gatsby: "Hi Boho Pods! I'm interested in the Gatsby flagship pod — please share details & pricing.",
  ownership: "Hi Boho Pods! I'd like to understand the ownership & revenue-share / ROI options.",
  pod: (name: string) => `Hi Boho Pods! I'm interested in the ${name} pod — please share details & pricing.`,
};

export const nav = [
  { label: "Why Boho", href: "/#why" },
  { label: "The Pods", href: "/pods" },
  { label: "Ownership", href: "/#ownership" },
  { label: "Process", href: "/#process" },
  { label: "Locations", href: "/#locations" },
  { label: "FAQ", href: "/#faq" },
  { label: "Brochure", href: "/brochure" },
] as const;

export type Pod = {
  id: string;
  name: string;
  tagline: string;
  blurb: string;
  priceFrom?: string;
  image: string;
  featured?: boolean;
};

export const pods: Pod[] = [
  {
    id: "gatsby",
    name: "Gatsby",
    tagline: "The New Era of Modular Living",
    blurb:
      "Our flagship. A spacious living area and bedroom wrapped around a nature-filled central courtyard, under a skylit roofline — with a massive front deck for ultimate luxury.",
    priceFrom: "₹35L",
    image: "/images/renders/boho-013.jpg",
    featured: true,
  },
  {
    id: "nomad",
    name: "Nomad",
    tagline: "Work · Rest · Roam",
    blurb:
      "A secluded sanctuary for the modern wanderer and remote worker — proof that true luxury doesn't need a big footprint, just intelligent design.",
    priceFrom: "₹20L",
    image: "/images/renders/boho-125.jpg",
  },
  {
    id: "dojopod",
    name: "Dojopod",
    tagline: "Panoramas on a Budget",
    blurb:
      "Spacious volume and wide openings that capture the essence of outdoor living — panoramic views inside a secure, weather-tight shell.",
    priceFrom: "₹25L",
    image: "/images/renders/boho-149.jpg",
  },
  {
    id: "quadpod",
    name: "Quadpod",
    tagline: "Seamless Spaces, Amplified Living",
    blurb:
      "A massive covered deck and sweeping roofline that completely blur the line between indoor comfort and the great outdoors.",
    priceFrom: "₹28L",
    image: "/images/renders/boho-031.jpg",
  },
  {
    id: "flo",
    name: "Flo",
    tagline: "Fluid Lines, Unbound Space",
    blurb:
      "A unique footprint of curves and angles with an expansive deck — designed for seamless, free-flowing outdoor living.",
    priceFrom: "₹28L",
    image: "/images/renders/boho-065.jpg",
  },
  {
    id: "curv",
    name: "Curv",
    tagline: "Focused Vistas, Elegant Curves",
    blurb:
      "A striking curvilinear roofline and an extended front deck, shaped to frame your view perfectly.",
    priceFrom: "₹25L",
    image: "/images/renders/boho-143.jpg",
  },
];

export const pillars = [
  { icon: "Compass", title: "Thoughtful Design", body: "Scandinavian simplicity, modern functionality — spaces that speak to you." },
  { icon: "CalendarClock", title: "From Idea to Escape", body: "Booking to handover in weeks — not the years a conventional villa takes." },
  { icon: "Blocks", title: "Modular by Nature", body: "Flexible layouts and add-ons that grow and move with you." },
  { icon: "Wallet", title: "Smart Ownership", body: "Outright, EMI, lease or revenue-share — made genuinely accessible." },
  { icon: "Users", title: "A Community of Pioneers", body: "Join modern landowners turning plots into living experiences." },
  { icon: "Leaf", title: "In Tune with Nature", body: "Glass walls and open decks dissolve the line between inside and out — you live with the view, not beside it." },
] as const;

export const advantages = [
  { icon: "FileCheck", title: "Temporary Structure", body: "Classified as temporary — doesn't count toward FSI." },
  { icon: "Hourglass", title: "30+ Year Lifespan", body: "Industrial-grade build, made to endure." },
  { icon: "Wrench", title: "AMC Program", body: "Ongoing annual maintenance & after-sales care." },
  { icon: "Plug", title: "Plug & Play", body: "Arrives ready — quick, clean on-site install." },
  { icon: "CloudSun", title: "Weather Tolerance", body: "Engineered for Indian extremes, coast to ghats." },
  { icon: "Stamp", title: "No Municipal Permissions", body: "Skip the red tape; CRZ-1 friendly with nominal approvals." },
] as const;

export const steps = [
  { k: "Select", title: "Select", body: "Meet us, choose your pod and confirm your plot. Booking starts the journey." },
  { k: "Install", title: "Install", body: "We survey, prep the site and build your prefab cabin — typically 30–45 days." },
  { k: "Stay", title: "Stay", body: "Handover day. Step in, breathe out, and start making memories." },
] as const;

export const ownership = [
  { title: "Outright Purchase", body: "A simple 20:20:20:20 payment spread across the build." },
  { title: "EMI", body: "From ₹5L down, over 6 or 12 months (subject to approval)." },
  { title: "Lease Program", body: "₹5L down + ₹50k/month, 5-yr term — ideal for micro-resorts." },
  { title: "Revenue Share", body: "50:50 or 70:30 splits. ROI in 1–2 years on Airbnb, StayVista & Booking.com." },
] as const;

export const stats = [
  { value: 45, prefix: "", suffix: "", label: "Days to install*", note: "*30–45 days" },
  { value: 30, prefix: "", suffix: "+ yrs", label: "Built to last" },
  { value: 12, prefix: "", suffix: "+", label: "Pod models" },
  { value: 2, prefix: "1–", suffix: " yrs", label: "Typical ROI" },
] as const;

export const testimonials = [
  { name: "Ravi Chabbra", quote: "Absolutely love the open, airy design — and the build quality is top-notch." },
  { name: "Prasad Gadgil", quote: "The craftsmanship is incredible. It's perfect for work or relaxation." },
  { name: "Ritika Keswani", quote: "Sleek, modern, and built to last. Exactly what we hoped for." },
  { name: "Amar A.", quote: "Stunning pod, and the service was friendly and timely throughout." },
  { name: "Gaurang", quote: "The perfect mix of style and practicality." },
  { name: "Arushi Agarwal", quote: "Beautifully made, with a great sense of space." },
] as const;

export const faqs = [
  { q: "Are prefab pods actually durable?", a: "Yes. Boho Pods are built from industrial-grade materials engineered for a 30+ year lifespan and Indian weather extremes — from coastal humidity to ghat monsoons." },
  { q: "Do I need municipal permissions?", a: "Generally no. Pods are classified as temporary structures (they don't count toward FSI) and can sit in CRZ-1 zones with only nominal permissions." },
  { q: "How do I pay — can I finance it?", a: "Choose what suits you: outright (20:20:20:20), EMI from ₹5L down, a lease program, or a revenue-share model." },
  { q: "How long does installation take?", a: "Most of the build happens in our factory. On-site it's plug-and-play — typically a 30–45 day timeline from booking to handover." },
  { q: "Will it work on my plot?", a: "Most likely. We run a free site survey to confirm access and placement. Around 1,000–2,000 sq ft is enough to also earn rental income." },
  { q: "Can it earn me money?", a: "Yes — many owners list on Airbnb, StayVista and Booking.com and see ROI within 1–2 years, with 50:50 or 70:30 revenue-share options available." },
  { q: "What happens after handover?", a: "Our AMC program keeps your pod in top shape with ongoing maintenance and after-sales support." },
] as const;

export const locations = [
  "Lonavala", "Khandala", "Alibaug", "Mahabaleshwar", "Panchgani",
  "Karjat", "Nashik", "Igatpuri", "Goa", "Coorg", "Kodaikanal",
] as const;

export const experiences = [
  { name: "The Tent", capacity: "3 guests", price: "₹10,000 / night" },
  { name: "The Circle", capacity: "2 guests", price: "₹15,000 / night" },
  { name: "The Villa", capacity: "2-BHK", price: "₹50,000 / night" },
] as const;
