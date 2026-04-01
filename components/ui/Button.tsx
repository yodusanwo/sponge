"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  fullWidth = false,
}: ButtonProps) {
  return (
    <Link
      className={`button button--${variant}${fullWidth ? " button--full" : ""}`}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
