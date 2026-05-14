import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Choose a service type."),
  customerType: z.string().min(1, "Choose a customer type."),
  urgency: z.string().min(1, "Choose an urgency."),
  preferredContact: z.string().min(1, "Choose a contact method."),
  message: z.string().min(10, "Please share a few details about the request."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
