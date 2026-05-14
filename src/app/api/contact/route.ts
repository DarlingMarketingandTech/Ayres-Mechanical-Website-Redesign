import { NextResponse } from "next/server";

import { submitContactRequest } from "@/lib/contact-submission";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const result = await submitContactRequest(parsed.data);
    return NextResponse.json({ ok: true, ...result }, { status: result.status === "delivered" ? 200 : 202 });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to send this request right now. Please call for immediate service." }, { status: 502 });
  }
}
