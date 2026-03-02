import type { MetadataRoute } from "next";

import { artworks, exhibitions, journalPosts } from "@/data/content";

const base = "https://dreamagic.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/home",
    "/works",
    "/exhibitions",
    "/artist",
    "/visit",
    "/journal",
    "/contacts",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "/home" ? 1 : 0.7,
    })),
    ...artworks.map((item) => ({
      url: `${base}/works/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...exhibitions.map((item) => ({
      url: `${base}/exhibitions/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...journalPosts.map((item) => ({
      url: `${base}/journal#${item.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
