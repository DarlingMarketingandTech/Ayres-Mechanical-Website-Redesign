import { DiagnosticWizard } from "@/components/sections/DiagnosticWizard";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "HVAC Troubleshooting Assistant",
  description:
    "Run your heating and cooling symptoms through Ayres Mechanical's free Virtual Triage Assistant. Get DIY guidance or request professional diagnosis in Central Indiana.",
  path: "/troubleshoot",
});

export default function TroubleshootPage() {
  return (
    <Section className="bg-brand-ice py-10 sm:py-14">
      <Container className="max-w-3xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Virtual Triage</p>
          <h1 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
            Ayres Virtual Triage: Troubleshoot Your System
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Answer a few quick questions about your property and symptoms. We&apos;ll guide you toward a safe DIY fix or
            connect you with our team for professional service.
          </p>
        </div>
        <DiagnosticWizard />
      </Container>
    </Section>
  );
}
