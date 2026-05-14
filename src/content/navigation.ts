import { routes } from "@/lib/routes";
import { industries } from "./industries";
import { serviceLocations } from "./locations";
import { services } from "./services";

export type NavigationChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationItem = NavigationChild & {
  children?: NavigationChild[];
};

export const serviceNavigationItems: NavigationChild[] = services.map((service) => ({
  label: service.shortTitle,
  href: routes.service(service.slug),
  description: service.description,
}));

export const industryNavigationItems: NavigationChild[] = industries.map((industry) => ({
  label: industry.title,
  href: routes.industry(industry.slug),
  description: industry.description,
}));

export const serviceAreaNavigationItems: NavigationChild[] = serviceLocations.map((location) => ({
  label: `${location.city}, ${location.state}`,
  href: routes.location(location.slug),
  description: location.intro,
}));

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services, children: serviceNavigationItems },
  { label: "Industries", href: routes.industries, children: industryNavigationItems },
  { label: "About", href: routes.about },
  { label: "Reviews", href: routes.reviews },
  { label: "Contact", href: routes.contact },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Request Service", href: routes.requestService },
  { label: "Financing", href: routes.financing },
  { label: "Service Area", href: routes.serviceArea, children: serviceAreaNavigationItems },
];
