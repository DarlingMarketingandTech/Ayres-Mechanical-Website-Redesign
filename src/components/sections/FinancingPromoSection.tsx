import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { buttonVariants } from "@/components/ui/button";
import { financingHomePromo, financingServicePromo, ftlFinanceLearnMoreUrl } from "@/content/financing";
import { media } from "@/content/media";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const ftlAsset = media.financing.ftlLogo;

export function FinancingPromoSection({ variant }: { variant: "home" | "service" }) {
  const isHome = variant === "home";

  return (
    <Section className={isHome ? "bg-white" : "bg-brand-ice"}>
      <Container>
        <div
          className={cn(
            "overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-border",
            isHome ? "lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center" : "flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8",
          )}
        >
          <div className={cn("flex items-center justify-center bg-muted/60", isHome ? "p-8 lg:p-10" : "shrink-0 rounded-2xl p-6 sm:max-w-[min(100%,280px)]")}>
            <CloudinaryImage
              asset={ftlAsset}
              disableLqip
              width={ftlAsset.width}
              height={ftlAsset.height}
              sizes={isHome ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 640px) 240px, 100vw"}
              className={cn("h-auto w-full object-contain", isHome ? "max-h-[200px]" : "max-h-[120px] sm:max-h-[100px]")}
            />
          </div>
          <div className={cn("space-y-4", isHome ? "p-8 lg:p-10" : "min-w-0 flex-1")}>
            {isHome ? (
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">{financingHomePromo.eyebrow}</p>
            ) : null}
            <h2 className="text-2xl font-black text-brand-blue-dark sm:text-3xl">{isHome ? financingHomePromo.title : financingServicePromo.title}</h2>
            <p className="leading-7 text-muted-foreground">{isHome ? financingHomePromo.description : financingServicePromo.description}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href={routes.financing}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "group/fin shadow-md transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg motion-reduce:transform-none",
                  "[&_[data-icon='inline-end']]:transition-transform [&_[data-icon='inline-end']]:duration-300 [&_[data-icon='inline-end']]:group-hover/fin:translate-x-1 motion-reduce:[&_[data-icon='inline-end']]:transform-none",
                )}
              >
                Financing details <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
              <a
                href={ftlFinanceLearnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "group/ftl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-md motion-reduce:transform-none",
                  "[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:group-hover/ftl:translate-x-0.5 motion-reduce:[&_svg]:transform-none",
                )}
              >
                Visit FTL Finance to Learn More <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
