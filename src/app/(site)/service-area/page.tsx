import { PageHero } from "@/components/sections/Hero";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Service Area", description: "Ayres Mechanical provides heating and air conditioning service throughout Central Indiana.", path: "/service-area" });

export default function ServiceAreaPage() {
  const mapAsset = media.serviceArea.map;

  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title="Central Indiana HVAC service areas."
        description="Explore local HVAC service pages for Ayres Mechanical. Confirm final service areas with the business owner before publishing."
        variant="light"
        backgroundImage={mapAsset}
        photoOverlay="navy-strong"
        backgroundPriority
        backgroundDeliveryWidth={2000}
      />
      <Section>
        <Container>
          <ServiceAreaGrid />
        </Container>
      </Section>
    </>
  );
}
