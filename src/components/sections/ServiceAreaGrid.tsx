import Link from "next/link";
import { MapPin } from "lucide-react";

import { serviceLocations } from "@/content/locations";
import { routes } from "@/lib/routes";

export function ServiceAreaGrid({ limit }: { limit?: number }) {
  const locations = typeof limit === "number" ? serviceLocations.slice(0, limit) : serviceLocations;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <Link
          key={location.slug}
          href={routes.location(location.slug)}
          className="group relative overflow-hidden rounded-2xl border border-border/80 bg-white p-5 shadow-sm ring-1 ring-transparent transition-[transform,box-shadow,border-color,ring-color] duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_18px_40px_-18px_rgb(13_63_184_/0.28)] hover:ring-primary/15 motion-reduce:transform-none"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary shadow-inner transition-[transform,background-color,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:bg-primary/10 group-hover:shadow-md motion-reduce:transform-none">
              <MapPin className="size-5 transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none" aria-hidden="true" />
            </span>
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
