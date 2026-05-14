import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "Privacy policy placeholder for Ayres Mechanical Inc.", path: "/privacy-policy" });

export default function PrivacyPage() {
  return <BasicPageTemplate eyebrow="Privacy" title="Privacy Policy" description="Legal copy should be reviewed before launch."><p className="leading-8 text-muted-foreground">Privacy policy content placeholder. Replace with owner-approved legal copy before publishing.</p></BasicPageTemplate>;
}
