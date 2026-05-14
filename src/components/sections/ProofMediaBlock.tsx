import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import type { CloudinaryMediaAsset } from "@/content/media";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

type ProofMediaBlockProps = {
  asset: CloudinaryMediaAsset;
  eyebrow: string;
  title: string;
  description: string;
  proofPoints?: string[];
  caption?: string;
  reverse?: boolean;
  className?: string;
  sizes?: string;
};

export function ProofMediaBlock({
  asset,
  eyebrow,
  title,
  description,
  proofPoints = [],
  caption,
  reverse = false,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: ProofMediaBlockProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-border lg:grid-cols-2",
        className,
      )}
    >
      <div className={cn("bg-muted", reverse && "lg:order-2")}>
        <Image
          src={cloudinaryImageUrl(asset)}
          alt={asset.alt}
          width={asset.width}
          height={asset.height}
          sizes={sizes}
          className="h-full min-h-[280px] w-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center p-6 lg:p-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-red">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black text-brand-blue-dark sm:text-4xl">{title}</h2>
        <p className="mt-4 leading-8 text-muted-foreground">{description}</p>

        {proofPoints.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {proofPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm font-bold leading-6 text-brand-blue-dark">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {caption ? (
          <p className="mt-6 border-t pt-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}
