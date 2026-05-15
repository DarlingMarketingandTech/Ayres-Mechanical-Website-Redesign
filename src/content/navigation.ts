import { routes } from "@/lib/routes";
import { industries } from "./industries";
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

export const primaryNavigation: NavigationItem[] = [
  { label: "Services", href: routes.services, children: serviceNavigationItems },
  { label: "About", href: routes.about },
  { label: "Reviews", href: routes.reviews },
  { label: "Contact", href: routes.contact },
];

export const utilityNavigation: NavigationItem[] = [
  { label: "Request Service", href: routes.requestService },
  { label: "Financing", href: routes.financing },
];
