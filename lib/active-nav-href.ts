/** Offset to match fixed header + in-page anchor scroll-margin (see globals.css). */
export function headerScrollOffsetPx(): number {
  if (typeof window === "undefined") return 80;
  return window.matchMedia("(max-width: 900px)").matches ? 80 : 132;
}

/** Which in-page nav href matches the current scroll position. */
export function computeActiveHref(allowedHrefs: string[]): string {
  const sections = document.querySelectorAll<HTMLElement>("main section[id]");
  if (!sections.length) return "";

  const offset = headerScrollOffsetPx();
  const y = window.scrollY + offset + 1;

  let active = "";
  sections.forEach((sec) => {
    const id = sec.id;
    if (!id) return;
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (top <= y) {
      active = `#${id}`;
    }
  });

  return active && allowedHrefs.includes(active) ? active : "";
}
