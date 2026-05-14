import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Financing", description: "Financing details are pending owner confirmation for Ayres Mechanical Inc. HVAC services.", path: "/financing" });

export default function FinancingPage() {
  return <BasicPageTemplate eyebrow="Financing" title="HVAC financing information." description="Add confirmed financing partners, eligibility notes, and application links before publishing."><div className="rounded-3xl border bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">Financing details pending confirmation</h2><p className="mt-3 leading-7 text-muted-foreground">This page is intentionally structured for owner-approved financing details once Ayres Mechanical confirms available options.</p></div></BasicPageTemplate>;
}
