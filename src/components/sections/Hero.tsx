import Link from "next/link";
import { ArrowRight, Clock, Phone } from "lucide-react";

import { BrandPattern } from "@/components/brand/BrandPattern";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { phoneHref } from "@/lib/constants";
import { routes, type RequestServiceIntent } from "@/lib/routes";
import { cn } from "@/lib/utils";

const REQUEST_FORM_HASH = "#request-service-form";

const QUICK_INTENTS: { label: string; intent: RequestServiceIntent }[] = [
  { label: "AC Repair", intent: "ac-repair" },
  { label: "Heating", intent: "heating" },
  { label: "Maintenance", intent: "maintenance" },
  { label: "Commercial", intent: "commercial" },
  { label: "Emergency", intent: "emergency" },
];

export function HomeHero() {
  const van = media.home.workVan;

  return (
    <section className="relative overflow-hidden bg-white section-pattern">
      <BrandPattern variant="blue" />
      <Container className="relative grid gap-8 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-stretch lg:gap-12 lg:py-20">
        <div className="flex min-w-0 flex-col">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Central Indiana HVAC</p>
          <h1 className="mt-3 max-w-4xl text-(length:--text-hero) font-black leading-[0.98] text-balance sm:mt-4">
            Fast dispatch for Central Indiana homes and businesses.
          </h1>
          <p className="mt-4 max-w-2xl text-(length:--text-lead) leading-relaxed text-muted-foreground sm:mt-5 sm:leading-8">
            Local crew, branded fleet, and clear emergency coverage when heating or cooling cannot wait.
          </p>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand-blue-dark/10 bg-brand-ice/90 px-4 py-3 text-brand-blue-dark sm:mt-5">
            <Clock className="mt-0.5 size-5 shrink-0 text-brand-red" aria-hidden />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-red">Emergency availability</p>
              <p className="mt-1 text-sm font-semibold leading-snug sm:text-base">{siteConfig.hours.emergency}</p>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{siteConfig.emergencyMessage}</p>
            </div>
          </div>

          <div className="mt-6 flex w-full min-w-0 flex-col gap-3 sm:mt-7">
            <a
              href={phoneHref}
              className={cn(
                buttonVariants({ variant: "emergency", size: "lg" }),
                "min-h-14 w-full justify-center gap-2.5 py-3.5 text-base font-black shadow-lg sm:text-lg",
              )}
            >
              <Phone data-icon="inline-start" className="size-5" aria-hidden />
              Call now — {siteConfig.phone}
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={routes.requestService + REQUEST_FORM_HASH}
                className={cn(buttonVariants({ variant: "dark", size: "lg" }), "min-h-14 w-full justify-center gap-2 px-4 text-base font-bold")}
              >
                Request service <ArrowRight data-icon="inline-end" className="size-4" aria-hidden />
              </Link>
              <Link
                href={routes.requestServiceIntent("maintenance") + REQUEST_FORM_HASH}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-14 w-full justify-center gap-2 border-brand-blue-dark/25 px-4 text-base font-bold",
                )}
              >
                Book service <ArrowRight data-icon="inline-end" className="size-4" aria-hidden />
              </Link>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-brand-blue-dark/12 bg-white/90 p-4 shadow-sm sm:mt-7">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-red">Start a request</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {QUICK_INTENTS.map(({ label, intent }) => (
                <li key={intent}>
                  <Link
                    href={routes.requestServiceIntent(intent) + REQUEST_FORM_HASH}
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "min-h-11 rounded-full border border-brand-blue-dark/10 px-4 text-sm font-bold text-brand-blue-dark hover:border-brand-red/35 hover:bg-brand-ice",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-w-0 lg:flex lg:flex-col lg:justify-center">
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue-dark shadow-2xl ring-2 ring-brand-red/35">
            <BrandPattern variant="dark" />
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <CloudinaryImage
                asset={van}
                fill
                priority
                preset="hero"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="pointer-events-none absolute left-3 top-3 max-w-[min(100%,19rem)] rounded-lg bg-brand-blue-dark/92 px-3 py-2 text-white shadow-lg ring-1 ring-white/20 backdrop-blur-sm sm:left-4 sm:top-4 sm:px-4 sm:py-2.5">
              <p className="text-[10px] font-black uppercase leading-tight tracking-[0.18em] text-brand-red sm:text-xs">Local service presence</p>
              <p className="mt-1 text-xs font-bold leading-snug sm:text-sm">Central Indiana HVAC service</p>
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
