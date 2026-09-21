import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { SanityImage } from "@/components/common/sanity-image";
import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import type { Team } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { TEAM_QUERY } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("team");
  return { title: t("title"), description: t("metaDescription") };
}

export default async function TeamPage() {
  const locale = await getLocale();
  const t = await getTranslations("team");

  const { data } = await sanityFetch({
    query: TEAM_QUERY,
    params: { locale },
  });
  const { leadership = [], departments = [] } = (data ?? {}) as Team;

  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-[24ch] text-[clamp(38px,4.6vw,56px)] leading-[1.08]"
        >
          {t("heading")}
        </DisplayHeading>
        <p className="text-body mt-[18px] max-w-[56ch] text-[16.5px] leading-[1.65]">
          {t("intro")}
        </p>
      </Section>

      {leadership.length > 0 ? (
        <Section containerClassName="py-11">
          <Eyebrow>{t("leadership")}</Eyebrow>
          <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(230px,300px))] justify-center gap-4.5">
            {leadership.map((member) => (
              <li
                key={member._id}
                className="overflow-hidden rounded-[18px] border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[rgba(10,107,61,.4)]"
              >
                <SanityImage
                  value={member.image}
                  fallbackLabel={t("portraitAlt", { name: member.name ?? "" })}
                  className="aspect-4/5"
                  sizes="(min-width: 640px) 300px, 100vw"
                  width={800}
                />
                <div className="p-4">
                  <h2 className="font-display text-xl leading-[1.2]">
                    {member.name}
                  </h2>
                  <p className="text-green mt-1.5 text-[11px] font-medium tracking-[0.08em] uppercase">
                    {member.role}
                  </p>
                  {member.bio ? (
                    <p className="text-body mt-2.5 mb-3 text-[13px] leading-[1.6]">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.tags?.length ? (
                    <ul className="flex flex-wrap gap-[7px]">
                      {member.tags.map((tag) => (
                        <li
                          key={tag}
                          className="bg-sand text-body rounded-full px-2.5 py-1 text-[10.5px] font-medium"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {departments.length > 0 ? (
        <Section containerClassName="pb-[70px]">
          <div className="border-t border-[rgba(20,32,26,.1)] pt-7">
            <Eyebrow>{t("employees")}</Eyebrow>
            <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(170px,220px))] gap-3.5">
              {departments.map((member) => (
                <li
                  key={member._id}
                  className="overflow-hidden rounded-[14px] border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[rgba(10,107,61,.4)]"
                >
                  <SanityImage
                    value={member.image}
                    fallbackLabel={t("portraitAlt", { name: member.name ?? "" })}
                    className="aspect-4/5"
                    sizes="(min-width: 640px) 220px, 50vw"
                    width={600}
                  />
                  <div className="p-3.5">
                    <h3 className="font-display text-base leading-[1.2]">
                      {member.name}
                    </h3>
                    <p className="text-green mt-[5px] text-[10.5px] font-medium tracking-[0.08em] uppercase">
                      {member.role}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ) : null}
    </>
  );
}
