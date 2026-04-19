import type { StaticImageData } from "next/image";

import heroPhoto from "../public/30compressed.png";

/** Static import so Next can generate blur placeholder + width/height for LCP. */
export const heroPhotoAsset: StaticImageData = heroPhoto;
