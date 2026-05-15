type CompanyAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
};

type PendingOwnerFact = {
  label: string;
  status: "pending_owner_confirmation";
  notes: string;
};

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const pendingOwnerConfirmation = {
  productionUrl: {
    label: "Production domain",
    status: "pending_owner_confirmation",
    notes: "Set NEXT_PUBLIC_SITE_URL to the owner-approved production domain before launch.",
  },
  publicEmail: {
    label: "Public contact email",
    status: "pending_owner_confirmation",
    notes: "Confirm whether Ayres Mechanical wants a public email address displayed on the site.",
  },
  mailingAddress: {
    label: "Public mailing or office address",
    status: "pending_owner_confirmation",
    notes: "Confirm whether a public address should be shown and included in structured data.",
  },
  officeHours: {
    label: "Standard office hours",
    status: "pending_owner_confirmation",
    notes: "Confirm non-emergency office hours separate from 24 Hour Service messaging.",
  },
  credentials: {
    label: "License, certification, and credential copy",
    status: "pending_owner_confirmation",
    notes: "Confirm exact owner-approved wording before adding credential claims.",
  },
} satisfies Record<string, PendingOwnerFact>;

export const siteConfig: {
  name: string;
  shortName: string;
  phone: string;
  phoneE164: string;
  email: string | null;
  url: string;
  urlStatus: "configured" | "pending_owner_confirmation";
  tagline: string;
  description: string;
  serviceArea: string;
  emergencyMessage: string;
  address: CompanyAddress | null;
  hours: {
    emergency: string;
    standard: string | null;
  };
  socials: string[];
  credentials: string[];
  pendingOwnerConfirmation: typeof pendingOwnerConfirmation;
} = {
  name: "Ayres Mechanical Inc.",
  shortName: "Ayres Mechanical",
  phone: "317-538-9837",
  phoneE164: "+13175389837",
  email: null,
  url: normalizeSiteUrl(configuredSiteUrl || "http://localhost:3000"),
  urlStatus: configuredSiteUrl ? "configured" : "pending_owner_confirmation",
  tagline: "Heating & Air Conditioning Specialists",
  description:
    "Ayres Mechanical provides residential, commercial, and industrial heating and air conditioning services throughout Central Indiana.",
  serviceArea: "Central Indiana",
  emergencyMessage: "24 Hour Service for heating and cooling problems that cannot wait.",
  address: null,
  hours: {
    emergency: "24 Hour Service Available",
    standard: null,
  },
  socials: [],
  credentials: [],
  pendingOwnerConfirmation,
};
