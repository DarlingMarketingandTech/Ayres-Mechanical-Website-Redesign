import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { ProofMediaBlock } from "@/components/sections/ProofMediaBlock";
import { media } from "@/content/media";
import { siteConfig } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About", description: "Learn about Ayres Mechanical Inc., a Central Indiana heating and air conditioning company serving residential, commercial, and industrial customers.", path: "/about" });

export default function AboutPage() {
  return (
    <BasicPageTemplate
      eyebrow="About"
      title="A practical HVAC service partner for Central Indiana."
      description="Ayres Mechanical serves residential, commercial, and industrial customers with direct communication and dependable service."
    >
      <div className="space-y-8">
        <ProofMediaBlock
          asset={media.about.ownerTeam}
          eyebrow="Company story"
          title="Real people, real equipment, and a direct service promise."
          description={`A verified ${siteConfig.shortName} company photo introduces the people and equipment behind the work. Owner-approved history, licensing details, certifications, and service philosophy can be layered in once confirmed.`}
          proofPoints={[
            siteConfig.description,
            siteConfig.emergencyMessage,
            "Future credential and company-history details remain gated until owner approval.",
          ]}
          caption="Ayres Mechanical team and equipment"
          reverse
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Residential",
              body: "Heating and cooling support for Central Indiana homeowners.",
            },
            {
              title: "Commercial",
              body: "Practical HVAC service paths for businesses and commercial spaces.",
            },
            {
              title: "Industrial",
              body: "Mechanical service positioning for facility and industrial needs.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border">
              <h2 className="text-2xl font-black">{item.title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </BasicPageTemplate>
  );
}
