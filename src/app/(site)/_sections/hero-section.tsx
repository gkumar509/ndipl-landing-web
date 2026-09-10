import { useTranslations } from "next-intl";
import Link from "next/link";

import { ImagePlaceholder, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

type Stat = { value: string; label: string };

export function HeroSection() {
  const t = useTranslations("home.hero");
  const stats = t.raw("stats") as Stat[];

  return (
    <Section containerClassName="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] items-center gap-14 pt-[76px] pb-16">
      <div>
        <div className="text-green inline-flex items-center gap-2 rounded-full border border-[rgba(10,107,61,.22)] px-[13px] py-1.5 text-[11.5px] font-medium tracking-[0.06em] uppercase">
          {t("badge")}
        </div>

        <h1 className="font-display mt-[22px] text-[clamp(40px,5vw,66px)] leading-[1.06] text-pretty">
          {t("title")}
        </h1>
        <p className="text-body mt-5 max-w-[47ch] text-[17.5px] leading-[1.65] text-pretty">
          {t("subtitle")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="brand" size="pillLg">
            <Link href="/products">{t("exploreProducts")}</Link>
          </Button>
          <Button asChild variant="brandOutline" size="pillLg">
            <Link href="/contact">{t("talkToTeam")}</Link>
          </Button>
        </div>

        <dl className="mt-11 flex flex-wrap gap-x-[34px] gap-y-6 border-t border-[rgba(20,32,26,.1)] pt-[26px]">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-green block text-[30px] leading-none">
                  {stat.value}
                </span>
                <span className="text-stone mt-[7px] block text-[11.5px] leading-[1.4] font-medium tracking-[0.06em] uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid grid-cols-2 grid-rows-[180px_120px] gap-3.5 sm:grid-rows-[210px_130px]">
        <ImagePlaceholder
          label={t("collage.heroShot")}
          className="col-span-full rounded-[18px] p-4"
        />
        <ImagePlaceholder
          label={t("collage.sorterShot")}
          className="rounded-[18px] p-3.5"
        />
        <div className="bg-green flex flex-col justify-between rounded-[18px] p-[18px] text-white">
          <span className="font-display text-[21px] leading-[1.25]">
            {t("collage.cardTitle")}
          </span>
          <span className="text-gold font-mono text-[11px] font-medium tracking-[0.08em]">
            {t("collage.cardNote")}
          </span>
        </div>
      </div>
    </Section>
  );
}
