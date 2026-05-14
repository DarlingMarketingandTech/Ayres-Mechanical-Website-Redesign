# Launch Readiness

This checklist tracks facts and integrations that still need owner confirmation before the site should be treated as fully production-ready.

## Confirmed In Code

- Company name: Ayres Mechanical Inc.
- Public display name: Ayres Mechanical.
- Phone: 317-538-9837.
- Service area positioning: Central Indiana.
- Service categories: residential, commercial, and industrial heating and air conditioning services.
- Emergency positioning: 24 Hour Service for heating and cooling problems that cannot wait.

## Pending Owner Confirmation

- Production domain: set `NEXT_PUBLIC_SITE_URL` to the owner-approved canonical domain before launch.
- Contact delivery integration: set `CONTACT_REQUEST_WEBHOOK_URL` or replace `submitContactRequest` with the approved CRM/email/service-desk integration.
- Public contact email: confirm whether an email should be displayed on the contact page and included in structured data.
- Public mailing or office address: confirm whether an address should be displayed and included in JSON-LD.
- Standard office hours: confirm non-emergency hours separate from 24 Hour Service messaging.
- License, certification, and credential claims: confirm exact owner-approved wording before publishing.
- Financing details: confirm partners, eligibility notes, and application links.
- Privacy policy and terms: replace pending legal copy with owner-approved language.

## Verification Commands

- `npm run lint`
- `npm run build`
