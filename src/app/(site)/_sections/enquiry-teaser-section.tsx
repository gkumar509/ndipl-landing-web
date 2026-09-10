import { useTranslations } from "next-intl";

import { ImagePlaceholder, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * The design's closing band: a buyer quote beside a short "export desk" card.
 * The two fields are decorative in the design; here they carry what the visitor
 * typed straight into the contact form via the query string.
 */
export function EnquiryTeaserSection() {
  const t = useTranslations("home.testimonial");
  const desk = useTranslations("home.exportDesk");

  return (
    <Section
      className="bg-sand border-t border-[rgba(20,32,26,.07)]"
      containerClassName="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-10 py-[70px]"
    >
      <figure className="m-0">
        <blockquote className="font-display text-[clamp(24px,2.6vw,34px)] leading-[1.35] text-pretty">
          {t("quote")}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <ImagePlaceholder className="size-[42px] rounded-full" />
          <span>
            <span className="block text-[13.5px] font-semibold">
              {t("attribution")}
            </span>
            <span className="text-stone block text-[12.5px]">{t("detail")}</span>
          </span>
        </figcaption>
      </figure>

      <form
        action="/contact"
        method="get"
        className="bg-cream rounded-[18px] border border-[rgba(20,32,26,.09)] p-7"
      >
        <div className="text-stone text-[11.5px] font-medium tracking-[0.14em] uppercase">
          {desk("eyebrow")}
        </div>
        <div className="font-display mt-3 mb-4 text-[26px] leading-[1.2]">
          {desk("heading")}
        </div>
        <div className="flex flex-col gap-2.5">
          <Input
            name="email"
            type="email"
            aria-label={desk("emailPlaceholder")}
            placeholder={desk("emailPlaceholder")}
            className="h-11 rounded-[10px] text-[13.5px]"
          />
          <Input
            name="subject"
            aria-label={desk("productPlaceholder")}
            placeholder={desk("productPlaceholder")}
            className="h-11 rounded-[10px] text-[13.5px]"
          />
          <Button type="submit" variant="brand" size="block">
            {desk("cta")}
          </Button>
        </div>
      </form>
    </Section>
  );
}
