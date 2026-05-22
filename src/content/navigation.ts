import { serviceSlugs } from "@/data/services-content";
import { routes } from "@/lib/routes";
import { navigationLaneDefinitions } from "@/lib/site-policy";
import { services, type Service } from "./services";

export type NavigationChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationChild[];
};

function serviceLink(slug: Service["slug"]): NavigationChild {
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    throw new Error(`serviceLink() could not find a service navigation entry for slug "${slug}".`);
  }

  return {
    label: service.shortTitle,
    href: routes.service(service.slug),
    description: service.description,
  };
}

const residentialOverviewLink: NavigationChild = {
  label: navigationLaneDefinitions.residential.overviewLabel,
  href: navigationLaneDefinitions.residential.href,
  description: navigationLaneDefinitions.residential.description,
};

const commercialOverviewLink: NavigationChild = {
  label: navigationLaneDefinitions.commercial.overviewLabel,
  href: navigationLaneDefinitions.commercial.href,
  description: navigationLaneDefinitions.commercial.description,
};

export const residentialNavigation: NavigationChild = {
  label: navigationLaneDefinitions.residential.label,
  href: navigationLaneDefinitions.residential.href,
  description: navigationLaneDefinitions.residential.description,
};

export const commercialNavigation: NavigationChild = {
  label: navigationLaneDefinitions.commercial.label,
  href: navigationLaneDefinitions.commercial.href,
  description: navigationLaneDefinitions.commercial.description,
};

export const commercialMaintenanceNavigation: NavigationChild = {
  label: "Commercial Maintenance Plans",
  href: routes.commercialMaintenancePlans,
  description: "Planned HVAC maintenance and service support for Central Indiana businesses and facility teams.",
};

export const emergencyNavigation: NavigationChild = {
  label: "Emergency 24/7",
  href: routes.service(serviceSlugs.twentyFourHourEmergency),
  description: "Fast help for heating and cooling issues that cannot wait.",
};

export const residentialNavigationGroup: NavigationGroup = {
  label: navigationLaneDefinitions.residential.label,
  items: [
    residentialOverviewLink,
    serviceLink(serviceSlugs.heating),
    serviceLink(serviceSlugs.airConditioning),
    serviceLink(serviceSlugs.ductless),
    serviceLink(serviceSlugs.indoorAirQuality),
    serviceLink(serviceSlugs.preventiveMaintenance),
    {
      ...serviceLink(serviceSlugs.twentyFourHourEmergency),
      label: "Emergency Service",
    },
  ],
};

export const commercialNavigationGroup: NavigationGroup = {
  label: navigationLaneDefinitions.commercial.label,
  items: [
    commercialOverviewLink,
    serviceLink(serviceSlugs.commercial),
    {
      ...serviceLink(serviceSlugs.industrial),
      label: "Industrial / Facility Support",
    },
    commercialMaintenanceNavigation,
    {
      ...serviceLink(serviceSlugs.twentyFourHourEmergency),
      label: "Emergency Service",
    },
  ],
};

export const companyNavigation: NavigationChild[] = [
  {
    label: "About Us",
    href: routes.about,
    description: "Learn more about the Ayres Mechanical team and service approach.",
  },
  {
    label: "Financing",
    href: routes.financing,
    description: "Explore financing options for major HVAC repairs and replacements.",
  },
  {
    label: "Service Area",
    href: routes.serviceArea,
    description: "See where Ayres Mechanical provides local HVAC support across Central Indiana.",
  },
];

export const primaryNavigation: NavigationChild[] = [
  {
    label: "Reviews",
    href: routes.reviews,
    description: "Read what homeowners and businesses say about Ayres Mechanical.",
  },
  {
    label: "Contact",
    href: routes.contact,
    description: "Get in touch with Ayres Mechanical for questions and support.",
  },
];

export const footerServiceLinks: NavigationChild[] = [
  residentialOverviewLink,
  serviceLink(serviceSlugs.heating),
  serviceLink(serviceSlugs.airConditioning),
  serviceLink(serviceSlugs.ductless),
  serviceLink(serviceSlugs.indoorAirQuality),
  serviceLink(serviceSlugs.preventiveMaintenance),
  serviceLink(serviceSlugs.twentyFourHourEmergency),
];

export const footerCommercialLinks: NavigationChild[] = [
  commercialOverviewLink,
  commercialMaintenanceNavigation,
  serviceLink(serviceSlugs.commercial),
  {
    ...serviceLink(serviceSlugs.industrial),
      label: "Industrial / Facility Support",
  },
];
