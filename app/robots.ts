import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-data";

/** Served at `/robots.txt` — references `/sitemap.xml` for Search Console / crawlers. */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
