import Link from "next/link";

import { PageHero } from "@/components/sections/Hero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { industries } from "@/content/industries";
import { routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Residential, Commercial & Industrial HVAC", description: "Ayres Mechanical serves residential, commercial, and industrial HVAC customers throughout Central Indiana.", path: "/industries" });

export default function IndustriesPage() {
  return <><PageHero eyebrow="Industries" title="HVAC support for homes, businesses, and industrial facilities." description="Choose the path that best matches how you use heating and cooling systems." /><Section><Container className="grid gap-5 md:grid-cols-3">{industries.map((industry) => <Link key={industry.slug} href={routes.industry(industry.slug)} className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl"><p className="text-sm font-black uppercase tracking-[0.2em] text-brand-red">{industry.eyebrow}</p><h2 className="mt-3 text-2xl font-black">{industry.title}</h2><p className="mt-3 leading-7 text-muted-foreground">{industry.description}</p></Link>)}</Container></Section></>;
}
