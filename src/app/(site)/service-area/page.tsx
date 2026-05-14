import { PageHero } from "@/components/sections/Hero";
import { ServiceAreaGrid } from "@/components/sections/ServiceAreaGrid";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Service Area", description: "Ayres Mechanical provides heating and air conditioning service throughout Central Indiana.", path: "/service-area" });

export default function ServiceAreaPage() {
  return <><PageHero eyebrow="Service Area" title="Central Indiana HVAC service areas." description="Explore local HVAC service pages for Ayres Mechanical. Confirm final service areas with the business owner before publishing." /><Section><Container><ServiceAreaGrid /></Container></Section></>;
}
