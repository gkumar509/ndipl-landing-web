import { useTranslations } from "next-intl";

import { Eyebrow, Section } from "@/components/common/section";

type Pillar = { title: string; description: string };

export function PillarsSection() {
  const t = useTranslations("home.pillars");
  const pillars = t.raw("items") as Pillar[];

  return (
    <Section
      className="bg-sand border-y border-[rgba(20,32,26,.07)]"
      containerClassName="py-[66px]"
    >
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <div className="mt-[26px] grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="bg-cream rounded-2xl border border-[rgba(20,32,26,.08)] p-[26px] transition-colors hover:border-[rgba(10,107,61,.4)]"
          >
            <div className="size-[34px] rounded-[9px] bg-linear-135 from-[#fcd34a] to-[#f0951a]" />
            <h3 className="font-display mt-[18px] mb-2 text-2xl leading-[1.2]">
              {pillar.title}
            </h3>
            <p className="text-body text-[14.5px] leading-[1.65]">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
