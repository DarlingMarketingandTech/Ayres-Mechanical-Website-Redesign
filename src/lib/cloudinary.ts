import type { CloudinaryMediaAsset } from "@/content/media";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djhqowk67";

export function cloudinaryImageUrl(asset: CloudinaryMediaAsset) {
  const versionPath = asset.version ? `v${asset.version}/` : "";

  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/f_auto,q_auto/${versionPath}${asset.publicId}.${asset.format}`;
}

/**
 * Tiny blurred still for CSS overlay “blur-up” reveals (not a Next.js `blurDataURL`).
 * Keeps transforms minimal: responsive width, auto format/quality, heavy blur.
 */
export function cloudinaryLqipUrl(asset: CloudinaryMediaAsset, width = 28) {
  const versionPath = asset.version ? `v${asset.version}/` : "";
  const height = Math.max(2, Math.round((asset.height / asset.width) * width));
  const chain = `w_${width},h_${height},c_fill,f_auto,q_auto:low,e_blur:900`;

  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${chain}/${versionPath}${asset.publicId}.${asset.format}`;
}

/**
 * Brand mark with AI background removal and PNG output for transparency.
 * Uses `e_background_removal` (billable Cloudinary credits) — prefer cached delivery in production for high traffic.
 *
 * @see https://cloudinary.com/documentation/background_removal
 */
export function cloudinaryTransparentLogoUrl(publicId: string, maxWidth: number) {
  const chain = `e_background_removal,c_limit,w_${maxWidth}/f_png,q_auto`;
  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${chain}/${publicId}.png`;
}
