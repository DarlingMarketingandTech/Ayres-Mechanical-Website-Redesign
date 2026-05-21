import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { pageMetadata } from "@/lib/seo";

const policySections = [
  {
    title: "Information we collect",
    body: [
      "When you call Ayres Mechanical, submit a request form, or contact the company through the website, the information you provide may include your name, phone number, email address, service address, and the details of your heating or cooling request.",
      "Basic technical information such as browser type, pages visited, and general device data may also be collected to help keep the site working properly and understand how people use it.",
    ],
  },
  {
    title: "How information is used",
    body: [
      "Ayres Mechanical uses submitted information to respond to service requests, schedule visits, follow up about estimates or ongoing work, and improve customer support.",
      "Information may also be used to maintain site security, prevent misuse, and evaluate website performance.",
    ],
  },
  {
    title: "Sharing information",
    body: [
      "Personal information is not sold. Information may be shared with service providers that help operate the website, process contact requests, support communication, or maintain business systems, but only for those business purposes.",
      "Information may also be disclosed when required by law or when reasonably necessary to protect the rights, safety, and operations of Ayres Mechanical, its customers, or the public.",
    ],
  },
  {
    title: "Cookies and analytics",
    body: [
      "The site may use cookies or similar technologies to remember preferences, support website functionality, and measure traffic. Browser settings can usually be adjusted to manage or block cookies, although some features may work differently if cookies are disabled.",
    ],
  },
  {
    title: "Data retention and security",
    body: [
      "Submitted information is kept only as long as reasonably needed for customer service, business records, legal obligations, or operational needs. Ayres Mechanical uses reasonable administrative and technical safeguards to protect the information it receives, but no website or internet transmission can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "If you need to update contact information previously submitted through the site, or if you have questions about how your information is being used, contact Ayres Mechanical directly by phone.",
    ],
  },
];

export const metadata = pageMetadata({ title: "Privacy Policy", description: "Learn how Ayres Mechanical collects, uses, and protects information submitted through this website.", path: "/privacy-policy" });

export default function PrivacyPage() {
  return (
    <BasicPageTemplate
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This policy explains how information submitted through the Ayres Mechanical website is handled."
    >
      <div className="space-y-8">
        <p className="leading-8 text-muted-foreground">
          This Privacy Policy applies to information collected through the Ayres Mechanical website and related contact forms. By using this site, you consent to the practices described below.
        </p>
        {policySections.map((section) => (
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
          Ayres Mechanical may update this policy from time to time by posting a revised version on this page.
        </p>
      </div>
    </BasicPageTemplate>
  );
}
