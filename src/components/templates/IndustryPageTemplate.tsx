import { CTASection } from "@/components/sections/CTASection";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { PageHero } from "@/components/sections/Hero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Industry } from "@/content/industries";

export function IndustryPageTemplate({ industry }: { industry: Industry }) {
  return (
    <>
      <PageHero eyebrow={industry.eyebrow} title={industry.title} description={industry.description} variant={industry.tone === "industrial" ? "dark" : "light"} />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FeatureBand title="Pain points we help solve" features={industry.painPoints} />
          <FeatureBand title="Service capabilities" features={industry.capabilities} />
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Why Ayres Mechanical</p>
            <h2 className="mt-3 text-4xl font-black">Built for the way {industry.tone} customers make service decisions.</h2>
          </div>
          <FeatureBand title="What to expect" features={industry.proofPoints} />
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Services</p>
            <h2 className="mt-3 text-4xl font-black">HVAC services for {industry.tone} needs.</h2>
          </div>
          <ServiceCards limit={6} />
        </Container>
      </Section>
      <CTASection title={"Need " + industry.tone + " HVAC service?"} />
    </>
  );
}
