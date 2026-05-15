import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CornerAccent } from "@/components/brand/CornerAccent";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCardLines } from "@/content/service-cards";
import { cn } from "@/lib/utils";

export function ServiceCards({ limit }: { limit?: number }) {
  const visibleCards = typeof limit === "number" ? serviceCardLines.slice(0, limit) : serviceCardLines;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleCards.map((card) => (
        <Link
          key={card.id}
          href={card.href}
          className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2"
        >
          <Card
            className={cn(
              "relative h-full overflow-hidden border-border bg-white transition duration-200 ease-out",
              "group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-xl",
              "group-focus-visible:-translate-y-1 group-focus-visible:border-primary/35 group-focus-visible:shadow-xl",
            )}
          >
            <CornerAccent color={card.accent === "red" ? "red" : "blue"} />
            {card.imageKey ? (
              <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-ice">
                <CloudinaryImage
                  assetKey={card.imageKey}
                  fill
                  preset="card"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02] motion-reduce:transform-none"
                />
              </div>
            ) : null}
            <CardHeader className={card.imageKey ? "pt-5" : undefined}>
              <ServiceIcon
                icon={card.icon}
                className={cn(
                  "transition duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none",
                  card.accent === "red" ? "bg-accent text-brand-red" : "",
                  card.accent === "dark" ? "bg-brand-blue-dark/10 text-brand-blue-dark" : "",
                )}
              />
              <CardTitle className="mt-4 text-2xl font-black">{card.title}</CardTitle>
              <CardDescription className="text-base leading-7">{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center gap-2 text-sm font-black text-primary">
                {card.ctaLabel}
                <ArrowRight
                  className="size-4 transition duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
