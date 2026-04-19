"use client";

import { useEffect, useMemo, useState } from "react";

import { computeActiveHref } from "@/lib/active-nav-href";
import type { NavItem } from "@/lib/site-data";

export function useActiveNavHref(items: NavItem[]): string {
  const hrefs = useMemo(() => items.map((i) => i.href), [items]);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const update = () => setActiveHref(computeActiveHref(hrefs));

    update();
    const t1 = window.setTimeout(update, 0);
    const t2 = window.setTimeout(update, 400);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("hashchange", update);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [hrefs]);

  return activeHref;
}
