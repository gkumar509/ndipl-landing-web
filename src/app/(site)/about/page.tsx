import type { Metadata } from "next";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Natures Delight Industries Private Limited is a trusted India-based manufacturer, merchant exporter, supplier and global sourcing partner specializing in premium-quality agro products.",
};

const blocks = [
  {
    kicker: "WHO WE ARE",
    title: "Beyond Trading: Quality at Every Step",
    description:
      "We are processors and exporters, not just intermediaries. By managing critical stages of the supply chain, from intake and cleaning to grading and packing, we maintain greater control over product quality, ensure consistency with buyer specifications, and uphold clear accountability for quality and pricing.",
  },
  {
    kicker: "WHAT WE PROMISE",
    title: "Quality You Can Verify, Confidence You Can Trust",
    description:
      "Every consignment is backed by grading data and third-party test reports, with pre-shipment samples verified against approved quality standards. This ensures greater transparency, consistency and confidence in every delivery.",
  },
  {
    kicker: "WHY IT MATTERS",
    title: "Protecting the Resources That Sustain Our Food",
    description:
      "Safe, quality food begins with healthy soil and responsible water use. Our sourcing programmes promote sustainable agricultural practices that help conserve these essential resources and support the long-term resilience of farming communities in our sourcing regions.",
  },
];

const values = [
  {
    title: "Traceable lots",
    description:
      "Batch codes link a pack back to region, farmer group and intake date.",
  },
  {
    title: "Specification first",
    description: "We quote against a written spec, then hold ourselves to it.",
  },
  {
    title: "Documentation on time",
    description: "Export papers prepared alongside production, not after it.",
  },
  {
    title: "Long relationships",
    description: "Repeat buying seasons with the same farmer groups.",
  },
];

const stats = [
  {
    value: "2025",
    label: "Incorporated",
  },
  {
    value: "9",
    label: "Sourcing regions",
  },
  {
    value: "6",
    label: "Processing stages",
  },
  {
    value: "24 hrs",
    label: "Quotation turnaround",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section containerClassName="pt-[70px] pb-5">
        <Eyebrow>About us</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 max-w-full text-[clamp(38px,4.6vw,58px)] leading-[1.08]"
        >
          Building Trust in Food Through Sustainable Sourcing
        </DisplayHeading>
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

      <Section>
        <p className="text-body mt-5 text-[17px] leading-[1.65]">
          Natures Delight Industries Private Limited (NDIPL) is a Bhopal, Madhya
          Pradesh-based agri-commodity company established in 2025. It sources,
          processes and supplies food commodities to institutional buyers across
          India and international markets.
          <br />
          While India is a leading producer of grains, pulses and oilseeds,
          fragmented supply chains can make it challenging to ensure consistent
          quality, traceability and compliance. Meanwhile, farmers adopting
          sustainable agricultural practices often lack reliable access to
          markets that recognise and support their efforts.
          <br />
          NDIPL was established to bridge this gap. Founded by agri-industry
          professionals with over 40 years of combined experience, the company
          brings together farm-level sourcing, quality assurance, processing,
          storage, traceability and supply chain management through an
          integrated model. By connecting responsible agricultural practices
          with dependable market access, NDIPL aims to strengthen the link
          between sustainable farming and safe, high-quality food.
          <br />
          Within its first year, NDIPL established a B2B presence with leading
          food companies. It is now focused on scaling its operations and
          building long-term partnerships with buyers seeking reliable sourcing,
          consistent quality and traceable agricultural commodities.
        </p>
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
          How we work
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
