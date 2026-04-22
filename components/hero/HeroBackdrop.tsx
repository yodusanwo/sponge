import Image from "next/image";

import { heroPhotoAsset } from "@/lib/hero-photo";

type Props = {
  /** Remote URL from admin (Vercel Blob); omit to use bundled optimized hero asset. */
  heroImageUrl?: string | null;
};

/**
 * Full-bleed hero background. Uses `next/image` with `priority` so Next injects
 * a matching `react.preload()` (LCP) with `imageSrcSet` / `imageSizes` on the App Router.
 */
export function HeroBackdrop({ heroImageUrl }: Props) {
  const remote = heroImageUrl?.startsWith("http") ? heroImageUrl : null;

  return (
    <div className="hero-photo">
      {remote ? (
        <Image
          alt=""
          className="hero-photo__img"
          fetchPriority="high"
          fill
          priority
          sizes="100vw"
          src={remote}
        />
      ) : (
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
      )}
      <div aria-hidden className="hero-photo__scrim" />
    </div>
  );
}
