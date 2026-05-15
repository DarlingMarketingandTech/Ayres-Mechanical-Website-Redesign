import { RequestServiceForm } from "@/forms/RequestServiceForm";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { prefillFromServiceIntent } from "@/lib/request-service-intent";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Request Service", description: "Request heating, cooling, maintenance, commercial HVAC, industrial HVAC, or emergency service from Ayres Mechanical Inc.", path: "/request-service" });

export default async function RequestServicePage({ searchParams }: { searchParams: Promise<{ intent?: string | string[] }> }) {
  const params = await searchParams;
  const raw = params.intent;
  const intentKey = Array.isArray(raw) ? raw[0] : raw;
  const prefill = prefillFromServiceIntent(intentKey);

  return (
    <BasicPageTemplate
      eyebrow="Request Service"
      title="Tell us what HVAC help you need."
      description="Use this form for residential, commercial, industrial, routine, and urgent HVAC service requests."
    >
      <RequestServiceForm prefill={prefill} />
    </BasicPageTemplate>
  );
}
