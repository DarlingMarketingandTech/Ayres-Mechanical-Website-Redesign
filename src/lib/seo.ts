import type { Metadata } from "next";

import type { Service } from "@/content/services";
import { siteConfig } from "@/content/site";

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const isHome = path === "/" || path === "";
  const pageTitle = isHome ? { absolute: `${title} | ${siteConfig.name}` } : title;
  const ogTitle = `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export function servicePageMetadata(service: Service): Metadata {
  return pageMetadata({
    title: `${service.title} in Central Indiana`,
    description: `${service.description} Call ${siteConfig.phone} to request ${service.shortTitle.toLowerCase()} service from ${siteConfig.shortName}.`,
    path: `/services/${service.slug}`,
  });
}
