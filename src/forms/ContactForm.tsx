"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators";

const serviceTypes = ["Heating", "Air Conditioning", "Maintenance", "Ductwork", "Commercial HVAC", "Industrial HVAC", "Emergency Service"];
const customerTypes = ["Residential", "Commercial", "Industrial"];
const urgencyOptions = ["Emergency", "This week", "Routine maintenance", "Planning ahead"];
const contactMethods = ["Phone", "Email", "Either"];
const fallbackErrorMessage = "Something went wrong. Please call for immediate service.";

type SubmissionStatus = {
  type: "success" | "error";
  message: string;
} | null;

export function ContactForm({
  compact = false,
  prefill,
  formId,
}: {
  compact?: boolean;
  prefill?: Partial<ContactFormValues>;
  /** When set, enables in-page anchor links (e.g. `#request-service-form`) and scroll margin. */
  formId?: "request-service-form";
}) {
  const [status, setStatus] = useState<SubmissionStatus>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      customerType: "",
      urgency: "",
      preferredContact: "Phone",
      message: "",
      ...prefill,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (response.ok) {
        setStatus({ type: "success", message: result?.message ?? "Thanks. Your request has been sent." });
        reset();
        return;
      }
      setStatus({ type: "error", message: result?.message ?? fallbackErrorMessage });
    } catch {
      setStatus({ type: "error", message: fallbackErrorMessage });
    }
  }

  return (
    <form
      {...(formId ? { id: formId } : {})}
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid gap-4 rounded-3xl border bg-white p-6 shadow-sm", formId === "request-service-form" && "scroll-mt-28")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}><Input {...register("name")} aria-invalid={Boolean(errors.name)} /></Field>
        <Field label="Phone" error={errors.phone?.message}><Input {...register("phone")} aria-invalid={Boolean(errors.phone)} /></Field>
      </div>
      <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")} aria-invalid={Boolean(errors.email)} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Service type" options={serviceTypes} register={register("serviceType")} error={errors.serviceType?.message} />
        <SelectField label="Customer type" options={customerTypes} register={register("customerType")} error={errors.customerType?.message} />
      </div>
      {!compact ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField label="Urgency" options={urgencyOptions} register={register("urgency")} error={errors.urgency?.message} />
          <SelectField label="Preferred contact" options={contactMethods} register={register("preferredContact")} error={errors.preferredContact?.message} />
        </div>
      ) : null}
      <Field label="Message" error={errors.message?.message}><Textarea rows={5} {...register("message")} aria-invalid={Boolean(errors.message)} /></Field>
      <Button type="submit" variant="emergency" size="lg" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Submit Request"}</Button>
      {status?.type === "success" ? <p className="rounded-lg bg-secondary p-3 text-sm font-semibold text-brand-blue-dark">{status.message}</p> : null}
      {status?.type === "error" ? <p className="rounded-lg bg-accent p-3 text-sm font-semibold text-brand-red">{status.message}</p> : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      {children}
      {error ? <span className="text-sm text-brand-red">{error}</span> : null}
    </label>
  );
}

function SelectField({ label, options, register, error }: { label: string; options: string[]; register: ReturnType<typeof useForm<ContactFormValues>>["register"] extends (name: infer N) => infer R ? R : never; error?: string }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      <select {...register} aria-invalid={Boolean(error)} className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <option value="">Select...</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error ? <span className="text-sm text-brand-red">{error}</span> : null}
    </label>
  );
}
