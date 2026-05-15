import { ExternalLink } from "lucide-react";

import { CloudinaryImage } from "@/components/media/CloudinaryImage";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { buttonVariants } from "@/components/ui/button";
import { financingPageCopy, ftlFinanceLearnMoreUrl } from "@/content/financing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Financing",
  description:
    "Residential HVAC financing through FTL Finance with Ayres Mechanical Inc.—fixed rates, fair credit reviews beyond a single score, and a straightforward application process.",
  path: "/financing",
});

export default function FinancingPage() {
  const { headline, intro, whyTitle, reasons, closing, ctaLabel } = financingPageCopy;

  return (
    <BasicPageTemplate
      eyebrow="Financing"
      title={headline}
      description="Partnered with FTL Finance for fixed-interest residential HVAC financing that considers your full financial picture—not only a credit score."
    >
      <div className="space-y-10">
        <div className="overflow-hidden rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
          <div className="flex justify-center rounded-2xl bg-muted/50 py-8">
            <CloudinaryImage
              assetKey="ftlFinanceLogo1024"
              preset="logo"
              sizes="(min-width: 768px) 640px, 100vw"
              className="h-auto max-h-[200px] w-full max-w-2xl object-contain px-4"
              priority
            />
          </div>
          <p className="mt-8 text-lg leading-8 text-muted-foreground">{intro}</p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-border sm:p-8">
          <h2 className="text-2xl font-black text-brand-blue-dark sm:text-3xl">{whyTitle}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {reasons.map((item) => (
              <li key={item.title} className="rounded-2xl bg-secondary p-5">
                <p className="font-black text-brand-blue-dark">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-lg leading-8 text-muted-foreground">{closing}</p>
          <div className="mt-8">
            <a
              href={ftlFinanceLearnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "emergency", size: "lg" })}
            >
              {ctaLabel} <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </BasicPageTemplate>
  );
}
