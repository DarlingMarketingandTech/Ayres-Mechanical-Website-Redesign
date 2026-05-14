import { notFound } from "next/navigation";

import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { getServiceBySlug } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

const service = getServiceBySlug("industrial-hvac");

export const metadata = pageMetadata({
  title: service ? service.title : "Service",
  description: service ? service.description : "HVAC service from Ayres Mechanical Inc.",
  path: "/services/industrial-hvac",
});

export default function Page() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
