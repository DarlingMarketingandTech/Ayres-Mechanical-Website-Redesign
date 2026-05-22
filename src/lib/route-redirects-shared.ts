import type { routes } from "@/lib/routes";

export type RouteRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export function buildRouteRedirects(routeCatalog: typeof routes): RouteRedirect[] {
  return [
    { source: routeCatalog.industry("residential"), destination: routeCatalog.residential, permanent: true },
    { source: routeCatalog.industry("commercial"), destination: routeCatalog.commercial, permanent: true },
    { source: routeCatalog.industry("industrial"), destination: routeCatalog.industrialFacilities, permanent: true },
    { source: routeCatalog.service("preventive-maintenance"), destination: routeCatalog.service("seasonal-tune-ups"), permanent: true },
  ];
}
