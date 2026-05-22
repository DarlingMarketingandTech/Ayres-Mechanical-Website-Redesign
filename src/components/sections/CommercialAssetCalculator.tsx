"use client";

import { useMemo, useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";

import { CloudinaryImageReveal } from "@/components/media/CloudinaryImageReveal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { media } from "@/content/media";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ageSignals: Record<string, string> = {
  "0-5 years": "Protect warranty and performance.",
  "6-10 years": "Track wear and start lifecycle records.",
  "11-15 years": "Plan repair vs replacement windows.",
  "16+ years": "Build CapEx replacement calendar.",
};

const spendOptions = [
  { label: "$10k", value: 10000 },
  { label: "$25k", value: 25000 },
  { label: "$50k", value: 50000 },
  { label: "$100k+", value: 100000 },
];

export function CommercialAssetCalculator() {
  const [rtus, setRtus] = useState(6);
  const [age, setAge] = useState("6-10 years");
  const [energySpend, setEnergySpend] = useState(25000);
  const estimatedWaste = useMemo(() => currencyFormatter.format(energySpend * 0.15), [energySpend]);

  return (
    <Section id="asset-planning" className="scroll-mt-28 bg-white">
      <Container className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">Commercial asset calculator</p>
          <h2 className="mt-3 text-(length:--text-section) font-black text-balance text-brand-blue-dark">
            Turn RTU age and energy spend into a planning signal.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            This lightweight capital planning widget helps facility teams frame maintenance and replacement conversations before costs become urgent.
          </p>
          <figure className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-sm">
            <CloudinaryImageReveal
              asset={media.commercialPortal.assetPlanning}
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              aspectRatio="16:9"
              className="object-cover object-center"
              crop="fill"
              gravity="auto"
            />
            <figcaption className="sr-only">{media.commercialPortal.assetPlanning.alt}</figcaption>
          </figure>
        </div>

        <div className="rounded-[2rem] border border-border/70 bg-brand-ice p-6 shadow-sm sm:p-8">
          <div className="grid gap-5">
            <label htmlFor="rtu-count" className="grid gap-3 text-sm font-black text-brand-blue-dark">
              Number of active RTUs
              <input
                id="rtu-count"
                type="range"
                min={1}
                max={40}
                value={rtus}
                onChange={(event) => setRtus(Number(event.target.value))}
                className="h-11 w-full cursor-pointer accent-brand-red"
              />
              <span className="rounded-2xl bg-white p-4 text-3xl shadow-sm">{rtus}</span>
            </label>

            <label htmlFor="equipment-age" className="grid gap-2 text-sm font-black text-brand-blue-dark">
              Average equipment age
              <select
                id="equipment-age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                className="h-12 rounded-xl border border-input bg-white px-3 py-2 text-base shadow-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {Object.keys(ageSignals).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="grid gap-3">
              <legend className="text-sm font-black text-brand-blue-dark">Estimated annual HVAC energy spend</legend>
              <div className="grid grid-cols-2 gap-3">
                {spendOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setEnergySpend(option.value)}
                    className={`rounded-2xl border px-4 py-3 text-left font-black transition-colors ${
                      energySpend === option.value
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-border bg-white text-brand-blue-dark hover:border-primary/35"
                    }`}
                    aria-pressed={energySpend === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-8 grid gap-4" aria-live="polite">
            <div className="rounded-2xl bg-brand-blue-dark p-5 text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="size-5 text-brand-ice" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/55">Projected energy waste exposure</p>
              </div>
              <p className="mt-2 text-3xl font-black">{estimatedWaste} / Year</p>
              <p className="mt-2 text-sm leading-6 text-white/70">Uses a 15% efficiency loss assumption for unmaintained equipment.</p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Calculator className="size-5 text-primary" aria-hidden="true" />
                <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-blue-dark/60">Maintenance planning signal</p>
              </div>
              <p className="mt-3 text-xl font-black text-brand-blue-dark">{ageSignals[age]}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Potential +4 years with planned maintenance. This is an educational planning assumption, not a guarantee.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
