import { notFound } from "next/navigation";

import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { getServiceBySlug } from "@/content/services";
import { servicePageMetadata } from "@/lib/seo";

const service = getServiceBySlug("commercial-hvac");

export const metadata = service ? servicePageMetadata(service) : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
