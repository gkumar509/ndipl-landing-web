/** Route + message-key pairs; labels come from the `nav` namespace. */
export const NAV_ITEMS = [
  { href: "/", key: "home" },
  {
    href: "/about",
    key: "about",
    children: [
      { href: "/about", key: "background" },
      { href: "/team", key: "team" },
    ],
  },
  { href: "/our-work", key: "ourWork" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
  // { href: "/careers", key: "careers" },
] as const;

/**
 * Social profiles shown in the footer. PLACEHOLDER URLS — swap each `href` for
 * the real handle before launch; drop the entry for any network NDIPL isn't on.
 */
export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ndipl" },
  { label: "Instagram", href: "https://www.instagram.com/ndipl" },
  { label: "Facebook", href: "https://www.facebook.com/ndipl" },
  { label: "X", href: "https://x.com/ndipl" },
] as const;

/** Footer columns; headings and labels come from the `footer` namespace. */
export const FOOTER_COLUMNS = [
  {
    heading: "company",
    items: [
      { key: "about", href: "/about" },
      { key: "ourWork", href: "/our-work" },
      { key: "team", href: "/team" },
      { key: "products", href: "/products" },
      { key: "careers", href: "/careers" },
    ],
  },
  {
    heading: "products",
    items: [
      { key: "pulses", href: "/products" },
      { key: "spices", href: "/products" },
      { key: "grains", href: "/products" },
      { key: "millets", href: "/products" },
      { key: "oilSeeds", href: "/products" },
    ],
  },
  {
    heading: "contact",
    items: [
      { key: "requestQuote", href: "/contact" },
      { key: "sampleRequest", href: "/contact" },
      { key: "volunteer", href: "/careers" },
      { key: "email", href: "mailto:export@ndipl.example" },
    ],
  },
] as const;
