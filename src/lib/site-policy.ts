import { serviceSlugs } from "@/data/services-content";
import { routeRedirects } from "@/lib/route-redirects";
import { routes } from "@/lib/routes";

export type AudienceLane = "residential" | "commercial";

export const residentialServiceSlugs = [
  serviceSlugs.heating,
  serviceSlugs.airConditioning,
  serviceSlugs.ductless,
  serviceSlugs.indoorAirQuality,
  serviceSlugs.preventiveMaintenance,
] as const;

export const commercialServiceSlugs = [serviceSlugs.commercial, serviceSlugs.industrial] as const;

export const sharedServiceSlugs = [serviceSlugs.twentyFourHourEmergency] as const;

const residentialServiceSlugSet = new Set<string>(residentialServiceSlugs);
const commercialServiceSlugSet = new Set<string>(commercialServiceSlugs);
const sharedServiceSlugSet = new Set<string>(sharedServiceSlugs);

export const navigationLaneDefinitions = {
  residential: {
    label: "Residential",
    href: routes.residential,
    description: "Heating, cooling, maintenance, and indoor comfort help for Central Indiana homes.",
    overviewLabel: "Residential Overview",
    serviceSlugs: residentialServiceSlugs,
    includeEmergency: true,
  },
  commercial: {
    label: "Commercial",
    href: routes.commercial,
    description: "Commercial diagnostics, rooftop unit service, planned maintenance, and facility support.",
    overviewLabel: "Commercial Overview",
    serviceSlugs: commercialServiceSlugs,
    includeEmergency: true,
  },
} as const satisfies Record<
  AudienceLane,
  {
    label: string;
    href: string;
    description: string;
    overviewLabel: string;
    serviceSlugs: readonly string[];
    includeEmergency: boolean;
  }
>;

const redirectSourceSet = new Set(routeRedirects.map((redirect) => redirect.source));

function getServiceSlugFromPath(pathname: string) {
  if (!pathname.startsWith(`${routes.services}/`)) {
    return null;
  }

  return pathname.slice(routes.services.length + 1).split("/")[0] ?? null;
}

export function getServiceAudienceLane(slug: string): AudienceLane | "shared" | null {
  if (residentialServiceSlugSet.has(slug)) {
    return "residential";
  }

  if (commercialServiceSlugSet.has(slug)) {
    return "commercial";
  }

  if (sharedServiceSlugSet.has(slug)) {
    return "shared";
  }

  return null;
}

export function isResidentialServiceSlug(slug: string) {
  return residentialServiceSlugSet.has(slug);
}

export function isCommercialServiceSlug(slug: string) {
  return commercialServiceSlugSet.has(slug);
}

export function isSharedServiceSlug(slug: string) {
  return sharedServiceSlugSet.has(slug);
}

export function isResidentialPath(pathname: string) {
  if (pathname === routes.residential || pathname.startsWith(`${routes.residential}/`)) {
    return true;
  }

  if (pathname === routes.troubleshoot || pathname.startsWith(`${routes.troubleshoot}/`)) {
    return true;
  }

  const slug = getServiceSlugFromPath(pathname);
  return slug ? isResidentialServiceSlug(slug) : false;
}

export function isCommercialPath(pathname: string) {
  if (pathname === routes.commercial || pathname.startsWith(`${routes.commercial}/`)) {
    return true;
  }

  if (pathname === routes.commercialPartnerships || pathname.startsWith(`${routes.commercialPartnerships}/`)) {
    return true;
  }

  const slug = getServiceSlugFromPath(pathname);
  return slug ? isCommercialServiceSlug(slug) : false;
}

export function isRedirectSourcePath(pathname: string) {
  return redirectSourceSet.has(pathname);
}

export function filterRedirectSourcePaths(paths: string[]) {
  return paths.filter((path) => !isRedirectSourcePath(path));
}
