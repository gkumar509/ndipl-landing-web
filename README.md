# NDIPL Website

Next.js 16 (App Router) + Tailwind CSS v4 + shadcn/ui, with Sanity as the CMS
and full EN / HI / MR / AR translation. The UI is a direct implementation of the
`NDIPL Website.dc.html` design.

```
.                            Next.js app (the website)
├── messages/                Translation catalogues (en, hi, mr, ar)
├── src/app/(site)/          Public pages — home, about, team, products, careers, contact
│   ├── _sections/           Home-page sections
│   └── <page>/_components/  Components owned by a single page
├── src/components/
│   ├── ui/                  shadcn/ui primitives (brand variants live in button.tsx)
│   ├── common/              Shared building blocks (Container, Section, SanityImage…)
│   ├── layout/              Header, footer, logo
│   └── forms/               ContactForm
├── src/i18n/                Locale list, resolution and request config
├── src/sanity/              Client, live fetching, image builder, GROQ queries
├── src/server/              Server-only integrations (reCAPTCHA, Google Sheets)
└── studio/                  Standalone Sanity Studio (schemas + seed script)
```

## Setup

```bash
npm install                  # npm workspaces: installs both the app and the Studio
cp .env.example .env.local
cp studio/.env.example studio/.env
```

Fill both env files (see below), then:

```bash
npm run dev        # website  → http://localhost:3000
npm run studio     # Studio   → http://localhost:3333
npm run typegen    # regenerate src/sanity/types.ts from schema + GROQ
npm run seed       # load the design's content into the CMS (see below)
npm test           # unit checks
npm run typecheck
npm run lint
```

Let the site read drafts by adding its origin to CORS once:

```bash
npm exec --workspace studio -- sanity cors add http://localhost:3000 --credentials
```

## Languages

The site ships in English, Hindi, Marathi and Arabic, powered by `next-intl`.

- **The locale is a query parameter**, not a path segment: `/products?lang=hi`.
  `src/proxy.ts` resolves it, remembers it in the `NEXT_LOCALE` cookie so
  ordinary links keep the visitor's language, and forwards it to the server on a
  request header that `src/i18n/request.ts` reads.
- English is the default and needs no parameter.
- Arabic sets `dir="rtl"` on `<html>`; layout uses logical properties (`ms-*`)
  where direction matters.
- Karla and Instrument Serif have no Devanagari or Arabic glyphs, so
  `globals.css` swaps the underlying font variables per `html[lang]` and the rest
  of the type scale is inherited unchanged.
- **Interface copy** lives in `messages/<locale>.json`. All four files share an
  identical key structure, which `npm test` does not check but
  `node -e` parity checks in review do — keep them in sync when adding keys.
- **CMS content** is translated per field via
  `sanity-plugin-internationalized-array`; queries request `$locale` and fall
  back to English when a translation is missing.

> The Hindi, Marathi and Arabic copy was machine-translated as a starting point.
> Have a native speaker review it before launch — particularly the trade terms
> (sortex, destoning, ASTA grades), which were kept close to industry usage.

Because the locale is resolved per request, every page renders dynamically.

## Content model

Managed in `studio/src/schemaTypes/`:

| Type | Fields |
| --- | --- |
| `productCategory` | title\*, slug, summary\*, quality note\*, image, display order |
| `product` | title\*, category (reference), spec\*, image, display order |
| `teamMember` | name\*, role\*, group (leadership / department), portrait, bio\*, tags\*, display order |

\* translated per locale.

`displayOrder` (lower first) controls ordering everywhere. Leadership members
render as full profile cards; department members render in the compact list
below them. Queries live in [src/sanity/queries.ts](src/sanity/queries.ts).

Everything outside Team and Products — hero copy, pillars, the six processing
stages, certifications, about, careers and contact details — is interface copy in
`messages/`.

### Seed the design's content

The Team and Products pages are empty until the CMS has content. To load the
exact categories, products and people from the design:

```bash
SANITY_STUDIO_PROJECT_ID=<id> SANITY_WRITE_TOKEN=<editor token> npm run seed
```

Seeded documents use fixed `seed.*` ids, so re-running updates them in place and
leaves anything you author in the Studio alone. Only English values are seeded;
add the other locales in the Studio. Images are not seeded — until they are
uploaded, the pages show the design's placeholder hatch.

## Design notes

- **Palette and type** are Tailwind theme tokens in
  [src/app/globals.css](src/app/globals.css) (`green`, `gold`, `ink`, `cream`,
  `sand`, `stone`, `body`). The design is a single light theme; there is no dark
  variant.
- **Brand buttons** are extra `variant`/`size` entries on the shadcn `Button`
  (`brand`, `brandOutline`, `gold`, `inkOutline`, `soft` × `pillSm`, `pill`,
  `pillLg`, `block`, `blockSm`) rather than a separate component.
- **Enquire / Apply links** carry a subject and interest into the contact form
  via the query string, which the contact page reads and prefills.

## Contact form

`POST /api/contact` → verify reCAPTCHA v3 → append a row to Google Sheets.

1. **reCAPTCHA v3** — create a site at
   [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin), then set
   `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY`. Submissions
   scoring below `RECAPTCHA_MIN_SCORE` (default `0.5`) are rejected, as are
   tokens minted for a different action.
2. **Google Sheets** — create a service account in Google Cloud, enable the
   Google Sheets API, download its JSON key, and **share the target spreadsheet
   with the service-account email as an Editor**. Set
   `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY` (newlines escaped as
   `\n`), `GOOGLE_SHEETS_SPREADSHEET_ID` and `GOOGLE_SHEETS_RANGE`.

Rows are appended as:

```
timestamp | name | company | email | country | interest | quantity | message | catalogue requested
```

Country and interest are written in English whatever language the visitor used,
so the export desk reads one consistent sheet.

The country field is the full ISO 3166-1 list (249 entries) held as codes in
[src/lib/countries.ts](src/lib/countries.ts); names come from the platform's
`Intl.DisplayNames`, so they are already translated into every supported locale
with no country dataset to ship or keep current. NDIPL's main export markets are
pinned above the alphabetical list.

Validation lives in [src/lib/contact-schema.ts](src/lib/contact-schema.ts) and
runs on both the client (translated messages, instant feedback) and the server
(English messages — it is the trust boundary). Server errors are logged but
never returned to the browser.

## Environment variables

See [.env.example](.env.example) and [studio/.env.example](studio/.env.example).
`src/lib/env.ts` validates the server variables and fails loudly on a bad
configuration rather than silently dropping enquiries.
