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
        title="Serving 6 counties in Central Indiana."
        description="No travel charges within our service area. We're local, we're prompt, and we're ready—from Marion and Hendricks to Montgomery, Putnam, Boone, and Hamilton counties."
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
