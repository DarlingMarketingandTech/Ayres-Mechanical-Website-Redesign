import Link from "next/link";
import { ArrowRight, Building2, Factory, Home } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { routes } from "@/lib/routes";

const segments = [
  {
    slug: "residential",
    icon: Home,
    eyebrow: "For Homeowners",
    title: "Residential",
    description:
      "Expert furnace and AC repair for your family home, with practical recommendations tailored to your comfort goals and budget.",
    cta: "Residential services",
  },
  {
    slug: "commercial",
    icon: Building2,
    eyebrow: "For Businesses",
    title: "Commercial",
    description:
      "Business continuity support for offices, retail, and multi-unit properties. Minimized downtime, maximized comfort.",
    cta: "Commercial services",
  },
  {
    slug: "industrial",
    icon: Factory,
    eyebrow: "For Facilities",
    title: "Industrial",
    description:
      "Specialized HVAC support for demanding operational and manufacturing environments where uptime is critical.",
    cta: "Industrial services",
  },
] as const;

export function WhoWeServeSection() {
  return (
    <Section className="bg-brand-ice">
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Who We Serve</p>
          <h2 className="mt-3 text-(length:--text-section) font-black text-balance">
            Find the right solution for your situation.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {segments.map(({ slug, icon: Icon, eyebrow, title, description, cta }) => (
            <Link
              key={slug}
              href={routes.industry(slug)}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:ring-primary/20 motion-reduce:transform-none"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-brand-ice transition-[background-color,transform] duration-300 group-hover:bg-brand-blue-dark/8 group-hover:scale-110 motion-reduce:transform-none">
                <Icon className="size-6 text-brand-blue-dark" aria-hidden="true" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">{eyebrow}</p>
              <h3 className="mt-2 text-2xl font-black text-brand-blue-dark">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-blue-dark transition-colors duration-300 group-hover:text-brand-red">
                {cta}{" "}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
