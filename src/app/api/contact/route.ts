import { NextResponse } from "next/server";
import { flattenError } from "zod";

import {
  INTEREST_LABELS_EN,
  contactRequestSchema,
} from "@/lib/contact-schema";
import { countryName } from "@/lib/countries";
import { appendSheetRow } from "@/server/google-sheets";
import { verifyRecaptcha } from "@/server/recaptcha";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const RECAPTCHA_ACTION = "contact_submit";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { recaptchaToken, ...enquiry } = parsed.data;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined;

  const captcha = await verifyRecaptcha(recaptchaToken, RECAPTCHA_ACTION, ip);
  if (!captcha.ok) {
    console.warn("reCAPTCHA rejected submission:", captcha.reason);
    return NextResponse.json(
      { error: "We couldn't verify that you're human. Please try again." },
      { status: 400 },
    );
  }

  try {
    // The sheet is read by the export desk, so values are written in English.
    await appendSheetRow([
      new Date().toISOString(),
      enquiry.name,
      enquiry.company ?? "",
      enquiry.email,
      countryName(enquiry.country),
      INTEREST_LABELS_EN[enquiry.interest],
      enquiry.quantity ?? "",
      enquiry.message,
      enquiry.sendCatalogue ? "Yes" : "No",
    ]);
  } catch (error) {
    // Never surface Google/API internals to the browser.
    console.error("Contact enquiry could not be recorded:", error);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
