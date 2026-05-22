import Image from "next/image";

import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

import { cloudinaryLayoutDimensions, type CloudinaryImageProps } from "./cloudinary-image-types";

function stringTransformValue(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : undefined;
}

export function CloudinaryImageServer({
  asset,
  className,
  priority = false,
  fill,
  width,
  height,
  sizes,
  onLoad,
  crop,
  gravity,
  aspectRatio,
  ...props
}: CloudinaryImageProps) {
  void props;
  const src = cloudinaryImageUrl(asset, {
    width: fill ? width : undefined,
    height: fill ? height : undefined,
    crop: stringTransformValue(crop),
    gravity: stringTransformValue(gravity),
    aspectRatio: stringTransformValue(aspectRatio),
  });
  const layoutDimensions = cloudinaryLayoutDimensions(asset, fill, width, height);

  return (
    <span
      className={cn(
        "isolate",
        fill ? "absolute inset-0 block h-full w-full" : "relative inline-block max-w-full",
      )}
    >
      <Image
        src={src}
        alt={asset.alt}
        priority={priority}
        fill={fill}
        sizes={sizes}
        {...layoutDimensions}
        onLoad={onLoad}
        className={cn("object-cover", className)}
      />
    </span>
  );
}
