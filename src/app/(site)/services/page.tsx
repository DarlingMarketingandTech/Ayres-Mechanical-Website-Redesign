import { PageHero } from "@/components/sections/Hero";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "HVAC Services in Central Indiana",
  description:
    "Heating, air conditioning, maintenance, ductwork, commercial HVAC, industrial HVAC, and emergency service from Ayres Mechanical throughout Central Indiana.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Heating, cooling, and mechanical service built around dependable response." description="Explore residential, commercial, and industrial HVAC services from Ayres Mechanical." />
      <Section>
        <Container>
          <ServiceCards />
        </Container>
      </Section>
      <FinancingPromoSection variant="service" />
    </>
  );
}
