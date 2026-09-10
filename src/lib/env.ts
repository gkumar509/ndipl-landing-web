import { z } from "zod";

/**
 * Server-only environment. Validated lazily so that importing this module in a
 * client bundle (or at build time without secrets) never throws.
 */
const serverSchema = z.object({
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  RECAPTCHA_SECRET_KEY: z.string().min(1),
  RECAPTCHA_MIN_SCORE: z.coerce.number().min(0).max(1).default(0.5),
  GOOGLE_SHEETS_SPREADSHEET_ID: z.string().min(1),
  GOOGLE_SHEETS_RANGE: z.string().min(1).default("Contact!A:I"),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().email(),
  GOOGLE_PRIVATE_KEY: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function serverEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverSchema.safeParse({
    ...process.env,
    // Vercel/CI store the key with literal "\n" escapes.
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  });

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment: ${parsed.error.issues
        .map((i) => i.path.join("."))
        .join(", ")}`,
    );
  }

  cached = parsed.data;
  return cached;
}

/**
 * Fails with an actionable message instead of letting the missing value reach a
 * library, where it surfaces as something like "Configuration must contain
 * `projectId`" pointing at the wrong file.
 */
function requiredPublic(name: string, value: string | undefined) {
  if (value) return value;

  throw new Error(
    `Missing ${name}.\n` +
      `Copy .env.example to .env.local, fill it in, and restart the dev server ` +
      `(NEXT_PUBLIC_* values are read at startup).\n` +
      `No Sanity project yet? Run: npm exec --workspace studio -- sanity init`,
  );
}

/** Public config. Inlined by Next at build time, so read the literals directly. */
export const publicEnv = {
  get sanityProjectId() {
    return requiredPublic(
      "NEXT_PUBLIC_SANITY_PROJECT_ID",
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    );
  },
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-02-01",
  // Optional at import time; the reCAPTCHA hook reports it when a form submits.
  recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
} as const;
