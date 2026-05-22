"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { phoneHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

const steps = ["Scope", "Footprint", "Equipment", "Contact"];
const equipmentOptions = [
  "Rooftop Packaged Units (RTUs)",
  "Commercial Split Systems",
  "Chillers / Hydronics",
  "Exhaust & VAV Zoning Controls",
  "Refrigeration / Coolers / Freezers",
  "Not sure yet",
];

const initialValues = {
  scope: "",
  squareFootage: "",
  locations: "",
  equipment: [] as string[],
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  principalCity: "",
  preferredFollowUp: "Phone",
  notes: "",
  website: "",
};

type Values = typeof initialValues;
type Errors = Partial<Record<keyof Values | "form", string>>;

type CommercialLeadResponse =
  | { ok: true; message?: string }
  | { ok: false; message?: string; errors?: Partial<Record<keyof Values, string[]>> };

export function CommercialIntakeWizard() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const computed = useMemo(() => computeLeadDetails(values), [values]);

  function updateValue<Key extends keyof Values>(key: Key, value: Values[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }));
  }

  function toggleEquipment(option: string) {
    updateValue(
      "equipment",
      values.equipment.includes(option)
        ? values.equipment.filter((item) => item !== option)
        : [...values.equipment, option],
    );
  }

  function validateStep(targetStep = step) {
    const nextErrors: Errors = {};

    if (targetStep === 0 && !values.scope) nextErrors.scope = "Choose a facility scope.";
    if (targetStep === 1) {
      if (!values.squareFootage) nextErrors.squareFootage = "Choose a square footage range.";
      if (!values.locations) nextErrors.locations = "Choose the number of facility locations.";
    }
    if (targetStep === 2 && values.equipment.length === 0) nextErrors.equipment = "Choose at least one equipment option.";
    if (targetStep === 3) {
      if (!values.companyName.trim()) nextErrors.companyName = "Enter the company name.";
      if (!values.contactName.trim()) nextErrors.contactName = "Enter a contact name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = "Enter a valid work email.";
      if (values.phone.trim().length < 7) nextErrors.phone = "Enter a phone number.";
      if (!values.principalCity.trim()) nextErrors.principalCity = "Enter a principal city.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep()) return;
    trackAnalyticsEvent("commercial_wizard_step_complete", { step: steps[step] });
    if (step === 0) {
      trackAnalyticsEvent("commercial_wizard_start", { scope: values.scope });
    }
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit() {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setErrors({});
    setSuccess(null);

    const payload = {
      ...values,
      leadType: "commercial",
      submittedFrom: "commercial-partnerships",
      portfolioType: values.scope,
      estimatedComplexity: computed.estimatedComplexity,
      recommendedFollowUpAngle: computed.recommendedFollowUpAngle,
    };

    try {
      const response = await fetch("/api/send-commercial-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as CommercialLeadResponse | null;

      if (response.ok && result?.ok) {
        trackAnalyticsEvent("commercial_wizard_submit", {
          status: "success",
          estimatedComplexity: computed.estimatedComplexity,
        });
        setSuccess(result.message ?? "Thanks. Ayres Mechanical will review your facility details and follow up.");
        setValues(initialValues);
        setStep(0);
        return;
      }

      if (result && "errors" in result && result.errors) {
        const serverErrors: Errors = {};
        for (const [field, messages] of Object.entries(result.errors)) {
          const message = messages?.[0];
          if (message) serverErrors[field as keyof Values] = message;
        }
        setErrors(serverErrors);
      }

      trackAnalyticsEvent("commercial_wizard_submit", { status: "error", httpStatus: response.status });
      setErrors((current) => ({
        ...current,
        form: result?.message ?? "Unable to submit right now. Please call Ayres Mechanical for immediate service.",
      }));
    } catch {
      trackAnalyticsEvent("commercial_wizard_submit", { status: "network_error" });
      setErrors({ form: "Unable to submit right now. Please call Ayres Mechanical for immediate service." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white p-4 text-brand-blue-dark shadow-2xl sm:p-6">
      <ol className="grid grid-cols-4 gap-2" aria-label="Commercial intake steps">
        {steps.map((label, index) => (
          <li
            key={label}
            className={cn(
              "rounded-xl px-2 py-2 text-center text-xs font-black",
              index === step ? "bg-brand-red text-white" : index < step ? "bg-secondary text-primary" : "bg-brand-ice text-brand-blue-dark/55",
            )}
          >
            {label}
          </li>
        ))}
      </ol>

      <div className="mt-6">
        {step === 0 ? (
          <ChoiceGroup
            legend="Scope"
            error={errors.scope}
            options={["Single Facility", "Multi-Site Portfolio / Property Management"]}
            value={values.scope}
            onChange={(value) => updateValue("scope", value)}
          />
        ) : null}

        {step === 1 ? (
          <div className="grid gap-5">
            <ChoiceGroup
              legend="Square footage"
              error={errors.squareFootage}
              options={["Under 20k sq ft", "20k-100k sq ft", "100k+ sq ft"]}
              value={values.squareFootage}
              onChange={(value) => updateValue("squareFootage", value)}
            />
            <ChoiceGroup
              legend="Number of facility locations"
              error={errors.locations}
              options={["1", "2-5", "6-10", "11+"]}
              value={values.locations}
              onChange={(value) => updateValue("locations", value)}
            />
          </div>
        ) : null}

        {step === 2 ? (
          <fieldset className="grid gap-3">
            <legend className="text-lg font-black">Equipment footprint</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {equipmentOptions.map((option) => (
                <label key={option} className="flex cursor-pointer gap-3 rounded-2xl border border-border bg-white p-4 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={values.equipment.includes(option)}
                    onChange={() => toggleEquipment(option)}
                    className="mt-1 size-4 accent-brand-red"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.equipment ? <p role="alert" className="text-sm font-bold text-brand-red">{errors.equipment}</p> : null}
          </fieldset>
        ) : null}

        {step === 3 ? (
          <div className="grid gap-4">
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="commercial-website">Website</label>
              <Input id="commercial-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => updateValue("website", event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company Name" error={errors.companyName}>
                <Input value={values.companyName} onChange={(event) => updateValue("companyName", event.target.value)} autoComplete="organization" aria-invalid={Boolean(errors.companyName)} />
              </Field>
              <Field label="Facility Director / Contact Name" error={errors.contactName}>
                <Input value={values.contactName} onChange={(event) => updateValue("contactName", event.target.value)} autoComplete="name" aria-invalid={Boolean(errors.contactName)} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Professional Work Email" error={errors.email}>
                <Input type="email" value={values.email} onChange={(event) => updateValue("email", event.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <Input type="tel" inputMode="tel" value={values.phone} onChange={(event) => updateValue("phone", event.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.phone)} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Principal City" error={errors.principalCity}>
                <Input value={values.principalCity} onChange={(event) => updateValue("principalCity", event.target.value)} autoComplete="address-level2" aria-invalid={Boolean(errors.principalCity)} />
              </Field>
              <label className="grid gap-2 text-sm font-bold">
                Preferred Follow-Up
                <select
                  value={values.preferredFollowUp}
                  onChange={(event) => updateValue("preferredFollowUp", event.target.value)}
                  className="h-10 rounded-lg border border-input bg-white px-3 py-2 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {["Phone", "Email", "Either"].map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
            <Field label="Notes">
              <Textarea rows={4} value={values.notes} onChange={(event) => updateValue("notes", event.target.value)} />
            </Field>
            <div className="rounded-2xl bg-secondary p-4 text-sm leading-6">
              <p className="font-black">Recommended follow-up: {computed.recommendedFollowUpAngle}</p>
              <p className="mt-1 text-muted-foreground">Estimated complexity: {computed.estimatedComplexity}</p>
            </div>
          </div>
        ) : null}
      </div>

      {errors.form ? <p role="alert" className="mt-4 rounded-xl bg-accent p-3 text-sm font-bold text-brand-red">{errors.form}</p> : null}
      {success ? (
        <div role="status" aria-live="polite" className="mt-4 rounded-xl bg-secondary p-4 text-sm font-bold text-brand-blue-dark">
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
            <p>{success}</p>
          </div>
          <a href={phoneHref} className={cn(buttonVariants({ variant: "dark", size: "sm" }), "mt-3")}>Call Ayres Mechanical</a>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <Button type="button" variant="outline" disabled={step === 0 || submitting} onClick={() => setStep((current) => Math.max(0, current - 1))}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" variant="emergency" onClick={goNext}>
            Continue
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button" variant="emergency" onClick={submit} disabled={submitting}>
            {submitting ? "Sending..." : "Submit Commercial Plan"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}

function ChoiceGroup({
  legend,
  options,
  value,
  error,
  onChange,
}: {
  legend: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-lg font-black">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={value === option}
            className={cn(
              "rounded-2xl border p-4 text-left font-black transition-colors",
              value === option ? "border-brand-red bg-brand-red text-white" : "border-border bg-white hover:border-primary/35",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      {error ? <p role="alert" className="text-sm font-bold text-brand-red">{error}</p> : null}
    </fieldset>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-brand-blue-dark">
      {label}
      {children}
      {error ? <span role="alert" className="text-sm text-brand-red">{error}</span> : null}
    </label>
  );
}

function computeLeadDetails(values: Values) {
  const highComplexity =
    values.squareFootage === "100k+ sq ft" ||
    values.locations === "11+" ||
    values.equipment.includes("Chillers / Hydronics");
  const mediumComplexity =
    values.scope.includes("Multi-Site") ||
    values.locations === "6-10" ||
    values.equipment.includes("Rooftop Packaged Units (RTUs)");

  const estimatedComplexity = highComplexity ? "high" : mediumComplexity ? "medium" : "low";
  const recommendedFollowUpAngle = values.scope.includes("Multi-Site")
    ? "Multi-site portfolio service plan"
    : values.equipment.includes("Rooftop Packaged Units (RTUs)")
      ? "RTU lifecycle and CapEx planning"
      : values.equipment.includes("Chillers / Hydronics")
        ? "Industrial/facility support review"
        : "Commercial PMA discussion";

  return { estimatedComplexity, recommendedFollowUpAngle };
}
