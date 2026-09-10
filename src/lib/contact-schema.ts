import { z } from "zod";

// Relative + explicit extension so Node's type-stripping test runner, which
// does not read tsconfig path aliases, can load this module directly.
import { COUNTRY_CODES } from "./countries.ts";

/**
 * Interests are stored as stable keys; the labels shown to visitors come from
 * the `form.interests` messages, and the sheet gets the English label below.
 */
export const INTEREST_KEYS = [
  "product",
  "sample",
  "privateLabel",
  "documentation",
  "careers",
  "volunteering",
  "other",
] as const;

export type InterestKey = (typeof INTEREST_KEYS)[number];

export const INTEREST_LABELS_EN: Record<InterestKey, string> = {
  product: "Product enquiry",
  sample: "Sample request",
  privateLabel: "Private label / custom packing",
  documentation: "Documentation & certificates",
  careers: "Careers",
  volunteering: "Volunteering",
  other: "Other",
};

export type ValidationMessages = {
  name: string;
  email: string;
  country: string;
  interest: string;
  message: string;
};

const DEFAULT_MESSAGES: ValidationMessages = {
  name: "Please enter your name",
  email: "Please enter a valid work email",
  country: "Please select a country",
  interest: "Please select an interest",
  message: "Please add a few more details",
};

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/**
 * Shared by the client form and the API route. The client passes translated
 * messages so errors appear in the visitor's language; the server keeps the
 * English defaults, since it is the trust boundary and its logs are English.
 */
export function buildContactSchema(messages: ValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name).max(100),
    company: optionalText(150),
    email: z.string().trim().email(messages.email).max(200),
    country: z.enum(COUNTRY_CODES, { message: messages.country }),
    interest: z.enum(INTEREST_KEYS, { message: messages.interest }),
    quantity: optionalText(60),
    message: z.string().trim().min(10, messages.message).max(5000),
    sendCatalogue: z.boolean().default(false),
  });
}

export const contactSchema = buildContactSchema(DEFAULT_MESSAGES);

export type ContactInput = z.input<typeof contactSchema>;
export type ContactEnquiry = z.output<typeof contactSchema>;

/** What the API route accepts: the form plus the reCAPTCHA token. */
export const contactRequestSchema = contactSchema.extend({
  recaptchaToken: z.string().min(1, "Missing reCAPTCHA token"),
});
