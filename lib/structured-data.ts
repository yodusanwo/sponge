import type { SiteContentMerged } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-data";

const orgId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const webPageId = `${siteUrl}/#webpage`;
const productId = `${siteUrl}/#product`;

function productImageUrl(merged: SiteContentMerged): string {
  const path = merged.ogImageUrl?.startsWith("http")
    ? merged.ogImageUrl
    : merged.heroImageUrl?.startsWith("http")
      ? merged.heroImageUrl
      : "/d5ff481c1acee698881deaf3a069c2a3ac49b01a.jpg";
  return path.startsWith("http") ? path : `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Homepage JSON-LD graph: Organization, WebSite, WebPage, Product (Amazon offer).
 * @see https://schema.org
 */
export function getHomePageJsonLd(merged: SiteContentMerged) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: merged.siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/ChloreID.svg`,
        },
        email: merged.contactEmail,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: merged.contactEmail,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: merged.siteName,
        description: merged.siteDescription,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: siteUrl,
        name: merged.siteName,
        description: merged.siteDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
      },
      {
        "@type": "Product",
        "@id": productId,
        name: "Chore ClarIDy Labeled Cleaning Sponges",
        description: merged.siteDescription,
        brand: {
          "@type": "Brand",
          name: merged.siteName,
        },
        image: productImageUrl(merged),
        offers: {
          "@type": "Offer",
          url: merged.amazonUrl,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}
