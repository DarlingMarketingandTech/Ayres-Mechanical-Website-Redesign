import { notFound } from "next/navigation";

import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";
import { getCachedIndustryBySlug } from "@/core/cache/static-content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const industry = await getCachedIndustryBySlug("industrial");
  return pageMetadata({
    title: industry ? industry.title : "Industry",
    description: industry ? industry.description : "HVAC service from Ayres Mechanical Inc.",
    path: "/industries/industrial",
  });
}

export default async function Page() {
  const industry = await getCachedIndustryBySlug("industrial");
  if (!industry) notFound();
  return <IndustryPageTemplate industry={industry} />;
}
