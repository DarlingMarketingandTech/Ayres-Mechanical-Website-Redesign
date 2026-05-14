import { CheckCircle2 } from "lucide-react";

export function FeatureBand({ title, features }: { title: string; features: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-border lg:p-8">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="flex gap-3 rounded-xl bg-secondary p-4">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
            <p className="font-semibold leading-7 text-brand-blue-dark">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
