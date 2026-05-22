import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function CommercialPortfolioCTA() {
  return (
    <Section className="bg-white pt-0">
      <Container>
        <div className="grid overflow-hidden rounded-[2rem] border border-brand-blue-dark/10 bg-brand-blue-dark text-white shadow-xl lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <figure className="relative min-h-64 lg:min-h-full">
            <CloudinaryImage
              asset={media.commercialPortal.hero}
              fill
              sizes="(min-width: 1024px) 42vw, 100vw"
              aspectRatio="16:10"
              className="object-cover object-[center_36%]"
              crop="fill"
              gravity="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/75 to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
            <figcaption className="sr-only">{media.commercialPortal.hero.alt}</figcaption>
          </figure>
          <div className="p-7 sm:p-8 lg:p-10">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-white/55">Commercial HVAC support</p>
            <h2 className="mt-3 text-3xl font-black text-balance sm:text-4xl">Need planned HVAC maintenance for your business?</h2>
            <p className="mt-4 text-lg leading-8 text-white/78">
              See how Ayres Mechanical supports offices, retail spaces, restaurants, property managers, and light industrial buildings with planned service and clear follow-up.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={routes.commercialMaintenancePlans}
                data-analytics-event="commercial_cta_click"
                data-analytics-category="homepage"
                data-analytics-label="commercial_maintenance_plans"
                data-analytics-location="commercial_portfolio_cta"
                data-analytics-href={routes.commercialMaintenancePlans}
                className={cn(buttonVariants({ variant: "emergency", size: "lg" }), "justify-center")}
              >
                View Commercial Maintenance Plans
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href={routes.commercialService}
                data-analytics-event="commercial_service_page_cta_click"
                data-analytics-category="homepage"
                data-analytics-label="commercial_hvac_service"
                data-analytics-location="commercial_portfolio_cta"
                data-analytics-href={routes.commercialService}
                className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "justify-center")}
              >
                Commercial HVAC Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
