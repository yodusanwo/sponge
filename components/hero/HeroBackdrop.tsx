import Image from "next/image";

import { heroPhotoAsset } from "@/lib/hero-photo";

/**
 * Full-bleed hero background. Uses `next/image` with `priority` so Next injects
 * a matching `react.preload()` (LCP) with `imageSrcSet` / `imageSizes` on the App Router.
 */
export function HeroBackdrop() {
  return (
    <div className="hero-photo">
      <Image
        alt=""
        className="hero-photo__img"
        fetchPriority="high"
        fill
        placeholder="blur"
        priority
        sizes="100vw"
        src={heroPhotoAsset}
      />
      <div aria-hidden className="hero-photo__scrim" />
    </div>
  );
}
