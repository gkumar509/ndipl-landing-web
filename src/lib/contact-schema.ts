import { z } from "zod";

// Relative + explicit extension so Node's type-stripping test runner, which
// does not read tsconfig path aliases, can load this module directly.
import { COUNTRY_CODES } from "./countries.ts";

/** Interests are stored as stable keys; labels below are shown and stored. */
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

export const INTEREST_LABELS: Record<InterestKey, string> = {
  product: "Product enquiry",
  sample: "Sample request",
  privateLabel: "Private label / custom packing",
  documentation: "Documentation & certificates",
  careers: "Careers",
  volunteering: "Volunteering",
  other: "Other",
};

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

/** Shared by the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  company: optionalText(150),
  email: z.string().trim().email("Please enter a valid work email").max(200),
  country: z.enum(COUNTRY_CODES, { message: "Please select a country" }),
  interest: z.enum(INTEREST_KEYS, { message: "Please select an interest" }),
  quantity: optionalText(60),
  message: z.string().trim().min(10, "Please add a few more details").max(5000),
  sendCatalogue: z.boolean().default(false),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactEnquiry = z.output<typeof contactSchema>;

/** What the API route accepts: the form plus the reCAPTCHA token. */
export const contactRequestSchema = contactSchema.extend({
  recaptchaToken: z.string().min(1, "Missing reCAPTCHA token"),
});
