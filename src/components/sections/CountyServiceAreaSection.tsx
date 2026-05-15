import Link from "next/link";
import { MapPin } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { routes } from "@/lib/routes";

const counties = [
  { name: "Marion County", representative: "Indianapolis" },
  { name: "Hendricks County", representative: "Plainfield" },
  { name: "Hamilton County", representative: "Carmel / Fishers" },
  { name: "Montgomery County", representative: "Crawfordsville" },
  { name: "Putnam County", representative: "Greencastle" },
  { name: "Boone County", representative: "Lebanon" },
] as const;

export function CountyServiceAreaSection() {
  return (
    <Section>
      <Container>
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Service Area</p>
          <h2 className="mt-3 text-(length:--text-section) font-black text-balance">
            Serving 6 Counties in Central Indiana.
          </h2>
          <p className="mt-4 leading-8 text-muted-foreground">
            No travel charges within our service area. We&apos;re local, we&apos;re prompt, and we&apos;re
            ready.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {counties.map(({ name, representative }) => (
            <div
              key={name}
              className="flex items-center gap-3 overflow-hidden rounded-2xl border border-border/80 bg-white p-5 shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary shadow-inner">
                <MapPin className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-black text-brand-blue-dark truncate">{name}</p>
                <p className="text-sm text-muted-foreground truncate">{representative}, IN</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm font-bold text-muted-foreground">
          Looking for your city?{" "}
          <Link href={routes.serviceArea} className="text-brand-red underline-offset-4 hover:underline">
            View all service area locations →
          </Link>
        </p>
      </Container>
    </Section>
  );
}
