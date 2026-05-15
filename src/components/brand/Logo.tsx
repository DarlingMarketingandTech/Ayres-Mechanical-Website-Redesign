import Image from "next/image";
import Link from "next/link";

import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { cloudinaryImageUrl } from "@/lib/cloudinary";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

const logoAsset = media.brand.primaryLogo;

type LogoProps = {
  className?: string;
  href?: string;
  /** Use on the header mark for faster LCP. */
  priority?: boolean;
};

export function Logo({ className, href = routes.home, priority = false }: LogoProps) {
  const src = cloudinaryImageUrl(logoAsset);

  return (
    <Link href={href} className="group inline-flex shrink-0" aria-label={siteConfig.name}>
      <Image
        src={src}
        alt={logoAsset.alt}
        width={logoAsset.width}
        height={logoAsset.height}
        sizes="(max-width: 640px) 240px, 360px"
        className={cn("h-10 w-auto max-w-[min(100%,240px)] object-contain object-left sm:h-11 sm:max-w-[280px]", className)}
        priority={priority}
      />
    </Link>
  );
}
