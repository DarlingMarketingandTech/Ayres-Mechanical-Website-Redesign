import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CornerAccent } from "@/components/brand/CornerAccent";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/content/services";
import { routes } from "@/lib/routes";

const cardAccentPattern = ["red", "blue", "red", "blue", "red", "blue", "red"] as const;

export function ServiceCards({ limit }: { limit?: number }) {
  const visibleServices = typeof limit === "number" ? services.slice(0, limit) : services;
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {visibleServices.map((service, index) => {
        const accent = cardAccentPattern[index] ?? "blue";
        return (
          <Link key={service.slug} href={routes.service(service.slug)} className="group block">
            <Card className="relative h-full overflow-hidden border-border bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
              <CornerAccent color={accent} />
              <CardHeader>
                <ServiceIcon icon={service.icon} className={accent === "red" ? "bg-accent text-brand-red" : ""} />
                <CardTitle className="mt-4 text-2xl font-black">{service.shortTitle}</CardTitle>
                <CardDescription className="text-base leading-7">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-2 text-sm font-black text-primary">
                  View service <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
