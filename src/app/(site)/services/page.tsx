import { PageHero } from "@/components/sections/Hero";
import { EliteCertificationsBanner } from "@/components/sections/EliteCertificationsBanner";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "HVAC Services", description: "Air conditioning, heating, preventive maintenance, commercial HVAC, industrial HVAC, and 24-hour emergency service from Ayres Mechanical Inc.", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Heating, cooling, and mechanical service built around dependable response."
        description="Explore residential, commercial, and industrial HVAC services from Ayres Mechanical."
        variant="light"
        backgroundImage={media.home.localProof}
        photoOverlay="navy-strong"
        backgroundPriority
      />
      <Section>
        <Container>
          <ServiceCards />
        </Container>
      </Section>
      <EliteCertificationsBanner />
      <FinancingPromoSection variant="service" />
    </>
  );
}
