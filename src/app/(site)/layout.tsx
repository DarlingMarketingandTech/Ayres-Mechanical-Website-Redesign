import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { InPageCtaProvider } from "@/components/providers/in-page-cta-context";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <InPageCtaProvider>
      <JsonLd data={localBusinessSchema()} />
      <SiteHeader />
      <main id="main-content" className="min-h-screen pt-(--site-header-h,7rem)">
        {children}
      </main>
      <SiteFooter />
    </InPageCtaProvider>
  );
}
