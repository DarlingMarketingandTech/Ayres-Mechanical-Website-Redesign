import type { MetadataRoute } from "next";

import { siteConfig, siteIndexingEnabled } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
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
