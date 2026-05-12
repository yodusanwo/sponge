import Image from "next/image";

import { heroPhotoAsset } from "@/lib/hero-photo";

type Props = {
  /** Remote URL from admin (Vercel Blob); omit to use bundled optimized hero asset. */
  heroImageUrl?: string | null;
};

/**
 * Full-bleed hero background. Uses `next/image` with `priority` so Next injects
 * a matching `react.preload()` (LCP) with `imageSrcSet` / `imageSizes` on the App Router.
 * `decoding="sync"` keeps the LCP decode on the critical path (avoids async decode delay).
 */
export function HeroBackdrop({ heroImageUrl }: Props) {
  const remote = heroImageUrl?.startsWith("http") ? heroImageUrl : null;

  return (
    <div className="hero-photo">
      {remote ? (
        <Image
          alt=""
          className="hero-photo__img"
          decoding="sync"
          fetchPriority="high"
          fill
          priority
          quality={75}
          sizes="(max-width: 1920px) 100vw, 1920px"
          src={remote}
        />
      ) : (
        <Image
          alt=""
          className="hero-photo__img"
          decoding="sync"
          fetchPriority="high"
          fill
          placeholder="blur"
          priority
          quality={75}
          sizes="(max-width: 1920px) 100vw, 1920px"
          src={heroPhotoAsset}
        />
      )}
      <div aria-hidden className="hero-photo__scrim" />
    </div>
  );
}
