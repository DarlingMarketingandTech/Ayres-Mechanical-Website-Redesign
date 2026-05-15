import Image, { type ImageProps } from "next/image";

import {
  CLOUDINARY_ASSETS,
  type CloudinaryAssetId,
  type CloudinaryMediaAsset,
  registryToMediaAsset,
} from "@/lib/cloudinary-assets";
import type { CloudinaryImagePreset } from "@/lib/cloudinary-image-presets";
import { cloudinaryImageUrl, type CloudinaryImageUrlOptions } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

type SharedCloudinaryImageProps = Omit<ImageProps, "src" | "alt"> & {
  alt?: string;
  preset?: CloudinaryImagePreset;
  extraTransforms?: string;
  className?: string;
};

export type CloudinaryImageProps = SharedCloudinaryImageProps &
  (
    | { assetKey: CloudinaryAssetId; asset?: undefined }
    | { asset: CloudinaryMediaAsset; assetKey?: undefined }
  );

/**
 * Optimized Cloudinary delivery via `next/image`.
 * When `fill` is true, wrap with a `relative` positioned parent and pass `sizes`.
 */
export function CloudinaryImage({
  assetKey,
  asset: assetProp,
  alt,
  preset,
  extraTransforms,
  className,
  fill,
  sizes,
  priority,
  ...rest
}: CloudinaryImageProps) {
  const resolved = assetProp ?? (assetKey ? registryToMediaAsset(CLOUDINARY_ASSETS[assetKey]) : null);
  if (!resolved) {
    throw new Error("CloudinaryImage requires `assetKey` or `asset`.");
  }

  const urlOptions: CloudinaryImageUrlOptions = { preset, extraTransforms };
  const src = cloudinaryImageUrl(resolved, urlOptions);
  const altText = alt ?? resolved.alt;
  const resolvedSizes = sizes ?? (fill ? "100vw" : undefined);

  if (fill) {
    return (
      <Image
        {...rest}
        fill
        src={src}
        alt={altText}
        sizes={resolvedSizes}
        priority={priority}
        className={cn(className)}
      />
    );
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={altText}
      width={resolved.width}
      height={resolved.height}
      sizes={resolvedSizes}
      priority={priority}
      className={cn(className)}
    />
  );
}
