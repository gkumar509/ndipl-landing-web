import Image from "next/image";

import { Section } from "@/components/common/section";

type Logo = { name: string; logo: string };

const groups: { label: string; logos: Logo[] }[] = [
  {
    label: "Certifications",
    logos: [
      { name: "FSSAI", logo: "/fssai-logo.png" },
      { name: "NPOP", logo: "/npop-logo.jpeg" },
      { name: "NOP(USDA)", logo: "/nop-logo.png" },
      { name: "REGEN", logo: "/regen-logo.png" },
    ],
  },
  {
    label: "Business Partners",
    logos: [
      { name: "ITC", logo: "/itc-logo.png" },
      { name: "LTFOODS", logo: "/ltfoods-logo.svg" },
      { name: "BIGBASKET", logo: "/big-basket-logo.png" },
      { name: "FORTUNERICE", logo: "/fortune-rice-logo.jpg" },
      { name: "OKFOODS", logo: "/ok-foods-logo.jpg" },
      { name: "PRAGATIFOODS", logo: "/pragati-foods-logo.webp" },
    ],
  },
];

// One row per group, laid out like the stat rows in PurposeSection: label
// column on the left, logos across the rest.
export function TrustSection() {
  return (
    <Section
      className="border-b border-[rgba(20,32,26,.07)]"
      containerClassName="py-12"
    >
      <div className="divide-y divide-[rgba(20,32,26,.09)]">
        {groups.map((group) => (
          <div
            key={group.label}
            className="grid gap-5 py-7 md:grid-cols-[200px_1fr] md:items-center md:gap-8"
          >
            <h2 className="font-display text-ink border-green border-s-[3px] ps-3.5 text-[26px] leading-[1.1] md:text-[30px]">
              {group.label}
            </h2>
            <ul className="flex flex-wrap items-center justify-evenly gap-x-8 gap-y-6">
              {group.logos.map((item) => (
                <li key={item.name}>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={280}
                    height={140}
                    className="h-12 w-auto mix-blend-multiply md:h-16"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
