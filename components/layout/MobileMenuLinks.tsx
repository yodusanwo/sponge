"use client";

import Link from "next/link";

import { useActiveNavHref } from "@/hooks/useActiveNavHref";
import type { NavItem } from "@/lib/site-data";

export function MobileMenuLinks({ items }: { items: NavItem[] }) {
  const activeHref = useActiveNavHref(items);

  return (
    <>
      {items.map((item) => (
        <Link
          key={item.href}
          aria-current={activeHref === item.href ? "location" : undefined}
          className={
            activeHref === item.href
              ? "mobile-menu__link mobile-menu__link--active"
              : "mobile-menu__link"
          }
          href={item.href}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
