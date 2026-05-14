import type { CloudinaryMediaAsset } from "@/content/media";

const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djhqowk67";

export function cloudinaryImageUrl(asset: CloudinaryMediaAsset) {
  const versionPath = asset.version ? `v${asset.version}/` : "";

  return `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload/f_auto,q_auto/${versionPath}${asset.publicId}.${asset.format}`;
}
