"use client";

import Link from "next/link";

import { useActiveNavHref } from "@/hooks/useActiveNavHref";
import type { NavItem } from "@/lib/site-data";

export function DesktopNavLinks({ items }: { items: NavItem[] }) {
  const activeHref = useActiveNavHref(items);

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          aria-current={activeHref === item.href ? "location" : undefined}
          className={
            activeHref === item.href
              ? "nav-links__link nav-links__link--active"
              : "nav-links__link"
          }
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
