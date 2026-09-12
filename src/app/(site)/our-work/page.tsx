import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import {
  DisplayHeading,
  Eyebrow,
  ImagePlaceholder,
  Section,
} from "@/components/common/section";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Area = {
  number: string;
  title: string;
  description: string;
  points: string[];
  imageLabel: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ourWork");
  return { title: t("title"), description: t("metaDescription") };
}

const images = ["/7.jpg", "/10.jpg", "/11.jpg", "/12.jpg", "/13.jpg"];

export default function OurWorkPage() {
  const t = useTranslations("ourWork");
  const areas = t.raw("areas") as Area[];

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
        <p className="text-body mt-5 max-w-[62ch] text-[17px] leading-[1.65]">
          {t("intro")}
        </p>
      </Section>

      <Section containerClassName="flex flex-col gap-[60px] py-14">
        {areas.map((area, index) => (
          <article
            key={area.number}
            className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] items-center gap-10"
          >
            {/* Odd rows put the image first on wide screens; stacked on narrow
                screens the text always leads. */}
            <div className={cn(index % 2 === 1 && "md:order-2")}>
              <div className="text-green label-mono">{area.number}</div>
              <h2 className="font-display mt-3.5 mb-2.5 text-[30px] leading-[1.15]">
                {area.title}
              </h2>
              <p className="text-body text-[15px] leading-[1.65]">
                {area.description}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {area.points.map((point) => (
                  <li
                    key={point}
                    className="text-body flex gap-2.5 text-[14px] leading-[1.6]"
                  >
                    <span
                      aria-hidden
                      className="bg-gold mt-[7px] size-1.5 flex-none rounded-full"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[400px] h-[280px] mx-auto rounded-[20px] overflow-clip">
              <Image
                src={images[index]}
                alt={area.title}
                width={150}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
          </article>
        ))}
      </Section>
    </>
  );
}
