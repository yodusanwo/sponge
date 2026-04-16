"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { trackAmazonOutboundClick } from "@/lib/data-layer";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  /**
   * Set for Amazon CTAs so GTM/GA4 can segment by placement (e.g. hero, nav_desktop).
   */
  ctaLocation?: string;
};

function linkTextFromChildren(children: ReactNode): string | undefined {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return undefined;
}

export function Button({
  href,
  children,
  variant = "primary",
  fullWidth = false,
  ctaLocation,
}: ButtonProps) {
  const isAmazon =
    href.includes("amazon.") || href.includes("amzn.");

  const handleClick = () => {
    if (!isAmazon) return;
    trackAmazonOutboundClick({
      link_url: href,
      cta_location: ctaLocation ?? "button",
      link_text: linkTextFromChildren(children),
    });
  };

  return (
    <Link
      className={`button button--${variant}${fullWidth ? " button--full" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
