import { RequestServiceForm } from "@/forms/RequestServiceForm";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { prefillFromRequestServiceSearch } from "@/lib/request-service-prefill";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request HVAC Service",
  description: `Request heating, cooling, maintenance, commercial, industrial, or emergency HVAC service from ${siteConfig.shortName}. Call ${siteConfig.phone} for urgent needs.`,
  path: "/request-service",
});

export default async function RequestServicePage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string | string[]; service?: string | string[]; emergency?: string | string[] }>;
}) {
  const params = await searchParams;
  const prefill = prefillFromRequestServiceSearch(params);

  return (
    <BasicPageTemplate
      eyebrow="Request Service"
      title="Tell us what HVAC help you need."
      description="A quick three-step form for residential, commercial, industrial, routine, and urgent HVAC requests — no third-party iframe."
    >
      <RequestServiceForm prefill={prefill} />
    </BasicPageTemplate>
  );
}
