import { ContactForm } from "@/forms/ContactForm";
import { BasicPageTemplate } from "@/components/templates/BasicPageTemplate";
import { siteConfig } from "@/content/site";
import { media } from "@/content/media";
import { emailHref } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact", description: "Contact Ayres Mechanical Inc. for residential, commercial, and industrial HVAC service in Central Indiana.", path: "/contact" });

export default function ContactPage() {
  return (
    <BasicPageTemplate
      eyebrow="Contact"
      title="Contact Ayres Mechanical."
      description="Call for urgent HVAC service or send a request with the details below."
      heroBackground={media.home.localProof}
      heroBackgroundClassName="object-[center_58%]"
      heroPhotoOverlay="light-soft"
    >
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-brand-blue-dark p-6 text-white">
          <h2 className="text-3xl font-black text-white">Call {siteConfig.phone}</h2>
          <p className="mt-3 text-white/75">24 Hour Service for heating and cooling issues that cannot wait.</p>
          {siteConfig.email && emailHref ? (
            <>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-white/60">Email</p>
              <a href={emailHref} className="font-bold hover:underline">
                {siteConfig.email}
              </a>
            </>
          ) : (
            <div className="mt-6 space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">Fastest response</p>
              <p className="font-bold">Call for urgent service. Use the form for scheduling and non-emergency questions.</p>
            </div>
          )}
        </div>
        <ContactForm />
      </div>
    </BasicPageTemplate>
  );
}
