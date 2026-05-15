import Link from "next/link";
import { MapPin } from "lucide-react";

import { serviceLocations } from "@/content/locations";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function ServiceAreaGrid({ limit }: { limit?: number }) {
  const locations = typeof limit === "number" ? serviceLocations.slice(0, limit) : serviceLocations;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location, index) => (
        <Link
          key={location.slug}
          href={routes.location(location.slug)}
          className={cn(
            "group rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
            index % 2 === 0 ? "border-border bg-white" : "border-brand-blue-dark/10 bg-brand-ice/80 ring-1 ring-brand-blue-dark/8",
          )}
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary"><MapPin className="size-5" aria-hidden="true" /></span>
            <div>
              <h3 className="text-xl font-black">{location.city}, {location.state}</h3>
              <p className="text-sm text-muted-foreground">{location.county}</p>
            </div>
          </div>
          <p className="mt-4 line-clamp-3 leading-7 text-muted-foreground">{location.intro}</p>
        </Link>
      ))}
    </div>
  );
}
