import type { CloudinaryMediaAsset } from "@/content/media";
import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function BasicPageTemplate({
  eyebrow,
  title,
  description,
  children,
  heroBackground,
  heroPhotoOverlay,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  heroBackground?: CloudinaryMediaAsset;
  heroPhotoOverlay?: "none" | "navy-strong" | "navy-soft" | "light-soft" | "light-blend";
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        variant="light"
        backgroundImage={heroBackground}
        photoOverlay={heroPhotoOverlay ?? (heroBackground ? "light-soft" : "none")}
        backgroundPriority={Boolean(heroBackground)}
        backgroundDeliveryWidth={heroBackground?.publicId === "service_locations" ? 2000 : undefined}
      />
      <Section>
        <Container>{children}</Container>
      </Section>
    </>
  );
}
