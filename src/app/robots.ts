import type { MetadataRoute } from "next";

import {
  getSiteConfig,
  getSiteIndexingEnabled,
} from "@/core/repositories/content-repository";

export default function robots(): MetadataRoute.Robots {
  const siteConfig = getSiteConfig();
  const siteIndexingEnabled = getSiteIndexingEnabled();

  return {
    rules: siteIndexingEnabled
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: siteIndexingEnabled ? new URL("/sitemap.xml", siteConfig.url).toString() : undefined,
    host: siteIndexingEnabled ? siteConfig.url : undefined,
  };
}
