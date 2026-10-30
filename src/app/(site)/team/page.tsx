import type { Metadata } from "next";

import { SanityImage } from "@/components/common/sanity-image";
import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import type { TeamMember } from "@/sanity/content-types";
import { sanityFetch } from "@/sanity/lib/live";
import { TEAM_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Agronomists, quality specialists and export hands \u2014 the people behind every NDIPL consignment.",
};

export default async function TeamPage() {
  const { data } = await sanityFetch({ query: TEAM_QUERY });
  const members = (data ?? []) as TeamMember[];

  return (
    <>
      <Section containerClassName="pt-[70px]">
        <Eyebrow>Our team</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 text-[clamp(38px,4.6vw,48px)] leading-[1.08]"
        >
          Agronomists, quality specialists and export hands
        </DisplayHeading>
        <p className="text-body mt-[18px] text-[16.5px] leading-[1.65]">
          {"Photographs, profiles and areas of expertise for the people behind every consignment."}
        </p>
      </Section>

      {members.length > 0 ? (
        <Section containerClassName="pt-11 pb-[70px]">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,220px))] gap-5.5">
            {members.map((member) => (
              <li
                key={member._id}
                className="overflow-hidden rounded-[14px] border border-[rgba(20,32,26,.09)] bg-white transition-colors hover:border-[rgba(10,107,61,.4)]"
              >
                <SanityImage
                  value={member.image}
                  fallbackLabel={`portrait 4:5 — ${member.name ?? ""}`}
                  className="aspect-4/5"
                  sizes="(min-width: 640px) 220px, 50vw"
                  width={600}
                />
                <div className="p-3.5">
                  <h2 className="font-display text-lg leading-[1.2]">
                    {member.name}
                  </h2>
                  <p className="text-green mt-1 text-[10.5px] font-medium tracking-[0.08em] uppercase">
                    {member.role}
                  </p>
                  {member.bio ? (
                    <p
                      title={member.bio}
                      className="text-body mt-2 mb-2.5 line-clamp-3 text-[12.5px] leading-[1.55]"
                    >
                      {member.bio}
                    </p>
                  ) : null}
                  {member.tags?.length ? (
                    <ul className="flex flex-wrap gap-1.5">
                      {member.tags.map((tag) => (
                        <li
                          key={tag}
                          className="bg-sand text-body rounded-full px-2 py-0.5 text-[10px] font-medium"
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
    </>
  );
}
