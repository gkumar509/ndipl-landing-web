import { useTranslations } from "next-intl";
import Link from "next/link";

import { BrandMark } from "@/components/layout/logo";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/site";

/** 24×24 glyphs, keyed by the label in `SOCIAL_LINKS`. */
const SOCIAL_ICONS: Record<string, string> = {
  LinkedIn:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4z",
  Instagram:
    "M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3zm0 2A2.8 2.8 0 0 0 5 7.8v8.4A2.8 2.8 0 0 0 7.8 19h8.4a2.8 2.8 0 0 0 2.8-2.8V7.8A2.8 2.8 0 0 0 16.2 5zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm4.9-2.7a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z",
  Facebook:
    "M13.5 21v-8h2.6l.4-3h-3V8.1c0-.87.25-1.46 1.5-1.46h1.6V3.96c-.28-.04-1.23-.12-2.34-.12-2.3 0-3.86 1.4-3.86 3.98V10H8v3h2.4v8z",
  X: "M17.2 3h3.3l-7.2 8.24L21.8 21h-6.6l-4.17-5.4L6.2 21H2.9l7.7-8.8L2.5 3h6.77l3.77 4.94zm-1.16 16h1.83L8.03 4.9H6.07z",
};

export function SiteFooter() {
  const t = useTranslations("footer");
  const brand = useTranslations("brand");

  return (
    <footer className="bg-ink text-[rgba(245,242,234,.72)]">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-9 px-[18px] pt-14 pb-[30px] sm:px-7">
        <div>
          <div className="flex items-center gap-[11px]">
            <BrandMark size={32} />
            <span className="text-on-ink text-[13px] font-semibold tracking-[0.16em]">
              {brand("shortName")}
            </span>
          </div>
          <p className="mt-4 max-w-[30ch] text-[13.5px] leading-[1.7]">
            {t("tagline")}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-[rgba(245,242,234,.18)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="size-[17px] fill-current"
                    fillRule="evenodd"
                  >
                    <path d={SOCIAL_ICONS[social.label]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.heading}>
            <div className="text-gold label-mono tracking-[0.12em]">
              {t(`columns.${column.heading}`)}
            </div>
            <div className="mt-3.5 flex flex-col gap-[9px]">
              {column.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-[13.5px] text-[rgba(245,242,234,.72)] transition-colors hover:text-[var(--color-gold)]"
                >
                  {t(`links.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto text-center max-w-[1240px] flex-wrap justify-between gap-3.5 border-t border-[rgba(245,242,234,.14)] px-[18px] pt-[18px] pb-10 text-xs text-[rgba(245,242,234,.5)] sm:px-7">
        {t("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
}
