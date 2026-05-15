import type { CloudinaryMediaAsset } from "@/lib/cloudinary-assets";
import type { CloudinaryImagePreset } from "@/lib/cloudinary-image-presets";
import { presetToTransformSegment } from "@/lib/cloudinary-image-presets";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djhqowk67";

export type CloudinaryImageUrlOptions = {
  preset?: CloudinaryImagePreset;
  /** Additional Cloudinary transform tokens appended after `f_auto,q_auto,` */
  extraTransforms?: string;
};

function buildTransformChain(options?: CloudinaryImageUrlOptions): string {
  const parts: string[] = [];
  if (options?.preset) {
    parts.push(presetToTransformSegment(options.preset));
  }
  if (options?.extraTransforms) {
    parts.push(options.extraTransforms);
  }
  if (!parts.length) {
    return "f_auto,q_auto";
  }
  return `f_auto,q_auto,${parts.join(",")}`;
}

export function cloudinaryImageUrl(asset: CloudinaryMediaAsset, options?: CloudinaryImageUrlOptions) {
  const versionPath = asset.version ? `v${asset.version}/` : "";
  const transforms = buildTransformChain(options);

  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/${transforms}/${versionPath}${asset.publicId}.${asset.format}`;
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
