import assert from "node:assert/strict";
import { test } from "node:test";

import { contactRequestSchema, contactSchema } from "./contact-schema.ts";
import { COUNTRY_CODES, countryName, countryOptions } from "./countries.ts";

const valid = {
  name: "Asha Rao",
  company: "Acme Foods",
  email: "asha@example.com",
  country: "AE",
  interest: "product",
  quantity: "24 MT",
  message: "Please quote Kabuli chickpeas, 42–44 count, FOB Nhava Sheva.",
  sendCatalogue: true,
};

test("accepts a complete enquiry and trims input", () => {
  const parsed = contactSchema.parse({ ...valid, name: "  Asha Rao  " });
  assert.equal(parsed.name, "Asha Rao");
  assert.equal(parsed.sendCatalogue, true);
});

test("company and quantity are optional, catalogue opt-in defaults to false", () => {
  const parsed = contactSchema.parse({
    name: valid.name,
    email: valid.email,
    country: valid.country,
    interest: valid.interest,
    message: valid.message,
  });
  assert.equal(parsed.sendCatalogue, false);
  assert.equal(parsed.company, undefined);
});

test("rejects bad email, short message, unknown country and interest", () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, email: "not-an-email" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...valid, message: "hi" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...valid, country: "Atlantis" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...valid, interest: "free-samples" }).success,
    false,
  );
});

test("the API contract additionally requires a reCAPTCHA token", () => {
  assert.equal(contactRequestSchema.safeParse(valid).success, false);
  assert.ok(
    contactRequestSchema.safeParse({ ...valid, recaptchaToken: "tok" }).success,
  );
});

test("every ISO country code resolves to a name in every locale", () => {
  assert.equal(COUNTRY_CODES.length, 249);
  assert.equal(new Set(COUNTRY_CODES).size, COUNTRY_CODES.length);

  for (const locale of ["en", "hi", "mr", "ar"]) {
    const display = new Intl.DisplayNames([locale], { type: "region" });
    for (const code of COUNTRY_CODES) {
      const name = display.of(code);
      assert.ok(name && name !== code, `${locale}: ${code} has no name`);
    }
  }
});

test("country options cover every code exactly once, priorities first", () => {
  const { priority, rest } = countryOptions("en");
  const codes = [...priority, ...rest].map((option) => option.code);

  assert.equal(codes.length, COUNTRY_CODES.length);
  assert.equal(new Set(codes).size, COUNTRY_CODES.length);
  assert.equal(priority[0].code, "IN");
  assert.equal(countryName("AE"), "United Arab Emirates");
});
