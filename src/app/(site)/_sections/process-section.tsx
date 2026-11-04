import Link from "next/link";

import { DisplayHeading, Section } from "@/components/common/section";

const stages = [
  {
    title: "Sourcing",
    description:
      "Selected regions, geo-tagged farmer groups, lot-level intake records.",
  },
  {
    title: "Quality Testing",
    description:
      "Moisture, purity and defect checks on every lot before it clears intake.",
  },
  {
    title: "Traceability",
    description:
      "Each lot carries its farm, batch and processing record from intake to container.",
  },
  {
    title: "Certifications",
    description:
      "Third-party lab reports and certificates issued to the buyer's destination requirements.",
  },
  {
    title: "Shipment",
    description:
      "Buyer-spec packing, container stuffing and full export documentation.",
  },
];

export function ProcessSection() {
  return (
    <Section className="bg-ink text-on-ink" containerClassName="py-[76px]">
      <span className="text-gold text-[11.5px] font-medium tracking-[0.14em] uppercase">
        From farm gate to container
      </span>
      <DisplayHeading className="mt-3 mb-10 max-w-[25ch]">
        A five-stage processing discipline
      </DisplayHeading>

      <ol className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden rounded-[14px] border border-[rgba(245,242,234,.14)] bg-[rgba(245,242,234,.14)]">
        {stages.map((stage) => (
          <li key={stage.title} className="bg-ink">
            <Link
              href="/our-work"
              className="block h-full px-5 pt-6 pb-7 transition-colors hover:bg-[rgba(245,242,234,.05)]"
            >
              <h3 className="font-display mt-3.5 mb-2 text-[21px] leading-[1.2]">
                {stage.title}
              </h3>
              <p className="text-[13px] leading-[1.55] text-[rgba(245,242,234,.62)]">
                {stage.description}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
