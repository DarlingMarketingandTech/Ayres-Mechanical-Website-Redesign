import type { MetadataRoute } from "next";

import { industries } from "@/content/industries";
import { serviceLocations } from "@/content/locations";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [routes.home, routes.services, routes.industries, routes.about, routes.reviews, routes.contact, routes.requestService, routes.financing, routes.serviceArea, routes.privacy, routes.terms];
  const serviceRoutes = services.map((service) => routes.service(service.slug));
  const industryRoutes = industries.map((industry) => routes.industry(industry.slug));
  const locationRoutes = serviceLocations.map((location) => routes.location(location.slug));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...locationRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: route === routes.home ? "weekly" : "monthly",
    priority: route === routes.home ? 1 : 0.7,
  }));
}
