import { ComfortSolutionsSection } from "@/components/sections/ComfortSolutionsSection";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { HomeHero } from "@/components/sections/Hero";
import { ProofMediaBlock } from "@/components/sections/ProofMediaBlock";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { industries } from "@/content/industries";
import { homeFaqs } from "@/content/faqs";
import { media } from "@/content/media";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustBar />
      <FinancingPromoSection variant="home" />
      <ComfortSolutionsSection />
      <Section>
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Services</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance">HVAC service for homes, businesses, and facilities.</h2>
          </div>
          <ServiceCards />
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container className="space-y-8">
          <ProofMediaBlock
            asset={media.home.workVan}
            eyebrow="Local proof"
            title="A recognizable local service presence."
            description="A verified Ayres Mechanical work van gives the homepage grounded operational proof while the main calls to action stay focused on service requests."
            proofPoints={[
              "Branded vehicle imagery from the company media library.",
              "Supports Central Indiana service-area content.",
              "Keeps the proof layer credible and uncluttered.",
            ]}
            caption="Ayres Mechanical service vehicle"
          />
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Why Ayres Mechanical</p>
              <h2 className="mt-3 text-(length:--text-section) font-black text-balance">A local mechanical partner with practical service instincts.</h2>
              <p className="mt-4 leading-8 text-muted-foreground">The site foundation emphasizes clear service paths, 24-hour availability, and distinct content for residential, commercial, and industrial customers.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {industries.map((industry) => (
                <div
                  key={industry.slug}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/15 motion-reduce:transform-none"
                >
                  <h3 className="text-xl font-black">{industry.title.replace(" Services", "")}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Service Area</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance">Central Indiana HVAC service areas.</h2>
          </div>
          <ServiceAreaGrid limit={5} />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <Testimonials />
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container><EmergencyCTA /></Container>
      </Section>
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">FAQ</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance">Common HVAC service questions.</h2>
          </div>
          <FAQSection faqs={homeFaqs} />
        </Container>
      </Section>
    </>
  );
}
