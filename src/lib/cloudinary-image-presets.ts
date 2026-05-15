/**
 * Standard delivery presets for Cloudinary `f_auto,q_auto` chains.
 * Values are appended after `f_auto,q_auto,` (dimension caps and focal hints).
 */
export type CloudinaryImagePreset = "hero" | "card" | "logo" | "badge" | "team" | "commercial" | "thumbnail";

const PRESET_TRANSFORM_SUFFIX: Record<CloudinaryImagePreset, string> = {
  hero: "c_limit,w_1920,h_1280",
  card: "c_limit,w_960,h_640",
  logo: "c_limit,w_720",
  badge: "c_limit,w_420",
  team: "c_limit,w_1400,h_1050",
  commercial: "c_limit,w_1800,h_1200",
  thumbnail: "c_limit,w_480,h_320",
};

export function presetToTransformSegment(preset: CloudinaryImagePreset): string {
  return PRESET_TRANSFORM_SUFFIX[preset];
}
