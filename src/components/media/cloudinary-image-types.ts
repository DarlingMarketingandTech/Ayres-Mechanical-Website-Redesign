import type { CldImageProps } from "next-cloudinary";

import type { CloudinaryMediaAsset } from "@/content/media";

export type CloudinaryImageProps = Omit<CldImageProps, "src" | "quality" | "alt"> & {
  asset: CloudinaryMediaAsset;
  /** Skip LQIP overlay (small logos, marks). */
  disableLqip?: boolean;
  /** When true, hints LCP priority for above-the-fold heroes. */
  priority?: boolean;
};

export function cloudinaryLayoutDimensions(
  asset: CloudinaryMediaAsset,
  fill: boolean | undefined,
  width?: number | `${number}`,
  height?: number | `${number}`,
) {
  const resolvedWidth = width ?? asset.width;
  const resolvedHeight = height ?? asset.height;
  return fill ? {} : { width: resolvedWidth, height: resolvedHeight };
}
