import { RequestServiceForm } from "@/forms/RequestServiceForm";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Request Service", description: "Request air conditioning, heating, preventive maintenance, commercial HVAC, industrial HVAC, or 24-hour emergency service from Ayres Mechanical Inc.", path: "/request-service" });

export default function RequestServicePage() {
  return <BasicPageTemplate eyebrow="Request Service" title="Tell us what HVAC help you need." description="Use this form for residential, commercial, industrial, routine, and urgent HVAC service requests."><RequestServiceForm /></BasicPageTemplate>;
}
