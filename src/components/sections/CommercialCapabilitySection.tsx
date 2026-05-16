import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { serviceSlugs } from "@/data/services-content";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function CommercialCapabilitySection() {
  const hero = media.pages.commercial.hero;

  return (
    <Section className="bg-brand-blue-dark text-white">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
        <figure className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/12 shadow-2xl sm:aspect-[16/10] lg:min-h-[280px] lg:rounded-[2rem]">
          <CloudinaryImage
            asset={hero}
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            width={Math.min(hero.width, 1600)}
            height={Math.max(2, Math.round((hero.height / hero.width) * Math.min(hero.width, 1600)))}
            className="object-cover object-[center_32%]"
            crop="fill"
            gravity="auto"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/55 to-transparent" aria-hidden />
          <figcaption className="sr-only">{hero.alt}</figcaption>
        </figure>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-white/60">Commercial capability</p>
          <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-white">Heavy-lift installs and building-ready HVAC for Central Indiana.</h2>
          <p className="mt-5 text-(length:--text-lead) leading-relaxed text-white/80">
            From rooftop changeouts to plant-floor reliability, we plan the work, coordinate access, and keep your operation moving. Explore commercial service lines and how we support facilities teams.
          </p>
          <Link
            href={routes.service(serviceSlugs.commercial)}
            className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "mt-8 inline-flex min-h-12 items-center justify-center gap-2")}
          >
            Commercial HVAC services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
