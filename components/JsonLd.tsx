import { siteConfig, locations } from "@/lib/site";
import { pods } from "@/lib/pods";

/** Convert brochure-style "₹35L" into INR integer string for Offer schema. */
function inrFromLakh(priceFrom?: string): string | undefined {
  if (!priceFrom) return undefined;
  const m = priceFrom.match(/₹\s*([\d.]+)\s*L/i);
  if (!m) return undefined;
  return String(Math.round(parseFloat(m[1]) * 100_000));
}

/** Sitewide structured data graph for SEO (Organization, LocalBusiness, products). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.domain}/#organization`,
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.domain}/images/logo.png`,
        },
        sameAs: [siteConfig.instagram],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+${siteConfig.phone}`,
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        url: siteConfig.domain,
        name: siteConfig.name,
        description: siteConfig.tagline,
        publisher: { "@id": `${siteConfig.domain}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.domain}/#localbusiness`,
        name: siteConfig.name,
        description:
          "Plug-n-play prefab luxury cabins and glamping pods with Scandinavian design, installed on your land in 30–45 days across India.",
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
          postalCode: "400018",
          addressCountry: "IN",
        },
        sameAs: [siteConfig.instagram],
        areaServed: locations.map((name) => ({
          "@type": "Place",
          name,
        })),
        priceRange: "₹5L–₹95L",
        parentOrganization: { "@id": `${siteConfig.domain}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.domain}/#pod-range`,
        name: "Boho Pods product range",
        numberOfItems: pods.length,
        itemListElement: pods.map((pod, i) => {
          const price = inrFromLakh(pod.priceFrom);
          return {
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.domain}/pods/${pod.slug}`,
            name: pod.name,
            item: {
              "@type": "Product",
              name: `${pod.name} Prefab Pod`,
              description: pod.seoDescription,
              image: `${siteConfig.domain}${pod.image}`,
              brand: { "@type": "Brand", name: siteConfig.name },
              category: "Prefab Cabin",
              ...(price
                ? {
                    offers: {
                      "@type": "Offer",
                      priceCurrency: "INR",
                      price,
                      availability: "https://schema.org/InStock",
                      url: `${siteConfig.domain}/pods/${pod.slug}`,
                    },
                  }
                : {}),
            },
          };
        }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
