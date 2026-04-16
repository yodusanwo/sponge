import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-data";

/**
 * Served at `/sitemap.xml`.
 * Submit in Google Search Console: https://search.google.com/search-console → Sitemaps →
 * `https://choreclaridy.com/sitemap.xml` (or your live domain).
 *
 * Add more `{ url, lastModified, ... }` objects when new pages ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
