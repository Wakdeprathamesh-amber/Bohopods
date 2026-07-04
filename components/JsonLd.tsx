import { siteConfig } from "@/lib/site";

/** Structured data for SEO (LocalBusiness). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description:
      "Plug-n-play prefab luxury cabins & glamping pods with Scandinavian design, installed on your land in 30–45 days across India.",
    url: siteConfig.domain,
    telephone: `+${siteConfig.phone}`,
    email: siteConfig.email,
    image: `${siteConfig.domain}/og.jpg`,
    logo: `${siteConfig.domain}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zahra Building, Office 303-B, E Moses Road, Worli",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [siteConfig.instagram],
    areaServed: [
      "Lonavala",
      "Alibaug",
      "Goa",
      "Mahabaleshwar",
      "Coorg",
      "Maharashtra, India",
    ],
    priceRange: "₹₹₹",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
