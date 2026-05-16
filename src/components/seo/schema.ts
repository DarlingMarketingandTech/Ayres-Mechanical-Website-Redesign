import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: siteConfig.name,
    telephone: siteConfig.phone,
    url: siteConfig.url,
    areaServed: siteConfig.serviceArea,
    description: siteConfig.description,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.state,
            postalCode: siteConfig.address.postalCode,
            addressCountry: "US",
          },
        }
      : {}),
  };
}

type ServiceSchemaInput =
  | { title: string; slug: string; description: string; summary?: string }
  | { title: string; slug: string; description?: string; summary: string };

export function serviceSchema(service: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description ?? service.summary,
    provider: {
      "@type": "HVACBusiness",
      name: siteConfig.name,
      telephone: siteConfig.phone,
      url: siteConfig.url,
    },
    areaServed: siteConfig.serviceArea,
    url: absoluteUrl("/services/" + service.slug),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
