import { cache } from "react";

import {
  amazonUrl as defaultAmazonUrl,
  contactEmail as defaultContactEmail,
  siteDescription as defaultSiteDescription,
  siteName as defaultSiteName,
} from "@/lib/site-data";
import { prisma } from "@/lib/prisma";

const DEFAULT_ID = "default";

export const DEFAULT_HERO_TITLE = "Stop wondering where that sponge has been";

export const DEFAULT_HERO_LEAD =
  "4 clearly labeled sponges — one for dishes, kitchen counters, bathroom counters, and the toilet. No mix-ups. No second-guessing. Just clean.";

/** Resolved values for the public site (defaults + DB overrides). */
export type SiteContentMerged = {
  siteName: string;
  siteDescription: string;
  amazonUrl: string;
  contactEmail: string;
  heroTitle: string;
  heroLead: string;
  heroImageUrl: string | null;
  ogImageUrl: string | null;
};

function merge(row: {
  siteName: string | null;
  siteDescription: string | null;
  amazonUrl: string | null;
  contactEmail: string | null;
  heroTitle: string | null;
  heroLead: string | null;
  heroImageUrl: string | null;
  ogImageUrl: string | null;
} | null): SiteContentMerged {
  return {
    siteName: row?.siteName?.trim() || defaultSiteName,
    siteDescription: row?.siteDescription?.trim() || defaultSiteDescription,
    amazonUrl: row?.amazonUrl?.trim() || defaultAmazonUrl,
    contactEmail: row?.contactEmail?.trim() || defaultContactEmail,
    heroTitle: row?.heroTitle?.trim() || DEFAULT_HERO_TITLE,
    heroLead: row?.heroLead?.trim() || DEFAULT_HERO_LEAD,
    heroImageUrl: row?.heroImageUrl?.trim() || null,
    ogImageUrl: row?.ogImageUrl?.trim() || null,
  };
}

async function loadSiteContent(): Promise<SiteContentMerged> {
  if (!process.env.DATABASE_URL) {
    return merge(null);
  }
  try {
    const row = await prisma.siteContent.findUnique({
      where: { id: DEFAULT_ID },
    });
    return merge(row);
  } catch (e) {
    console.error("[getSiteContent]", e);
    return merge(null);
  }
}

/** Deduped per request (layout + generateMetadata + page). */
export const getSiteContent = cache(loadSiteContent);

export function ogImagePath(merged: SiteContentMerged): string {
  if (merged.ogImageUrl?.startsWith("http")) {
    return merged.ogImageUrl;
  }
  if (merged.heroImageUrl?.startsWith("http")) {
    return merged.heroImageUrl;
  }
  return "/d5ff481c1acee698881deaf3a069c2a3ac49b01a.jpg";
}
