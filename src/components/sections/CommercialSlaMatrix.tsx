"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { trackAnalyticsEvent } from "@/lib/analytics";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const comparisonRows = [
  {
    category: "Emergency response windows",
    standard: "Next available dispatch",
    partnership: "Priority response planning and SLA options by account",
  },
  {
    category: "Travel and surge premium exposure",
    standard: "Reactive repairs with higher surprise exposure",
    partnership: "Planned maintenance cadence to reduce avoidable urgent calls",
  },
  {
    category: "Digital asset lifecycle logging",
    standard: "Limited equipment history",
    partnership: "Asset condition notes by site",
  },
  {
    category: "Annual budget planning health reports",
    standard: "Harder budget forecasting",
    partnership: "Budget planning support",
  },
  {
    category: "Maintenance scheduling",
    standard: "Scheduled after problems appear",
    partnership: "Recurring maintenance windows and seasonal planning",
  },
  {
    category: "Portfolio coordination",
    standard: "One service call at a time",
    partnership: "Better portfolio visibility across locations",
  },
  {
    category: "Priority communication path",
    standard: "Standard intake",
    partnership: "Account-aware communication path",
  },
];

export function CommercialSlaMatrix() {
  const [facilities, setFacilities] = useState(3);
  const risk = useMemo(() => currencyFormatter.format(facilities * 650), [facilities]);

  useEffect(() => {
    trackAnalyticsEvent("commercial_portal_view", { module: "sla_matrix" });
  }, []);

  return (
    <Section id="sla" className="scroll-mt-28 bg-brand-ice">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="rounded-[2rem] border border-border/70 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Commercial SLA planning</p>
            <h2 className="mt-3 text-3xl font-black text-balance text-brand-blue-dark sm:text-4xl">
              Move from on-call uncertainty to planned support.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              This planning model shows why facilities with multiple sites or RTUs benefit from a commercial partnership conversation.
            </p>
            <label htmlFor="facility-count" className="mt-8 grid gap-3 text-sm font-black text-brand-blue-dark">
              Number of facilities in your portfolio
              <input
                id="facility-count"
                type="range"
                min={1}
                max={20}
                value={facilities}
                onChange={(event) => setFacilities(Number(event.target.value))}
                className="h-11 w-full cursor-pointer accent-brand-red"
              />
            </label>
            <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-secondary p-4">
              <span className="text-sm font-bold text-brand-blue-dark/70">Facilities</span>
              <span className="text-3xl font-black text-brand-blue-dark">{facilities}</span>
            </div>
            <div className="mt-4 rounded-2xl bg-brand-blue-dark p-5 text-white" aria-live="polite">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Estimated Uncontracted Financial Risk Retained</p>
              <p className="mt-2 text-3xl font-black">{risk} / Year</p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Planning estimate for comparing reactive service exposure. Not a quote or guarantee.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-sm">
            <div className="grid gap-0 md:grid-cols-[0.8fr_1fr_1fr]">
              <div className="hidden bg-brand-blue-dark p-4 text-sm font-black uppercase tracking-[0.16em] text-white/65 md:block">
                Category
              </div>
              <div className="bg-brand-blue-dark p-4 text-sm font-black uppercase tracking-[0.16em] text-white/65">
                Standard On-Call Service
              </div>
              <div className="bg-brand-red p-4 text-sm font-black uppercase tracking-[0.16em] text-white">
                Commercial Partnership
              </div>
              {comparisonRows.map((row) => (
                <div key={row.category} className="contents">
                  <div className="border-t border-border/70 p-4 font-black text-brand-blue-dark md:bg-brand-ice/50">{row.category}</div>
                  <div className="border-t border-border/70 p-4 leading-7 text-muted-foreground">{row.standard}</div>
                  <div className="border-t border-border/70 p-4">
                    <div className="flex gap-3">
                      <CheckCircle2 className="mt-1 size-5 shrink-0 text-brand-red" aria-hidden="true" />
                      <p className="font-semibold leading-7 text-brand-blue-dark">{row.partnership}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
