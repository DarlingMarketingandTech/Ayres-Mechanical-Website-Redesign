import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms", description: "Owner-approved terms copy is pending confirmation for Ayres Mechanical Inc.", path: "/terms" });

export default function TermsPage() {
  return <BasicPageTemplate eyebrow="Terms" title="Terms" description="Legal copy should be reviewed before launch."><p className="leading-8 text-muted-foreground">Owner-approved terms copy is pending confirmation before publishing.</p></BasicPageTemplate>;
}
