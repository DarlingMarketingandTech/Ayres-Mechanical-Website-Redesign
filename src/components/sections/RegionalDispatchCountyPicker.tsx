"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import type { RegionalDispatchCounty } from "@/content/regional-dispatch";
import { cn } from "@/lib/utils";

export function RegionalDispatchCountyPicker({ counties }: { counties: RegionalDispatchCounty[] }) {
  const [selected, setSelected] = useState(counties[0]);

  return (
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
                <span
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-xl",
                    active ? "bg-brand-red text-white" : "bg-brand-ice text-primary",
                  )}
                >
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
