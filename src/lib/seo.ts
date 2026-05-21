import type { Metadata } from "next";

import { siteConfig, siteIndexingEnabled } from "@/content/site";

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export const robotsMetadata: Metadata["robots"] = {
  index: siteIndexingEnabled,
  follow: siteIndexingEnabled,
  googleBot: {
    index: siteIndexingEnabled,
    follow: siteIndexingEnabled,
    "max-image-preview": siteIndexingEnabled ? "large" : "none",
    "max-snippet": siteIndexingEnabled ? -1 : 0,
    "max-video-preview": siteIndexingEnabled ? -1 : 0,
  },
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    robots: robotsMetadata,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
