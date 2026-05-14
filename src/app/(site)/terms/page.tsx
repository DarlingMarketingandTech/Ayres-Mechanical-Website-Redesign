import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms", description: "Terms placeholder for Ayres Mechanical Inc.", path: "/terms" });

export default function TermsPage() {
  return <BasicPageTemplate eyebrow="Terms" title="Terms" description="Legal copy should be reviewed before launch."><p className="leading-8 text-muted-foreground">Terms content placeholder. Replace with owner-approved legal copy before publishing.</p></BasicPageTemplate>;
}
