import { Building2, Clock, Factory, Home, MapPin } from "lucide-react";

import { Container } from "@/components/layout/Container";

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
      <Container className="grid grid-cols-2 gap-px py-3 sm:grid-cols-3 sm:py-4 lg:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-center text-xs font-black uppercase tracking-wide text-white/90 sm:min-h-0 sm:px-3 sm:py-3 sm:text-sm"
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span className="leading-tight">{item.label}</span>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
