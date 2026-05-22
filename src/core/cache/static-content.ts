import { cacheLife } from "next/cache";

import {
  getIndustryBySlug as getIndustryBySlugSync,
  industries,
  type Industry,
} from "@/content/industries";
import {
  getLocationBySlug as getLocationBySlugSync,
  serviceLocations,
  type ServiceLocation,
} from "@/content/locations";
import { homeFaqs } from "@/content/faqs";
import { media } from "@/content/media";
import { regionalDispatchCounties } from "@/content/regional-dispatch";
import { services } from "@/content/services";
import { siteConfig, siteIndexingEnabled } from "@/content/site";
import { reviewSummary, testimonials } from "@/content/testimonials";
import {
  getServiceContentBySlug as getServiceContentBySlugSync,
  servicePageContent,
  type ServiceContent,
} from "@/data/services-content";

/** Cached current year for footer copyright (daily refresh). */
export async function getCachedCopyrightYear(): Promise<number> {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function getCachedSiteConfig() {
  "use cache";
  cacheLife("max");
  return siteConfig;
}

export async function getCachedSiteIndexingEnabled() {
  "use cache";
  cacheLife("max");
  return siteIndexingEnabled;
}

export async function getCachedMedia() {
  "use cache";
  cacheLife("max");
  return media;
}

export async function getCachedServices() {
  "use cache";
  cacheLife("max");
  return services;
}

export async function getCachedHomeFaqs() {
  "use cache";
  cacheLife("max");
  return homeFaqs;
}

export async function getCachedTestimonials() {
  "use cache";
  cacheLife("max");
  return testimonials;
}

export async function getCachedReviewSummary() {
  "use cache";
  cacheLife("max");
  return reviewSummary;
}

export async function getCachedRegionalDispatchCounties() {
  "use cache";
  cacheLife("max");
  return regionalDispatchCounties;
}

export async function getCachedServicePageContent(): Promise<ServiceContent[]> {
  "use cache";
  cacheLife("max");
  return servicePageContent;
}

export async function getCachedServiceContentBySlug(slug: string): Promise<ServiceContent | undefined> {
  "use cache";
  cacheLife("max");
  return getServiceContentBySlugSync(slug);
}

export async function getCachedServiceLocations(): Promise<ServiceLocation[]> {
  "use cache";
  cacheLife("max");
  return serviceLocations;
}

export async function getCachedLocationBySlug(slug: string): Promise<ServiceLocation | undefined> {
  "use cache";
  cacheLife("max");
  return getLocationBySlugSync(slug);
}

export async function getCachedIndustries(): Promise<Industry[]> {
  "use cache";
  cacheLife("max");
  return industries;
}

export async function getCachedIndustryBySlug(slug: string): Promise<Industry | undefined> {
  "use cache";
  cacheLife("max");
  return getIndustryBySlugSync(slug);
}
