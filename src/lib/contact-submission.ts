import type { ContactFormValues } from "@/lib/validators";

type ContactSubmissionResult = {
  status: "delivered" | "pending_integration";
  message: string;
};

const contactWebhookUrl = process.env.CONTACT_REQUEST_WEBHOOK_URL?.trim();

export async function submitContactRequest(values: ContactFormValues): Promise<ContactSubmissionResult> {
  if (!contactWebhookUrl) {
    return {
      status: "pending_integration",
      message:
        "Request details passed validation. Production delivery is pending owner confirmation, so please call for time-sensitive service.",
    };
  }

  const response = await fetch(contactWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "ayres-mechanical-website",
      submittedAt: new Date().toISOString(),
      values,
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed with status ${response.status}`);
  }

  return {
    status: "delivered",
    message: "Thanks. Your request has been sent to Ayres Mechanical.",
  };
}
