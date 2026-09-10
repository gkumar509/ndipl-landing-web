import { useTranslations } from "next-intl";
import Link from "next/link";

import { BrandMark } from "@/components/layout/logo";
import { LOCALE_LABELS, LOCALES } from "@/i18n/routing";
import { FOOTER_COLUMNS } from "@/lib/site";

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

      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3.5 border-t border-[rgba(245,242,234,.14)] px-[18px] pt-[18px] pb-10 text-xs text-[rgba(245,242,234,.5)] sm:px-7">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <span>
          {LOCALES.map((locale) => LOCALE_LABELS[locale].name).join(" · ")}
        </span>
      </div>
    </footer>
  );
}
