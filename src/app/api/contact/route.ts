import { NextResponse } from "next/server";
import { z } from "zod";

import { submitContactRequest } from "@/lib/contact-submission";
import { bookingRequestSchema, contactFormSchema } from "@/lib/validators";

const bookingPayloadSchema = z.object({
  form: z.literal("booking"),
  values: bookingRequestSchema,
});

export async function POST(request: Request) {
  const body = await request.json();

  const bookingParsed = bookingPayloadSchema.safeParse(body);
  if (bookingParsed.success) {
    try {
      const result = await submitContactRequest({ form: "booking", values: bookingParsed.data.values });
      return NextResponse.json({ ok: true, ...result }, { status: result.status === "delivered" ? 200 : 202 });
    } catch {
      return NextResponse.json(
        { ok: false, message: "Unable to send this request right now. Please call for immediate service." },
        { status: 502 },
      );
    }
  }

  const contactParsed = contactFormSchema.safeParse(body);
  if (contactParsed.success) {
    try {
      const result = await submitContactRequest({ form: "contact", values: contactParsed.data });
      return NextResponse.json({ ok: true, ...result }, { status: result.status === "delivered" ? 200 : 202 });
    } catch {
      return NextResponse.json(
        { ok: false, message: "Unable to send this request right now. Please call for immediate service." },
        { status: 502 },
      );
    }
  }

  const errors = {
    ...bookingParsed.error.flatten().fieldErrors,
    ...contactParsed.error.flatten().fieldErrors,
  };
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
