import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { TriangleMark } from "@/components/brand/TriangleMark";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white section-pattern">
      <BrandPattern variant="blue" />
      <Container className="relative grid gap-8 py-12 sm:gap-10 sm:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-24">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">{siteConfig.tagline}</p>
          <h1 className="mt-4 max-w-4xl text-(length:--text-hero) font-black leading-[0.98] text-balance sm:mt-5">
            Heating & Air Conditioning Service Built for Central Indiana
          </h1>
          <p className="mt-5 max-w-2xl text-(length:--text-lead) leading-relaxed text-muted-foreground sm:mt-6 sm:leading-8">
            Ayres Mechanical provides residential, commercial, and industrial HVAC service with fast response, dependable workmanship, and 24-hour service when comfort cannot wait.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
            <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>
              Request Service <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a href={phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              <Phone data-icon="inline-start" aria-hidden="true" /> Call {siteConfig.phone}
            </a>
          </div>
        </div>
        <div className="relative min-h-[min(22rem,70dvh)] rounded-3xl bg-brand-blue-dark p-4 text-white shadow-2xl sm:min-h-104 sm:rounded-[2rem] sm:p-6 lg:min-h-[420px]">
          <BrandPattern variant="dark" />
          <div className="relative flex h-full min-h-64 flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:min-h-80 sm:rounded-[1.5rem] sm:p-6 lg:min-h-[372px]">
            <TriangleMark className="h-16 w-11 shrink-0 sm:h-24 sm:w-16" tone="light" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70 sm:text-sm">Residential · Commercial · Industrial</p>
              <h2 className="mt-3 text-(length:--text-section) font-black leading-tight text-balance text-white sm:mt-4">
                24-hour service with a clear path from call to comfort.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold sm:gap-3 sm:text-sm">
              {['Heating', 'Cooling', 'Maintenance', 'Emergency'].map((item) => (
                <div key={item} className="rounded-lg border border-white/15 bg-white/10 p-3 sm:rounded-xl sm:p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PageHero({ eyebrow, title, description, variant = "light" }: { eyebrow: string; title: string; description: string; variant?: "light" | "dark" | "red" }) {
  const dark = variant === "dark";
  return (
    <section className={cn("relative overflow-hidden", dark ? "bg-brand-blue-dark text-white" : "bg-white")}>
      <BrandPattern variant={dark ? "dark" : variant === "red" ? "red" : "blue"} />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <p className={cn("text-sm font-black uppercase tracking-[0.24em]", dark ? "text-white/70" : "text-brand-red")}>{eyebrow}</p>
        <h1
          className={cn(
            "mt-3 max-w-4xl text-(length:--text-hero-sub) font-black leading-[1.02] text-balance sm:mt-4",
            dark ? "text-white" : "text-brand-blue-dark",
          )}
        >
          {title}
        </h1>
        <p className={cn("mt-4 max-w-3xl text-(length:--text-lead) leading-relaxed sm:mt-5 sm:leading-8", dark ? "text-white/75" : "text-muted-foreground")}>
          {description}
        </p>
      </Container>
    </section>
  );
}

export function ServiceHero(props: { eyebrow: string; title: string; description: string; accent: "red" | "blue" | "dark" }) {
  return <PageHero eyebrow={props.eyebrow} title={props.title} description={props.description} variant={props.accent === "dark" ? "dark" : props.accent === "red" ? "red" : "light"} />;
}

export function LocationHero({ city, state, intro }: { city: string; state: string; intro: string }) {
  return <PageHero eyebrow="Service Area" title={"HVAC Services in " + city + ", " + state} description={intro} />;
}
