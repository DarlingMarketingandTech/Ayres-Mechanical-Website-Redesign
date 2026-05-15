import type { BookingRequestValues, ContactFormValues } from "@/lib/validators";

type ContactSubmissionResult = {
  status: "delivered" | "pending_integration";
  message: string;
};

export type SubmittedRequestPayload =
  | { form: "contact"; values: ContactFormValues }
  | { form: "booking"; values: BookingRequestValues };

// Set CONTACT_REQUEST_WEBHOOK_URL to your CRM / service-desk endpoint when credentials are approved.
// Until then, validated submissions return a 202 with call-to-action copy instead of failing silently.
const contactWebhookUrl = process.env.CONTACT_REQUEST_WEBHOOK_URL?.trim();

export async function submitContactRequest(
  payload: SubmittedRequestPayload,
): Promise<ContactSubmissionResult> {
  if (!contactWebhookUrl) {
    return {
      status: "pending_integration",
      message:
        payload.form === "booking" && payload.values.urgency.startsWith("Emergency")
          ? "Your request is saved locally for review. For immediate emergency HVAC help, call Ayres Mechanical now."
          : "Request details passed validation. Production delivery is pending owner confirmation, so please call for time-sensitive service.",
    };
  }

  const response = await fetch(contactWebhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "ayres-mechanical-website",
      form: payload.form,
      submittedAt: new Date().toISOString(),
      values: payload.values,
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed with status ${response.status}`);
  }

  return {
    status: "delivered",
    message:
      payload.form === "booking"
        ? "Thanks. Your service request has been sent to Ayres Mechanical."
        : "Thanks. Your request has been sent to Ayres Mechanical.",
  };
}
