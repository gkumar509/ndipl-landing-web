import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  DisplayHeading,
  Eyebrow,
  ImagePlaceholder,
  Section,
} from "@/components/common/section";
import { ContactForm } from "@/components/forms/contact-form";
import {
  INTEREST_KEYS,
  type ContactInput,
  type InterestKey,
} from "@/lib/contact-schema";

type ContactInfo = { label: string; value: string };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("title"), description: t("metaDescription") };
}

const asString = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

export default async function ContactPage({
  searchParams,
}: PageProps<"/contact">) {
  const params = await searchParams;
  const t = await getTranslations("contact");
  const form = await getTranslations("form");

  // Links from the products, careers and home pages prefill the form.
  const interest = asString(params.interest);
  const subject = asString(params.subject);

  const defaults: Partial<ContactInput> = {
    email: asString(params.email) ?? "",
    message: subject ? `${form("enquirySubject", { subject })}\n\n` : "",
    interest: INTEREST_KEYS.includes(interest as InterestKey)
      ? (interest as InterestKey)
      : "product",
  };

  const info = t.raw("info") as ContactInfo[];

  return (
    <Section containerClassName="grid grid-cols-1 lg:grid-cols-2 items-start gap-11 py-[70px]">
      <div>
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[20ch] text-[clamp(36px,4.2vw,52px)] leading-[1.08]"
        >
          {t("heading")}
        </DisplayHeading>
        <p className="text-body mt-[18px] mb-[30px] max-w-[44ch] text-base leading-[1.65]">
          {t("intro")}
        </p>

        <dl className="grid gap-4">
          {info.map((item) => (
            <div
              key={item.label}
              className="border-t border-[rgba(20,32,26,.12)] pt-3.5"
            >
              <dt className="text-stone label-mono">{item.label}</dt>
              <dd className="mt-1.5 text-[15px] leading-[1.5] font-medium">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <ImagePlaceholder
          label={t("mapLabel")}
          className="mt-7 h-[190px] items-center justify-center rounded-2xl"
        />
      </div>

      <ContactForm defaults={defaults} />
    </Section>
  );
}
