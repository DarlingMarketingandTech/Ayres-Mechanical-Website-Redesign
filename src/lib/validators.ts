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
  website: z.string().trim().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const diagnosticContactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number."),
  city: z.string().min(2, "Please enter your city."),
  website: z.string().trim().max(0).optional().or(z.literal("")),
});

export type DiagnosticContactValues = z.infer<typeof diagnosticContactSchema>;

export const diagnosticSubmissionSchema = z.object({
  metaData: z.object({
    propertyType: z.string().optional(),
    propertyTypeLabel: z.string().optional(),
    systemAge: z.string().optional(),
    systemAgeLabel: z.string().optional(),
    existingCustomer: z.string().optional(),
    existingCustomerLabel: z.string().optional(),
  }),
  userAnswers: z.record(z.string(), z.string()),
  contactInfo: diagnosticContactSchema,
  pathSummary: z.array(z.string()).optional(),
  currentStepId: z.string().optional(),
});

export type DiagnosticSubmissionPayload = z.infer<typeof diagnosticSubmissionSchema>;
