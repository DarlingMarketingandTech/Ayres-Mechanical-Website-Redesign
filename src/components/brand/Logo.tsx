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
  linkClassName?: string;
  href?: string;
  /** Use on the header mark for faster LCP. */
  priority?: boolean;
  sizes?: string;
};

export function Logo({ className, linkClassName, href = routes.home, priority = false, sizes }: LogoProps) {
  const src = cloudinaryImageUrl(logoAsset);

  return (
    <Link href={href} className={cn("group inline-flex min-w-0 shrink", linkClassName)} aria-label={siteConfig.name}>
      <Image
        src={src}
        alt={logoAsset.alt}
        width={logoAsset.width}
        height={logoAsset.height}
        sizes={sizes ?? "(max-width: 640px) 280px, 400px"}
        className={cn("h-10 w-auto max-w-full object-contain object-left sm:h-11", className)}
        priority={priority}
      />
    </Link>
  );
}
