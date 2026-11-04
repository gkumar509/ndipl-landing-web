export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About us",
    children: [
      { href: "/about", label: "Background" },
      { href: "/team", label: "Team" },
    ],
  },
  { href: "/our-work", label: "Our work" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
  // { href: "/careers", label: "Careers" },
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

export const WHATSAPP_URL = `https://wa.me/918839559840?text=${encodeURIComponent(
  "Hi NDIPL, I'd like to request a quote.",
)}`;

export const FOOTER_COLUMNS = [
  {
    heading: "COMPANY",
    items: [
      { label: "About us", href: "/about" },
      { label: "Our work", href: "/our-work" },
      { label: "Our team", href: "/team" },
      { label: "Products", href: "/products" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "PRODUCTS",
    items: [
      { label: "Pulses", href: "/products" },
      { label: "Spices", href: "/products" },
      { label: "Grains", href: "/products" },
      { label: "Millets", href: "/products" },
      { label: "Oil seeds", href: "/products" },
    ],
  },
  {
    heading: "CONTACT",
    items: [
      { label: "Request a quote", href: "/contact" },
      { label: "Sample request", href: "/contact" },
      { label: "Volunteer with us", href: "/careers" },
      { label: "inquiry@naturesdelightind.com", href: "mailto:inquiry@naturesdelightind.com" },
    ],
  },
] as const;
