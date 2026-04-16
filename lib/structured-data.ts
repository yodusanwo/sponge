import { amazonUrl, contactEmail, siteDescription, siteName, siteUrl } from "./site-data";

const orgId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const webPageId = `${siteUrl}/#webpage`;
const productId = `${siteUrl}/#product`;

/**
 * Homepage JSON-LD graph: Organization, WebSite, WebPage, Product (Amazon offer).
 * @see https://schema.org
 */
export function getHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteName,
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/ChloreID.svg`,
        },
        email: contactEmail,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: contactEmail,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
      },
      {
        "@type": "Product",
        "@id": productId,
        name: "Chore ClarIDy Labeled Cleaning Sponges",
        description: siteDescription,
        brand: {
          "@type": "Brand",
          name: siteName,
        },
        image: `${siteUrl}/30.png`,
        offers: {
          "@type": "Offer",
          url: amazonUrl,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };
}
