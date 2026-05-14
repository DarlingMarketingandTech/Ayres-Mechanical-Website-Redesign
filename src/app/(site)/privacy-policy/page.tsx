import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "Owner-approved privacy policy copy is pending confirmation for Ayres Mechanical Inc.", path: "/privacy-policy" });

export default function PrivacyPage() {
  return <BasicPageTemplate eyebrow="Privacy" title="Privacy Policy" description="Legal copy should be reviewed before launch."><p className="leading-8 text-muted-foreground">Owner-approved privacy policy copy is pending confirmation before publishing.</p></BasicPageTemplate>;
}
