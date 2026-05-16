import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CornerAccent } from "@/components/brand/CornerAccent";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/content/services";
import { getServiceContentBySlug } from "@/data/services-content";
import { routes } from "@/lib/routes";

const cardAccentPattern = ["red", "blue", "red", "blue", "red", "blue", "red"] as const;

export function ServiceCards({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {visibleServices.map((service, index) => {
        const accent = cardAccentPattern[index] ?? "blue";
        const page = getServiceContentBySlug(service.slug);
        const thumb = page?.media?.heroBackground;
        return (
          <Link key={service.slug} href={routes.service(service.slug)} className="group block h-full">
            <Card className="relative h-full overflow-hidden border border-border/60 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-brand-blue-dark/20 flex flex-col justify-between">
              <CornerAccent color={accent} />
              {thumb ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/50 sm:aspect-[16/10]">
                  <CloudinaryImage
                    asset={thumb}
                    fill
                    sizes="(min-width: 1024px) 320px, 90vw"
                    className="object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-[1.03]"
                    crop="fill"
                    gravity="auto"
                  />
                </div>
              ) : null}
              <CardHeader>
                <div className="mb-2 p-3 w-fit rounded-xl bg-gray-50 group-hover:bg-brand-blue-dark/5 group-hover:scale-110 transition-transform duration-300">
                  <ServiceIcon icon={service.icon} className={accent === "red" ? "text-brand-red" : "text-brand-blue-dark"} />
                </div>
                <CardTitle className="mt-4 text-2xl font-black text-brand-blue-dark group-hover:text-brand-red transition-colors duration-300">{service.shortTitle}</CardTitle>
                <CardDescription className="text-base leading-7 text-muted-foreground mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-2 text-sm font-black text-brand-blue-dark group-hover:text-brand-red transition-colors duration-300">
                  View service <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-2" aria-hidden="true" />
                </span>
              </CardContent>
              {/* Subtle inner glow effect on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]" />
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
