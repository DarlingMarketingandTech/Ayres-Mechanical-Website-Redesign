import { handleValidatedPost } from "@/core/api/post-route";
import { submitCommercialLead } from "@/core/services/commercial-lead-submission";
import { commercialLeadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  return handleValidatedPost(request, {
    schema: commercialLeadSchema,
    invalidBodyMessage: "Please submit the commercial intake form using valid form fields.",
    honeypot: (values) => Boolean(values.website),
    execute: submitCommercialLead,
    logLabel: "Commercial lead delivery failed.",
  });
}
