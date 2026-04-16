"use client";

import Image from "next/image";
import Link from "next/link";
import type { ComponentProps } from "react";

import { trackAmazonOutboundClick } from "@/lib/data-layer";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  ctaLocation: string;
  linkText?: string;
};

/**
 * Footer / non-Button Amazon links — same dataLayer event as {@link Button} for Amazon hrefs.
 */
export function TrackedAmazonLink({
  href,
  ctaLocation,
  linkText,
  children,
  ...rest
}: Props) {
  const url = typeof href === "string" ? href : "";

  return (
    <Link
      href={href}
      onClick={() => {
        if (url.includes("amazon.") || url.includes("amzn.")) {
          trackAmazonOutboundClick({
            link_url: url,
            cta_location: ctaLocation,
            link_text: linkText,
          });
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Pre-styled footer “Available at Amazon” badge with tracking. */
export function TrackedAmazonBadgeLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <TrackedAmazonLink
      className={className}
      ctaLocation="footer_amazon_badge"
      href={href}
      linkText="Available at Amazon"
      rel="noreferrer"
      target="_blank"
    >
      <Image
        alt="Available at Amazon"
        height={44.476}
        src="/app-store-badge-amazon 1.png"
        width={149.5}
      />
    </TrackedAmazonLink>
  );
}
