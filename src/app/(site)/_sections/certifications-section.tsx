import { useTranslations } from "next-intl";
import Link from "next/link";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

type Certification = { name: string; description: string };

export function CertificationsSection() {
  const t = useTranslations("home.compliance");
  const certifications = t.raw("certifications") as Certification[];
  const partners = t.raw("partners") as string[];

  return (
    <Section id="certifications" containerClassName="py-[76px]">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-11">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <DisplayHeading className="mt-3 mb-3.5">
            {t("heading")}
          </DisplayHeading>
          <p className="text-body mb-[22px] max-w-[44ch] text-[15.5px] leading-[1.65]">
            {t("body")}
          </p>
          <Button asChild variant="brand" size="pill">
            <Link href="/contact">{t("cta")}</Link>
          </Button>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex min-h-28 flex-col gap-3.5 rounded-[14px] border border-[rgba(20,32,26,.09)] bg-white p-4"
            >
              <div className="bg-sand size-[26px] rounded-[7px] border border-[rgba(20,32,26,.08)]" />
              <div>
                <div className="text-[13.5px] font-semibold">{cert.name}</div>
                <div className="text-stone mt-[3px] text-[11.5px] leading-[1.4]">
                  {cert.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-11 border-t border-[rgba(20,32,26,.1)] pt-[26px]">
        <Eyebrow>{t("partnersEyebrow")}</Eyebrow>
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-stone flex h-[70px] items-center justify-center rounded-xl border border-dashed border-[rgba(20,32,26,.18)] p-2 text-center font-mono text-[10.5px]"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
