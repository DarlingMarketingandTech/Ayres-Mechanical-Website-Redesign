import { notFound } from "next/navigation";

import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";
import { getIndustryBySlug } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

const industry = getIndustryBySlug("residential");

export const metadata = pageMetadata({
  title: industry ? industry.title : "Industry",
  description: industry ? industry.description : "HVAC service from Ayres Mechanical Inc.",
  path: "/industries/residential",
});

export default function Page() {
  if (!industry) notFound();
  return <IndustryPageTemplate industry={industry} />;
}
