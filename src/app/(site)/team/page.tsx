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
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
            {leadership.map((member) => (
              <li
                key={member._id}
                className="overflow-hidden rounded-[18px] border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[rgba(10,107,61,.4)]"
              >
                <SanityImage
                  value={member.image}
                  fallbackLabel={t("portraitAlt", { name: member.name ?? "" })}
                  className="h-[260px]"
                  sizes="(min-width: 1240px) 380px, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-[22px]">
                  <h2 className="font-display text-2xl leading-[1.2]">
                    {member.name}
                  </h2>
                  <p className="text-green mt-[7px] text-xs font-medium tracking-[0.08em] uppercase">
                    {member.role}
                  </p>
                  {member.bio ? (
                    <p className="text-body mt-3.5 mb-4 text-sm leading-[1.65]">
                      {member.bio}
                    </p>
                  ) : null}
                  {member.tags?.length ? (
                    <ul className="flex flex-wrap gap-[7px]">
                      {member.tags.map((tag) => (
                        <li
                          key={tag}
                          className="bg-sand text-body rounded-full px-[11px] py-[5px] text-[11.5px] font-medium"
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
            <Eyebrow>{t("departments")}</Eyebrow>
            <ul className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3.5">
              {departments.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center gap-3.5 rounded-[14px] border border-[rgba(20,32,26,.08)] bg-white p-3.5"
                >
                  <SanityImage
                    value={member.image}
                    className="size-[52px] flex-none rounded-full"
                    sizes="52px"
                    width={200}
                  />
                  <div>
                    <div className="text-sm font-semibold">{member.name}</div>
                    <div className="text-stone mt-[3px] text-[12.5px] leading-[1.4]">
                      {member.role}
                    </div>
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
