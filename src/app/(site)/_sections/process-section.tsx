import { useTranslations } from "next-intl";

import { DisplayHeading, Section } from "@/components/common/section";

type Stage = { number: string; title: string; description: string };

export function ProcessSection() {
  const t = useTranslations("home.process");
  const stages = t.raw("stages") as Stage[];

  return (
    <Section className="bg-ink text-on-ink" containerClassName="py-[76px]">
      <span className="text-gold text-[11.5px] font-medium tracking-[0.14em] uppercase">
        {t("eyebrow")}
      </span>
      <DisplayHeading className="mt-3 mb-10 max-w-[20ch]">
        {t("heading")}
      </DisplayHeading>

      <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden rounded-[14px] border border-[rgba(245,242,234,.14)] bg-[rgba(245,242,234,.14)]">
        {stages.map((stage) => (
          <li key={stage.number} className="bg-ink px-5 pt-6 pb-7">
            <div className="text-gold label-mono">{stage.number}</div>
            <h3 className="font-display mt-3.5 mb-2 text-[21px] leading-[1.2]">
              {stage.title}
            </h3>
            <p className="text-[13px] leading-[1.55] text-[rgba(245,242,234,.62)]">
              {stage.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
