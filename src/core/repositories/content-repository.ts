/**
 * Read-only content access for server routes and metadata.
 * Source files live in `src/content` and `src/data`; this layer is the DAL boundary.
 * Prefer cached accessors in `src/core/cache` for RSC pages.
 */

import { industries } from "@/content/industries";
import { serviceLocations } from "@/content/locations";
import { services } from "@/content/services";
import { siteConfig, siteIndexingEnabled } from "@/content/site";
import { servicePageContent } from "@/data/services-content";

export function getSiteConfig() {
  return siteConfig;
}

export function getSiteIndexingEnabled() {
  return siteIndexingEnabled;
}

export function getServicesCatalog() {
  return services;
}

export function getIndustriesCatalog() {
  return industries;
}

export function getServiceLocationsCatalog() {
  return serviceLocations;
}

export function getServicePageContentCatalog() {
  return servicePageContent;
}

export function getSitemapEntitySlugs() {
  return {
    serviceSlugs: services.map((service) => service.slug),
    industrySlugs: industries.map((industry) => industry.slug),
    locationSlugs: serviceLocations.map((location) => location.slug),
  };
}
