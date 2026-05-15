import { BrandPattern } from "@/components/brand/BrandPattern";
import { HomeSectionHeading } from "@/components/home/SectionEyebrow";
import { SectionDivider } from "@/components/home/SectionDivider";
import { ComfortSolutionsSection } from "@/components/sections/ComfortSolutionsSection";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { CommercialHvacHomeSection, OwnerOperatedHomeSection } from "@/components/sections/HomeMarketSections";
import { HomeHero } from "@/components/sections/Hero";
import { LocalPresenceSection } from "@/components/sections/LocalPresenceSection";
import { PartnerTrustStrip } from "@/components/sections/PartnerTrustStrip";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { TrustSequenceSection } from "@/components/sections/TrustSequenceSection";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/content/site";
import { homeFaqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Heating & Air Conditioning Specialists",
  description: `${siteConfig.description} Call ${siteConfig.phone} for service.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustSequenceSection />
      <TrustBar />
      <FinancingPromoSection variant="home" />

      <Section className="border-t border-brand-blue-dark/10 bg-brand-ice">
        <Container>
          <SectionDivider className="mb-6 max-w-2xl" />
          <HomeSectionHeading eyebrow="SERVICES" title="HVAC service for homes, businesses, and facilities." />
          <ServiceCards />
        </Container>
      </Section>

      <Section className="relative bg-linear-to-b from-background via-white to-brand-ice/35">
        <Container className="space-y-6">
          <SectionDivider className="max-w-2xl" />
          <LocalPresenceSection />
        </Container>
      </Section>

      <Section className="border-t border-brand-red/10 bg-brand-ice/40">
        <Container>
          <EmergencyCTA compact />
        </Container>
      </Section>

      <OwnerOperatedHomeSection />
      <CommercialHvacHomeSection />
      <PartnerTrustStrip />
      <ComfortSolutionsSection />

      <Section className="border-t border-brand-blue-dark/8 bg-muted/35">
        <Container>
          <SectionDivider className="mb-6 max-w-2xl" />
          <HomeSectionHeading eyebrow="SERVICE AREAS" title="Central Indiana HVAC service areas." />
          <ServiceAreaGrid limit={5} />
        </Container>
      </Section>

      <Section className="bg-linear-to-br from-brand-ice/55 via-background to-white">
        <Container>
          <SectionDivider className="mb-6 max-w-2xl" />
          <HomeSectionHeading
            eyebrow="REVIEWS"
            title="Real reviews from Central Indiana HVAC customers."
            description="Ayres Mechanical has earned consistent recommendations for prompt service, practical diagnostics, fair pricing, and follow-through on heating and cooling work."
          />
          <Testimonials limit={3} showPitchColumn={false} />
        </Container>
      </Section>

      <Section className="relative overflow-hidden border-y border-white/25 bg-brand-red py-10 text-white lg:py-14">
        <BrandPattern variant="dark" />
        <Container className="relative">
          <SectionDivider variant="onDark" className="mb-6 max-w-2xl opacity-90" />
          <EmergencyCTA className="rounded-2xl border border-white/25 bg-white/12 shadow-[0_16px_48px_rgb(0_0_0_/0.28)] backdrop-blur-md" />
        </Container>
      </Section>

      <Section className="relative overflow-hidden bg-brand-blue-dark text-white">
        <BrandPattern variant="dark" />
        <Container className="relative grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <HomeSectionHeading light eyebrow="FAQ" title="Common HVAC service questions." />
          <FAQSection faqs={homeFaqs} variant="dark" />
        </Container>
      </Section>
    </>
  );
}
