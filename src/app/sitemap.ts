import type { MetadataRoute } from "next";

import {
  getSiteConfig,
  getSiteIndexingEnabled,
  getSitemapEntitySlugs,
} from "@/core/repositories/content-repository";
import { routes } from "@/lib/routes";
import { filterRedirectSourcePaths } from "@/lib/site-policy";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!getSiteIndexingEnabled()) {
    return [];
  }

  const siteConfig = getSiteConfig();
  const { serviceSlugs, industrySlugs, locationSlugs } = getSitemapEntitySlugs();

  const staticRoutes = [
    routes.home,
    routes.residential,
    routes.commercial,
    routes.commercialPartnerships,
    routes.services,
    routes.troubleshoot,
    routes.industries,
    routes.about,
    routes.reviews,
    routes.contact,
    routes.requestService,
    routes.financing,
    routes.serviceArea,
    routes.privacy,
    routes.terms,
  ];
  const serviceRoutes = serviceSlugs.map((slug) => routes.service(slug));
  const industryRoutes = industrySlugs.map((slug) => routes.industry(slug));
  const locationRoutes = locationSlugs.map((slug) => routes.location(slug));

  return filterRedirectSourcePaths([...staticRoutes, ...serviceRoutes, ...industryRoutes, ...locationRoutes]).map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    changeFrequency: route === routes.home ? "weekly" : "monthly",
    priority:
      route === routes.home
        ? 1
        : route === routes.residential || route === routes.commercial || route === routes.commercialPartnerships
          ? 0.8
          : 0.7,
  }));
}
