import { siteConfig } from "@/content/site";

export const brand = {
  blue: "#0D3FB8",
  blueDark: "#0A1A44",
  red: "#D71920",
  gray: "#6B7280",
  grayLight: "#E5E7EB",
  white: "#F3F4F6",
  black: "#101014",
} as const;

export const phoneHref = `tel:${siteConfig.phoneE164}`;
export const emailHref = siteConfig.email ? `mailto:${siteConfig.email}` : null;
