import { routes } from "@/lib/routes";

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Services", href: routes.services },
  { label: "Industries", href: routes.industries },
  { label: "About", href: routes.about },
  { label: "Reviews", href: routes.reviews },
  { label: "Contact", href: routes.contact },
];

export const utilityNavigation = [
  { label: "Request Service", href: routes.requestService },
  { label: "Financing", href: routes.financing },
  { label: "Service Area", href: routes.serviceArea },
];
