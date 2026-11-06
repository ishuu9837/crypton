import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${baseUrl}/projects/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about/`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
