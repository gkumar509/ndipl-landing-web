import { useTranslations } from "next-intl";
import Image from "next/image";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";

type Stat = { value: string; label: string };
type Group = { eyebrow: string; stats: Stat[] };
type Logo = { name: string; logo: string };

const certs: Logo[] = [
  {
    name: "FSSAI",
    logo: "/fssai-logo.png",
  },
  {
    name: "NPOP",
    logo: "/npop-logo.jpeg",
  },
  {
    name: "NOP(USDA)",
    logo: "/nop-logo.png",
  },
  {
    name: "REGEN",
    logo: "/regen-logo.png",
  },
];

const bps: Logo[] = [
  {
    name: "ITC",
    logo: "/itc-logo.png",
  },
  {
    name: "LTFOODS",
    logo: "/ltfoods-logo.svg",
  },
  {
    name: "BESTSELLER",
    logo: "/bestseller-logo.png",
  },
];

export function PurposeSection() {
  const t = useTranslations("home.purpose");
  const p = useTranslations("home.proof");
  const groups = [p.raw("network"), p.raw("supplyChain")] as Group[];

  return (
    <Section
      className="bg-sand border-y border-[rgba(20,32,26,.07)]"
      containerClassName="py-16"
    >
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <DisplayHeading className="mt-3">{t("heading")}</DisplayHeading>
      <p className="text-body mt-4 text-[15.5px] leading-[1.7] text-pretty">
        {t("body")}
      </p>

      <div className="mt-11 grid gap-9 border-t border-[rgba(20,32,26,.09)] pt-8 md:grid-cols-2 md:gap-14">
        {groups.map((group) => (
          <div key={group.eyebrow}>
            <Eyebrow>{group.eyebrow}</Eyebrow>
            {/* Value before label in the markup so screen readers read
                "12 — sourcing belts"; `flex-col-reverse` puts the number on
                top visually. */}
            <dl className="mt-3.5 grid grid-cols-3 gap-4">
              {group.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-stone text-[11px] leading-[1.35] tracking-[0.06em] uppercase">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-[34px] leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-between items-center border-t border-[rgba(20,32,26,.09)] pt-7">
        <div className="flex flex-col items-center gap-y-5">
          <Eyebrow>{p("certsEyebrow")}</Eyebrow>
          <ul className="grid grow grid-cols-2 items-center gap-x-8 gap-y-5 sm:flex sm:justify-end">
            {certs.map((cert) => (
              <li key={cert.name}>
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={280}
                  height={140}
                  className="h-11 w-auto mix-blend-multiply"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-y-5">
          <Eyebrow>{p("bpEyebrow")}</Eyebrow>
          <ul className="grid grow grid-cols-2 items-center gap-x-8 gap-y-5 sm:flex sm:justify-end">
            {bps.map((bp) => (
              <li key={bp.name}>
                <Image
                  src={bp.logo}
                  alt={bp.name}
                  width={280}
                  height={140}
                  className="h-11 w-auto mix-blend-multiply"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
