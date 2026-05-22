import { Suspense } from "react";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SystemStrainBanner, SystemStrainBannerFallback } from "@/components/layout/SystemStrainBanner";
import { InPageCtaProvider } from "@/components/providers/in-page-cta-context";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <InPageCtaProvider>
      <JsonLd data={localBusinessSchema()} />
      <Suspense fallback={<SystemStrainBannerFallback />}>
        <SystemStrainBanner />
      </Suspense>
      <SiteChrome />
      <main
        id="main-content"
        className="min-h-screen max-lg:pb-(--mobile-bottom-chrome-h)"
        style={{ paddingTop: "calc(var(--site-header-h, 7rem) + var(--system-strain-banner-h, 0px))" }}
      >
        {children}
      </main>
      <SiteFooter />
    </InPageCtaProvider>
  );
}
