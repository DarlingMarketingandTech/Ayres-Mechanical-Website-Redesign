import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema } from "@/components/seo/schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <SiteHeader />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
