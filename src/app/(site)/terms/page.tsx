import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

const termsSections = [
  {
    title: "Website use",
    body: [
      "This website is provided for general information about Ayres Mechanical and its services. You agree to use the site only for lawful purposes and not to interfere with the normal operation, security, or availability of the site.",
    ],
  },
  {
    title: "Informational content",
    body: [
      "Service descriptions, financing information, and other website content are intended for general guidance only. Website content does not create a binding quote, guarantee of availability, or promise that a specific repair, timeline, or financing result will apply to your situation.",
    ],
  },
  {
    title: "Estimates and service scheduling",
    body: [
      "Submitting a form or contacting Ayres Mechanical through the website does not by itself create a service contract. Scheduling, pricing, scope of work, and final service recommendations are confirmed separately after review of the request and, when needed, an on-site evaluation.",
    ],
  },
  {
    title: "Emergency service",
    body: [
      "If you are facing an urgent heating or cooling failure, calling Ayres Mechanical is the fastest path. If you smell gas, suspect carbon monoxide, or face any immediate life-safety risk, leave the area and contact emergency services before requesting HVAC assistance.",
    ],
  },
  {
    title: "Third-party links",
    body: [
      "This website may link to third-party websites such as review platforms, financing providers, maps, or other external services. Ayres Mechanical is not responsible for the privacy practices, availability, or content of those third-party websites.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, Ayres Mechanical is not liable for damages arising from the use of this website, delays in access, inaccuracies in website content, or reliance on website information without direct confirmation from the company.",
    ],
  },
];

export const metadata = pageMetadata({ title: "Terms", description: "Review the terms governing use of the Ayres Mechanical website and online service request tools.", path: "/terms" });

export default function TermsPage() {
  return (
    <BasicPageTemplate
      eyebrow="Terms"
      title="Terms of Use"
      description="These terms apply to your use of the Ayres Mechanical website and its contact tools."
    >
      <div className="space-y-8">
        <p className="leading-8 text-muted-foreground">
          By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.
        </p>
        {termsSections.map((section) => (
          <section key={section.title} className="space-y-3 rounded-3xl border bg-white p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-2xl font-black text-brand-blue-dark">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <p className="text-sm leading-7 text-muted-foreground">
          Ayres Mechanical may revise these terms by updating this page. Continued use of the site after changes are posted means you accept the updated terms.
        </p>
      </div>
    </BasicPageTemplate>
  );
}
