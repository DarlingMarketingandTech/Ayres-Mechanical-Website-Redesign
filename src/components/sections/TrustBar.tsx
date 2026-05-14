import { Building2, Clock, Factory, Home, MapPin } from "lucide-react";

const items = [
  { label: "24 Hour Service", icon: Clock },
  { label: "Residential", icon: Home },
  { label: "Commercial", icon: Building2 },
  { label: "Industrial", icon: Factory },
  { label: "Local Service", icon: MapPin },
];

export function TrustBar() {
  return (
    <section className="border-y bg-brand-blue-dark text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-black uppercase tracking-wide text-white/90">
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
