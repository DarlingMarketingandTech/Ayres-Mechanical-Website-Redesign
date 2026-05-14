import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About", description: "Learn about Ayres Mechanical Inc., a Central Indiana heating and air conditioning company serving residential, commercial, and industrial customers.", path: "/about" });

export default function AboutPage() {
  return <BasicPageTemplate eyebrow="About" title="A practical HVAC service partner for Central Indiana." description="Ayres Mechanical serves residential, commercial, and industrial customers with direct communication and dependable service."><div className="prose prose-slate max-w-3xl"><p>This first-phase page is structured for owner-approved company history, credentials, team details, and proof points. Add verified years in business, licensing details, certifications, and service philosophy before launch.</p></div></BasicPageTemplate>;
}
