"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";
import { cn } from "@/lib/utils";

const counties = [
  {
    name: "Marion",
    hubs: "Indianapolis-area offices, retail, restaurants, light commercial, multi-tenant buildings",
    classes: "Office, retail, restaurant, and multi-tenant comfort systems",
    relevance: "Dense commercial routes and business-continuity service planning.",
  },
  {
    name: "Hendricks",
    hubs: "Plainfield, Avon, Brownsburg, logistics, retail, property management sites",
    classes: "Logistics, retail, and managed property portfolios",
    relevance: "Strong fit for multi-site scheduling and planned maintenance cadence.",
  },
  {
    name: "Hamilton",
    hubs: "Carmel, Noblesville, Westfield, offices, medical/professional spaces, retail",
    classes: "Professional, medical, office, and retail facilities",
    relevance: "Comfort accountability for customer-facing and staff-heavy spaces.",
  },
  {
    name: "Montgomery",
    hubs: "Crawfordsville, local businesses, schools, light industrial, core service base",
    classes: "Local business, education, and light industrial facilities",
    relevance: "Core Central Indiana base for practical commercial HVAC support.",
  },
  {
    name: "Putnam",
    hubs: "Greencastle-area businesses, small institutional sites, light commercial",
    classes: "Small institutional, local business, and light commercial systems",
    relevance: "Good fit for documented maintenance and repair-versus-replacement planning.",
  },
  {
    name: "Boone",
    hubs: "Lebanon, Zionsville, growing commercial corridors, office/retail portfolios",
    classes: "Office, retail, and growing commercial corridors",
    relevance: "Portfolio readiness for expanding commercial and property management needs.",
  },
];

export function RegionalDispatchMatrix() {
  const [selected, setSelected] = useState(counties[0]);

  return (
    <Section id="dispatch-coverage" className="scroll-mt-28 bg-brand-ice">
      <Container>
        <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Regional dispatch matrix</p>
            <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
              Commercial coverage for Central Indiana facility teams.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Select a county to see the commercial hubs, facility classes, and service relevance for multi-site readiness.
            </p>
          </div>
          <figure className="relative aspect-[16/9] overflow-hidden rounded-[2rem] border border-white bg-white shadow-sm">
            <CloudinaryImage
              asset={media.commercialPortal.dispatchMap}
              fill
              width={1600}
              height={893}
              sizes="(min-width: 1024px) 38vw, 100vw"
              aspectRatio="16:9"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
            <figcaption className="sr-only">{media.commercialPortal.dispatchMap.alt}</figcaption>
          </figure>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {counties.map((county) => {
              const active = selected.name === county.name;
              return (
                <button
                  key={county.name}
                  type="button"
                  onClick={() => setSelected(county)}
                  className={cn(
                    "rounded-2xl border p-4 text-left shadow-sm transition-[border-color,background-color,transform] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                    active ? "border-brand-red bg-white" : "border-border/70 bg-white/70 hover:bg-white",
                  )}
                  aria-pressed={active}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-xl", active ? "bg-brand-red text-white" : "bg-brand-ice text-primary")}>
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-lg font-black text-brand-blue-dark">{county.name} County</span>
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-muted-foreground">{county.hubs}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm sm:p-8" aria-live="polite">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">{selected.name} County</p>
            <h3 className="mt-3 text-3xl font-black text-brand-blue-dark">Commercial dispatch relevance</h3>
            <div className="mt-6 grid gap-4">
              <Detail label="Commercial hubs / examples" value={selected.hubs} />
              <Detail label="Facility classes serviced" value={selected.classes} />
              <Detail label="Dispatch/service relevance" value={selected.relevance} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-blue-dark/60">{label}</p>
      <p className="mt-2 font-semibold leading-7 text-brand-blue-dark">{value}</p>
    </div>
  );
}
