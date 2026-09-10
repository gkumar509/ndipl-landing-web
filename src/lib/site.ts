/** Route + message-key pairs; labels come from the `nav` namespace. */
export const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/team", key: "team" },
  { href: "/products", key: "products" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

/** Footer columns; headings and labels come from the `footer` namespace. */
export const FOOTER_COLUMNS = [
  {
    heading: "company",
    items: [
      { key: "about", href: "/about" },
      { key: "team", href: "/team" },
      { key: "certifications", href: "/#certifications" },
      { key: "careers", href: "/careers" },
    ],
  },
  {
    heading: "products",
    items: [
      { key: "pulses", href: "/products" },
      { key: "spices", href: "/products" },
      { key: "grains", href: "/products" },
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
