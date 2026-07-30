import type { MetadataRoute } from "next";
import { pods } from "@/lib/pods";

const SITE = "https://bohopods.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE}/pods`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/brochure`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...pods.map((pod) => ({
      url: `${SITE}/pods/${pod.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: pod.flagship ? 0.85 : 0.75,
    })),
  ];
}
