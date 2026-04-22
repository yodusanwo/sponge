import type { StaticImageData } from "next/image";

import heroPhoto from "../public/d5ff481c1acee698881deaf3a069c2a3ac49b01a.jpg";

/** Static import so Next can generate blur placeholder + width/height for LCP. */
export const heroPhotoAsset: StaticImageData = heroPhoto;
