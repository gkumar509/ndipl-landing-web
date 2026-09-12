import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import {
  DisplayHeading,
  Eyebrow,
  ImagePlaceholder,
  Section,
} from "@/components/common/section";
import Image from "next/image";

type Block = { kicker: string; title: string; description: string };
type Value = { title: string; description: string };
type Stat = { value: string; label: string };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title"), description: t("metaDescription") };
}

export default function AboutPage() {
  const t = useTranslations("about");
  const blocks = t.raw("blocks") as Block[];
  const values = t.raw("values") as Value[];
  const stats = t.raw("stats") as Stat[];

  return (
    <>
      <Section containerClassName="pt-[70px] pb-5">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[22ch] text-[clamp(38px,4.6vw,58px)] leading-[1.08]"
        >
          {t("heading")}
        </DisplayHeading>
        <p className="text-body mt-5 text-[17px] leading-[1.65]">
          {t("intro")}
        </p>
      </Section>

      <Section containerClassName="w-full h-[300px] rounded-[20px] overflow-hidden">
        <Image
          src="/2.png"
          alt="NDIPL background"
          width={1000}
          height={400}
          className="w-full h-full object-cover rounded-[20px]"
        />
      </Section>

      <Section containerClassName="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 py-14">
        {blocks.map((block) => (
          <div
            key={block.kicker}
            className="rounded-2xl border border-[rgba(20,32,26,.09)] bg-white p-[26px]"
          >
            <div className="text-green label-mono">{block.kicker}</div>
            <h2 className="font-display mt-3.5 mb-2.5 text-[25px] leading-[1.2]">
              {block.title}
            </h2>
            <p className="text-body text-[14.5px] leading-[1.65]">
              {block.description}
            </p>
          </div>
        ))}
      </Section>

      <Section className="bg-ink text-on-ink" containerClassName="py-[70px]">
        <DisplayHeading className="mb-[34px] text-[40px]">
          {t("valuesHeading")}
        </DisplayHeading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[26px]">
          {values.map((value) => (
            <div
              key={value.title}
              className="border-t border-[rgba(252,194,46,.5)] pt-4"
            >
              <h3 className="font-display text-xl leading-[1.25]">
                {value.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[rgba(245,242,234,.62)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section containerClassName="py-[70px]">
        <dl className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-sand rounded-2xl p-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="font-display text-green block text-4xl leading-none">
                  {stat.value}
                </span>
                <span className="text-stone mt-[9px] block text-[11.5px] leading-[1.4] font-medium tracking-[0.06em] uppercase">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
