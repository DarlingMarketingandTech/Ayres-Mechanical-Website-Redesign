import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { Container } from "@/components/layout/Container";
import { CloudinaryImageReveal } from "@/components/media/CloudinaryImageReveal";
import {
  HeroFadeDiv,
  HeroFadeH1,
  HeroFadeP,
  HeroStagger,
  HomeHeroGlowOrbs,
  HomeHeroMediaMotion,
  HomeHeroPatternMotion,
} from "@/components/sections/HeroMotion";
import { buttonVariants } from "@/components/ui/button";
import { media } from "@/content/media";
import { serviceCountyNames } from "@/content/locations";
import { siteConfig } from "@/content/site";
import { phoneOutlineCtaClassNames, requestServiceCtaClassNames } from "@/lib/cta-interactions";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function HomeHero() {
  const vanAsset = media.home.localProof;

  return (
    <section className="relative overflow-hidden bg-white section-pattern" data-mobile-cta-sentinel>
      <HomeHeroPatternMotion>
        <BrandPattern variant="blue" />
      </HomeHeroPatternMotion>

      <Container className="relative grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-24">
        <HeroStagger>
          <HeroFadeP className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">
            {siteConfig.tagline}
          </HeroFadeP>
          <HeroFadeH1 className="mt-4 max-w-4xl text-(length:--text-hero) font-black leading-[0.98] text-balance max-sm:leading-[1.06] sm:mt-5">
            Trusted HVAC Service in Central Indiana Since 2007.
          </HeroFadeH1>
          <HeroFadeP className="mt-5 max-w-2xl text-(length:--text-lead) leading-relaxed text-muted-foreground sm:mt-6 sm:leading-8">
            Practical heating and cooling solutions for your home, business, or facility. 24/7 emergency response in {serviceCountyNames} Counties.
          </HeroFadeP>
          <HeroFadeDiv className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href={routes.requestService}
              data-analytics-event="cta_click"
              data-analytics-category="hero"
              data-analytics-label="request_service"
              data-analytics-location="home_hero"
              data-analytics-href={routes.requestService}
              className={cn(
                buttonVariants({ variant: "emergency", size: "lg" }),
                requestServiceCtaClassNames(),
                "w-full min-h-12 justify-center sm:w-auto",
              )}
            >
              Request Service <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a
              href={phoneHref}
              data-analytics-event="cta_click"
              data-analytics-category="hero"
              data-analytics-label="call_now"
              data-analytics-location="home_hero"
              data-analytics-href={phoneHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                phoneOutlineCtaClassNames(),
                "w-full min-h-12 justify-center sm:w-auto",
              )}
              aria-label={`Call now at ${siteConfig.phone}`}
            >
              <Phone data-icon="inline-start" aria-hidden="true" /> Call Now
            </a>
          </HeroFadeDiv>
        </HeroStagger>

        <HomeHeroMediaMotion className="relative aspect-4/3 w-full max-h-[min(52dvh,26rem)] min-h-60 overflow-hidden rounded-3xl shadow-2xl sm:aspect-960/720 sm:max-h-none sm:min-h-104 sm:rounded-[2rem] lg:min-h-[420px]">
          <div className="absolute inset-0 z-0">
            <CloudinaryImageReveal
              asset={vanAsset}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              aspectRatio="4:3"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
          </div>
          <div className="absolute inset-0 z-1 bg-linear-to-t from-brand-blue-dark via-brand-blue-dark/88 to-brand-blue-dark/55" aria-hidden />
          <HomeHeroGlowOrbs />
          <div className="relative z-3 flex h-full min-h-[inherit] flex-col justify-end gap-5 p-4 text-white sm:gap-6 sm:p-6">
            <BrandPattern variant="dark" className="opacity-40" />
            <div className="relative flex flex-1 flex-col justify-end gap-6">
              <div className="rounded-2xl border border-white/15 bg-black/20 p-4 backdrop-blur-md sm:rounded-[1.5rem] sm:p-6">
                <TriangleMark className="h-14 w-10 shrink-0 drop-shadow-xl sm:h-24 sm:w-16" tone="light" />
                <p className="mt-4 text-xs font-black uppercase tracking-[0.22em] text-white/75 sm:text-sm">Residential · Commercial · Industrial</p>
                <h2 className="mt-3 text-(length:--text-section) font-black leading-tight text-balance text-white sm:mt-4">
                  24-hour service with a clear path from call to comfort.
                </h2>
              </div>
            </div>
          </div>
        </HomeHeroMediaMotion>
      </Container>
    </section>
  );
}
