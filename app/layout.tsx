import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, Poppins } from "next/font/google";

import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteContent, ogImagePath } from "@/lib/site-content";
import { getHomePageJsonLd } from "@/lib/structured-data";
import { gtmId, siteUrl } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  variable: "--font-heading",
});

export async function generateMetadata(): Promise<Metadata> {
  const merged = await getSiteContent();
  const img = ogImagePath(merged);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: merged.siteName,
      template: `%s | ${merged.siteName}`,
    },
    description: merged.siteDescription,
    keywords: [
      "Chore ClarIDy",
      "labeled sponges",
      "cleaning sponges",
      "kitchen sponges",
      "household cleaning",
    ],
    authors: [{ name: merged.siteName }],
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/ChloreID.svg",
      shortcut: "/ChloreID.svg",
      apple: "/ChloreID.svg",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: merged.siteName,
      title: merged.siteName,
      description: merged.siteDescription,
      images: [
        {
          url: img,
          alt: `${merged.siteName} labeled cleaning sponges`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: merged.siteName,
      description: merged.siteDescription,
      images: [img],
    },
    robots: {
      index: true,
      follow: true,
    },
    verification: {
      google: "googlecb37c56f958e960d.html",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const merged = await getSiteContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId={gtmId} />
      <body
        className={`${inter.variable} ${poppins.variable} ${inter.className}`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <JsonLd data={getHomePageJsonLd(merged)} />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
