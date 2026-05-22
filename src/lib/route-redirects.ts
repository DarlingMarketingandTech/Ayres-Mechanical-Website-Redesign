import { routes } from "@/lib/routes";
import { buildRouteRedirects, type RouteRedirect } from "@/lib/route-redirects-shared";

export type { RouteRedirect };

export const routeRedirects: RouteRedirect[] = buildRouteRedirects(routes);
