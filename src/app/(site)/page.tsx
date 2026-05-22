import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { CommercialCapabilitySection } from "@/components/sections/CommercialCapabilitySection";
import { CountyServiceAreaSection } from "@/components/sections/CountyServiceAreaSection";
import { EmergencyCTA } from "@/components/sections/EmergencyCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinancingPromoSection } from "@/components/sections/FinancingPromoSection";
import { HomeHero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { VirtualTriageCTA } from "@/components/sections/VirtualTriageCTA";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { homeFaqs } from "@/content/faqs";
import { routes } from "@/lib/routes";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <Section className="bg-brand-ice">
        <Container>
          <EmergencyCTA />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Services</p>
              <h2 className="mt-3 text-(length:--text-section) font-black text-balance">HVAC service for homes, businesses, and facilities.</h2>
            </div>
            <Link
              href={routes.services}
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-black text-brand-blue-dark underline-offset-4 transition-colors hover:text-brand-red"
            >
              View all services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ServiceCards limit={6} />
          <div className="mt-10">
            <VirtualTriageCTA withContainer={false} />
          </div>
        </Container>
      </Section>

      <AuthoritySection />

      <CommercialCapabilitySection />

      <Section className="bg-white">
        <Container>
          <Testimonials />
        </Container>
      </Section>

      <CountyServiceAreaSection />

      <FinancingPromoSection variant="home" />

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
