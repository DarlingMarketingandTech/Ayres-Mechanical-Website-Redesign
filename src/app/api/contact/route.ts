import { handleValidatedPost } from "@/core/api/post-route";
import { submitContactRequest } from "@/core/services/contact-submission";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  return handleValidatedPost(request, {
    schema: contactFormSchema,
    invalidBodyMessage: "Please submit the contact form using valid form fields.",
    honeypot: (values) => Boolean(values.website),
    execute: submitContactRequest,
    logLabel: "Contact request delivery failed.",
  });
}
