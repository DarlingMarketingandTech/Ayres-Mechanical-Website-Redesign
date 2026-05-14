import Link from "next/link";

import { BrandDivider } from "@/components/brand/BrandDivider";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceHero } from "@/components/sections/Hero";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { Service } from "@/content/services";
import { getServiceBySlug } from "@/content/services";
import { routes } from "@/lib/routes";

export function ServicePageTemplate({ service }: { service: Service }) {
  const related = service.relatedServices.map(getServiceBySlug).filter(Boolean) as Service[];
  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: routes.home }, { name: "Services", url: routes.services }, { name: service.title, url: routes.service(service.slug) }])} />
      <ServiceHero eyebrow={service.heroEyebrow} title={service.heroTitle} description={service.description} accent={service.accent} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border">
              <ServiceIcon icon={service.icon} className={service.accent === "red" ? "bg-accent text-brand-red" : ""} />
              <h2 className="mt-5 text-3xl font-black">What we help with</h2>
              <BrandDivider className="mt-5" />
              <ul className="mt-6 grid gap-3">
                {service.highlights.map((item) => <li key={item} className="rounded-xl bg-secondary p-4 font-semibold text-brand-blue-dark">{item}</li>)}
              </ul>
            </div>
            <FeatureBand title="Common problems solved" features={service.problemsSolved} />
          </div>
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Service Process</p>
            <h2 className="mt-3 text-4xl font-black">A straightforward path from request to resolution.</h2>
          </div>
          <ProcessSteps />
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Related Services</p>
            <h2 className="mt-3 text-4xl font-black">Keep exploring HVAC support.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((item) => <Link key={item.slug} href={routes.service(item.slug)} className="rounded-2xl border bg-white p-5 font-black text-brand-blue-dark shadow-sm hover:border-primary hover:text-primary">{item.shortTitle}</Link>)}
          </div>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">FAQ</p>
            <h2 className="mt-3 text-4xl font-black">Questions about {service.shortTitle.toLowerCase()}?</h2>
          </div>
          <FAQSection faqs={service.faqs} />
        </Container>
      </Section>
      <CTASection title={"Need " + service.shortTitle.toLowerCase() + " service?"} />
    </>
  );
}
