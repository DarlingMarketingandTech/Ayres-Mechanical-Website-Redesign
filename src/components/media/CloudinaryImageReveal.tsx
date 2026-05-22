"use client";

import { useEffect, useState, type SyntheticEvent } from "react";
import { CldImage } from "next-cloudinary";

import { cloudinaryLqipUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

import { cloudinaryLayoutDimensions, type CloudinaryImageProps } from "./cloudinary-image-types";

/** Client-only LQIP reveal — use in client islands (heroes). Server sections should use `CloudinaryImage`. */
export function CloudinaryImageReveal({
  asset,
  className,
  disableLqip = false,
  priority = false,
  onLoad,
  fill,
  width,
  height,
  ...props
}: CloudinaryImageProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const skipLqip = disableLqip || prefersReducedMotion;
  const showReveal = !skipLqip;
  const revealComplete = skipLqip || imageLoaded;
  const lqip = cloudinaryLqipUrl(asset);
  const layoutDimensions = cloudinaryLayoutDimensions(asset, fill, width, height);

  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true);
    onLoad?.(e);
  };

  return (
    <span
      className={cn(
        "isolate",
        fill ? "absolute inset-0 block h-full w-full" : "relative inline-block max-w-full",
      )}
    >
      {showReveal ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] bg-cover bg-center transition-opacity duration-700 ease-out motion-reduce:opacity-0",
            revealComplete ? "opacity-0" : "opacity-100",
            "scale-110 blur-3xl motion-reduce:blur-0",
          )}
          style={{ backgroundImage: `url(${lqip})` }}
        />
      ) : null}
      <CldImage
        {...props}
        src={asset.publicId}
        alt={asset.alt}
        priority={priority}
        fill={fill}
        {...layoutDimensions}
        format="auto"
        quality="auto"
        onLoad={handleLoad}
        className={cn(
          "object-cover",
          showReveal && !revealComplete && "relative z-[2] opacity-0",
          showReveal && revealComplete && "relative z-[2] opacity-100",
          showReveal && "transition-opacity duration-500 ease-out",
          className,
        )}
      />
    </span>
  );
}
