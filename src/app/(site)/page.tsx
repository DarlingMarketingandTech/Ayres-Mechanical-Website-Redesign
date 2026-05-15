import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { CommonProblemsSolvedSection } from "@/components/sections/CommonProblemsSolvedSection";
import { CountyServiceAreaSection } from "@/components/sections/CountyServiceAreaSection";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { HomeHero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhoWeServeSection } from "@/components/sections/WhoWeServeSection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { homeFaqs } from "@/content/faqs";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — Hook */}
      <HomeHero />

      {/* Trust signal bar */}
      <TrustBar />

      {/* 2. Who We Serve — Immediate user segmentation */}
      <WhoWeServeSection />

      {/* 3. Authority — Family-owned trust builder with team photo & partner logos */}
      <AuthoritySection />

      {/* 4. Common Problems Solved — Empathy / SEO layer */}
      <CommonProblemsSolvedSection />

      {/* 5. Services overview */}
      <Section>
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Services</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance">HVAC service for homes, businesses, and facilities.</h2>
          </div>
          <ServiceCards />
        </Container>
      </Section>

      {/* 6. Service area — 6-county coverage with no-travel-fee hook */}
      <CountyServiceAreaSection />

      {/* 7. Reviews — Validation */}
      <Section className="bg-white">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      {/* 8. Financing & Maintenance — Value proposition */}
      <FinancingPromoSection variant="home" />

      {/* 9. Emergency CTA — Safety net closer */}
      <Section className="bg-brand-ice">
        <Container><EmergencyCTA /></Container>
      </Section>

      {/* 10. FAQ */}
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

