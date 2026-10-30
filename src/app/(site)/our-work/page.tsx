import type { Metadata } from "next";

import { DisplayHeading, Eyebrow, Section } from "@/components/common/section";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "How Natures Delight Industries works: direct sourcing, farm and farmer registration, certified products, warehousing and supply chain management, and processing with value addition.",
};

const images = ["/7.jpg", "/10.jpg", "/11.jpg", "/13.jpg"];

const areas = [
  {
    number: "01",
    title: "Direct Sourcing",
    description:
      "Our sourcing begins at the farm. NDIPL works with over 50,000 farmers across 60,000 hectares, promoting integrated pest management and organic and regenerative farming practices. This network enables us to source a diverse range of commodities, including rice, wheat, pulses, oilseeds and millets. Each lot is digitally linked to its farm of origin, giving buyers greater visibility and traceability across the supply chain. Our model connects farmers to reliable market opportunities while providing buyers with consistent quality, responsible sourcing and greater confidence in the origin of their commodities.",
  },
  {
    number: "02",
    title: "Quality Assurance & Testing",
    description:
      "At NDIPL, quality assurance begins at the farm and continues through to final shipment. Our team of agronomists works directly with growers, providing guidance on crop health, input use and harvesting practices to help build quality at the source. Across our five processing units, dedicated quality assurance and control teams operate in-house laboratories to assess every commodity against quality benchmarks agreed with our buyers. Testing covers physical parameters, including moisture, foreign matter, broken grains and admixture, as well as food safety indicators such as pesticide residues, aflatoxins and heavy metals. Routine testing is conducted in our in-house laboratories, while specialised analyses are undertaken by accredited external laboratories. Samples are assessed at intake, before storage and prior to dispatch, with results documented for every lot. This systematic approach enables consistent quality, transparent verification and greater confidence at every stage of the supply chain.",
  },
  {
    number: "03",
    title: "Certified products & compliance",
    description:
      "NDIPL's operations are FSSAI-licensed and HACCP-certified, supporting adherence to food safety and quality standards across handling and processing. For organic commodities, the company holds certifications under India’s National Programme for Organic Production (NPOP) and the USDA National Organic Program (NOP). To maintain organic integrity across seasons, we work with farmer groups to strengthen record-keeping, implement internal control systems and ensure readiness for inspections. Each consignment is accompanied by the relevant certifications and compliance documentation, helping buyers meet their sourcing requirements, streamline audits and integrate our products into their supply chains with confidence.",
  },
  {
    number: "04",
    title: "Warehouse & Processing",
    description:
      "NDIPL operates 50,000 MT of dry and cold storage capacity across Maharashtra and Delhi, supported by lot-level inventory tracking and First-In, First-Out (FIFO) stock rotation. Strategically located near key EXIM hubs, our facilities enable efficient, reliable dispatch to domestic and international markets. Through five primary and secondary processing units, we transform raw agricultural commodities into products that meet buyer specifications. Our capabilities span wheat, paddy and oilseeds, including soybean, mustard and groundnut, with processes such as cleaning, destoning, grading, sorting and value-added processing. We also offer flexible packaging solutions tailored to buyer requirements, ranging from bulk industrial formats to export-grade packaging. This integrated infrastructure enables us to maintain product quality, optimise handling and deliver commodities that are ready for market.",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <Section containerClassName="pt-[70px] pb-5">
        <Eyebrow>Our work</Eyebrow>
        <DisplayHeading
          as="h1"
          className="mt-3.5 text-[clamp(38px,4.6vw,58px)] leading-[1.08]"
        >
          From Farm to Shipment, Quality at Every Step
        </DisplayHeading>
        <p className="text-body mt-5 text-[17px] leading-[1.65]">
          We manage the critical stages of the supply chain, from farm-level
          sourcing and certification to storage, processing and container
          loading. This integrated approach ensures end-to-end traceability,
          consistent quality and clear accountability for every specification
          and price.
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
              {/* <ul className="mt-5 flex flex-col gap-2.5">
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
              </ul> */}
            </div>

            <div className="w-100 h-70 mx-auto rounded-[20px] overflow-clip">
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
