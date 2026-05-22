import { routes } from "./routes";

export type RouteRedirect = {
  source: string;
  destination: string;
  permanent: true;
};

export const routeRedirects: RouteRedirect[] = [
  { source: routes.industry("residential"), destination: routes.residential, permanent: true },
  { source: routes.industry("commercial"), destination: routes.commercial, permanent: true },
  { source: routes.industry("industrial"), destination: routes.industrialFacilities, permanent: true },
];
