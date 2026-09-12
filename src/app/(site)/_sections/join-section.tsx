import { useTranslations } from "next-intl";
import Link from "next/link";

import { Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

/**
 * Closing band on the home page: volunteering on one side, open roles on the
 * other. Both halves reuse the `careers` namespace so the copy stays in one
 * place.
 */
export function JoinSection() {
  const t = useTranslations("careers");

  return (
    <Section
      className="bg-sand border-t border-[rgba(20,32,26,.07)]"
      containerClassName="grid grid-cols-1 items-stretch gap-10 py-[70px] md:grid-cols-2"
    >
      {/* `Eyebrow` is a span, so it needs block + col-span-full to sit on its
          own row above both cards. */}
      <Eyebrow className="col-span-full -mb-4 block">{t("workWithUs")}</Eyebrow>
      <div className="bg-cream flex flex-col items-start rounded-[18px] border border-[rgba(20,32,26,.09)] p-7">
        <span className="text-green text-[11.5px] font-medium tracking-[0.14em] uppercase">
          {t("volunteerEyebrow")}
        </span>
        <p className="font-display mt-3 mb-2.5 text-[30px] leading-[1.15]">
          {t("volunteerHeading")}
        </p>
        <p className="text-body mb-6 max-w-[46ch] text-[14.5px] leading-[1.65]">
          {t("volunteerBody")}
        </p>
        <Button asChild variant="brand" size="pill" className="mt-auto">
          <Link
            href={{
              pathname: "/contact",
              query: {
                interest: "volunteering",
                subject: t("volunteerSubject"),
              },
            }}
          >
            {t("volunteerCta")}
          </Link>
        </Button>
      </div>

      <div className="bg-cream flex flex-col items-start rounded-[18px] border border-[rgba(20,32,26,.09)] p-7">
        <span className="text-green text-[11.5px] font-medium tracking-[0.14em] uppercase">
          {t("eyebrow")}
        </span>
        <p className="font-display mt-3 mb-2.5 text-[30px] leading-[1.15]">
          {t("heading")}
        </p>
        <p className="text-body mb-6 max-w-[46ch] text-[14.5px] leading-[1.65]">
          {t("intro")}
        </p>
        <Button asChild variant="brandOutline" size="pill" className="mt-auto">
          <Link href="/careers">{t("openRolesCta")}</Link>
        </Button>
      </div>
    </Section>
  );
}
