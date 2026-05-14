import Link from "next/link";

import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LocationHero } from "@/components/sections/Hero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { getLocationBySlug, type ServiceLocation } from "@/content/locations";
import { routes } from "@/lib/routes";

export function LocationPageTemplate({ location }: { location: ServiceLocation }) {
  const nearby = location.nearby.map(getLocationBySlug).filter(Boolean) as ServiceLocation[];
  return (
    <>
      <LocationHero city={location.city} state={location.state} intro={location.intro} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Local HVAC Support</p>
            <h2 className="mt-3 text-4xl font-black">Heating, cooling, maintenance, and emergency service in {location.city}.</h2>
            <p className="mt-4 leading-8 text-muted-foreground">Ayres Mechanical supports {location.city} customers with service options that match residential, commercial, and industrial needs. This page is structured for useful local content and can be expanded with owner-confirmed neighborhood details, project examples, and service notes before launch.</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border">
            <h3 className="text-2xl font-black">Services in {location.city}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {location.services.map((service) => <div key={service} className="rounded-xl bg-secondary p-4 font-black text-brand-blue-dark">{service}</div>)}
            </div>
          </div>
        </Container>
      </Section>
      <Section className="bg-brand-ice">
        <Container>
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Relevant Services</p>
            <h2 className="mt-3 text-4xl font-black">Explore HVAC services available across Central Indiana.</h2>
          </div>
          <ServiceCards limit={6} />
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Local FAQ</p>
            <h2 className="mt-3 text-4xl font-black">Questions about service in {location.city}?</h2>
          </div>
          <FAQSection faqs={location.faqs} />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <h2 className="text-3xl font-black">Nearby service areas</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {nearby.map((item) => <Link key={item.slug} href={routes.location(item.slug)} className="rounded-full border bg-white px-4 py-2 font-bold text-brand-blue-dark hover:border-primary hover:text-primary">{item.city}, {item.state}</Link>)}
          </div>
        </Container>
      </Section>
      <CTASection title={"Request HVAC service in " + location.city + ", " + location.state} />
    </>
  );
}
