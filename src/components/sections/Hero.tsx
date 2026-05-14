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
      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">{siteConfig.tagline}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">Heating & Air Conditioning Service Built for Central Indiana</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-muted-foreground">Ayres Mechanical provides residential, commercial, and industrial HVAC service with fast response, dependable workmanship, and 24-hour service when comfort cannot wait.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={routes.requestService} className={cn(buttonVariants({ variant: "emergency", size: "lg" }))}>
              Request Service <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Link>
            <a href={phoneHref} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              <Phone data-icon="inline-start" aria-hidden="true" /> Call {siteConfig.phone}
            </a>
          </div>
        </div>
        <div className="relative min-h-[420px] rounded-[2rem] bg-brand-blue-dark p-6 text-white shadow-2xl">
          <BrandPattern variant="dark" />
          <div className="relative flex h-full min-h-[372px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/10 p-6 backdrop-blur">
            <TriangleMark className="h-24 w-16" tone="light" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-white/70">Residential · Commercial · Industrial</p>
              <h2 className="mt-4 text-4xl font-black text-white">24-hour service with a clear path from call to comfort.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-bold">
              {['Heating', 'Cooling', 'Maintenance', 'Emergency'].map((item) => (
                <div key={item} className="rounded-xl border border-white/15 bg-white/10 p-4">{item}</div>
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
      <Container className="relative py-16 lg:py-20">
        <p className={cn("text-sm font-black uppercase tracking-[0.24em]", dark ? "text-white/70" : "text-brand-red")}>{eyebrow}</p>
        <h1 className={cn("mt-4 max-w-4xl text-5xl font-black leading-none sm:text-6xl", dark ? "text-white" : "text-brand-blue-dark")}>{title}</h1>
        <p className={cn("mt-5 max-w-3xl text-xl leading-8", dark ? "text-white/75" : "text-muted-foreground")}>{description}</p>
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
