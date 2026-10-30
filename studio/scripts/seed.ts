/**
 * Seeds the dataset with the content shown in the NDIPL design file, so the
 * site renders exactly like the design before real copy and photography land.
 *
 * Usage:
 *   SANITY_STUDIO_PROJECT_ID=... SANITY_STUDIO_DATASET=production \
 *   SANITY_WRITE_TOKEN=... npm run seed
 *
 * Re-running replaces the seeded documents (they use fixed `seed.*` ids) and
 * leaves anything you created in the Studio untouched.
 */
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Set SANITY_STUDIO_PROJECT_ID and SANITY_WRITE_TOKEN before running the seed.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-02-01",
  useCdn: false,
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const CATEGORIES: {
  title: string;
  summary: string;
  note: string;
  products: [name: string, spec: string][];
}[] = [
  {
    title: "Pulses & Lentils",
    summary: "Chana, toor, moong, urad, masoor, rajma",
    note: "Machine cleaned · sortex · 99.5% purity",
    products: [
      ["Chickpeas (Kabuli / Desi)", "42–58 count · sortex clean"],
      ["Toor Dal", "Polished / unpolished"],
      ["Moong Whole & Split", "Green, sortex"],
      ["Urad Dal", "Black & white, FAQ+"],
      ["Masoor", "Whole & red split"],
      ["Rajma", "Chitra, Jalandhari, red"],
    ],
  },
  {
    title: "Spices",
    summary: "Turmeric, chilli, coriander, cumin, pepper",
    note: "Steam sterilised on request · ASTA grades",
    products: [
      ["Turmeric Fingers & Powder", "3–5% curcumin"],
      ["Dry Red Chilli", "Teja, Byadgi, S17"],
      ["Coriander Seed", "Eagle, single parrot"],
      ["Cumin Seed", "99% / 99.5% purity"],
      ["Fenugreek", "Whole & powder"],
      ["Black Pepper", "550–600 g/l"],
    ],
  },
  {
    title: "Grains & Cereals",
    summary: "Rice, wheat, maize, jowar, bajra",
    note: "Moisture controlled · fumigated",
    products: [
      ["Sortex Rice", "Non-basmati & basmati"],
      ["Milling Wheat", "Sharbati, Lokwan"],
      ["Maize", "Feed & food grade"],
      ["Sorghum (Jowar)", "White & yellow"],
      ["Pearl Millet (Bajra)", "Feed & food grade"],
    ],
  },
  {
    title: "Millets",
    summary: "Foxtail, kodo, little, barnyard, ragi",
    note: "Nutri-cereal range · retail packs available",
    products: [
      ["Foxtail Millet", "Polished / unpolished"],
      ["Kodo Millet", "Destoned"],
      ["Little Millet", "Hand-picked lots"],
      ["Barnyard Millet", "Low broken"],
      ["Finger Millet (Ragi)", "Whole & flour"],
    ],
  },
  {
    title: "Oil Seeds",
    summary: "Sesame, groundnut, mustard, niger, soybean",
    note: "Oil content certified per lot",
    products: [
      ["Hulled & Natural Sesame", "99.95% purity"],
      ["Groundnut Kernels", "Java & Bold"],
      ["Mustard Seed", "38–42% oil"],
      ["Niger Seed", "Cleaned, bird feed grade"],
      ["Soybean", "Non-GMO on request"],
    ],
  },
  {
    title: "Dehydrated & Dried",
    summary: "Onion, garlic, ginger, amla, raisins",
    note: "Hot-air dried · low microbial load",
    products: [
      ["Dehydrated Onion", "Flakes, minced, powder"],
      ["Dehydrated Garlic", "Cloves & granules"],
      ["Dry Ginger", "Whole & split"],
      ["Raisins", "Golden & green"],
      ["Dried Amla", "Deseeded slices"],
    ],
  },
];

const TEAM = [
  {
    name: "Managing Director",
    role: "Strategy & partnerships",
    bio: "Two decades in agro trade, leading sourcing partnerships and export growth across the Gulf, South-East Asia and Africa.",
    tags: ["Export strategy", "Buyer relations", "Compliance"],
  },
  {
    name: "Director — Operations",
    role: "Plant & processing",
    bio: "Runs intake, cleaning and packing lines, capacity planning and vendor development for packaging and logistics.",
    tags: ["Plant ops", "Capacity planning", "Logistics"],
  },
  {
    name: "Head — Quality Assurance",
    role: "Food safety & testing",
    bio: "Owns the food-safety plan, lab coordination and lot-release decisions, including residue and aflatoxin protocols.",
    tags: ["HACCP", "Lab protocols", "Audits"],
  },
  {
    name: "Agronomy Lead",
    role: "Farmer training, soil & water programmes",
    bio: "Works with farmer groups on crop planning, soil health and water use, and trains field teams on good practice.",
    tags: ["Agronomy", "Farmer training"],
  },
  {
    name: "Procurement Manager",
    role: "Pulses & oil seeds",
    bio: "Sources pulses and oil seeds from partner farmers and mandis, and manages grading, pricing and intake schedules.",
    tags: ["Sourcing", "Grading"],
  },
  {
    name: "Export Documentation",
    role: "Shipping, LC and certification",
    bio: "Prepares shipping documents, letters of credit and certificates of origin, working with forwarders and port agents.",
    tags: ["Shipping", "Letters of credit"],
  },
  {
    name: "Plant Supervisor",
    role: "Cleaning, grading, colour sorting",
    bio: "Oversees the cleaning, grading and colour-sorting lines day to day, keeping throughput steady and every lot on spec.",
    tags: ["Processing", "Line management"],
  },
  {
    name: "Sales — International",
    role: "Gulf & South-East Asia",
    bio: "Manages buyer relationships across the Gulf and South-East Asia, from samples and quotes through to repeat contracts.",
    tags: ["Export sales", "Buyer relations"],
  },
  {
    name: "Sustainability Officer",
    role: "Watershed and plantation drives",
    bio: "Runs watershed, plantation and regenerative farming programmes with partner villages, and tracks their impact.",
    tags: ["Watershed", "Regenerative farming"],
  },
];

const STAT_GROUPS: { title: string; stats: [value: string, label: string][] }[] = [
  {
    title: "Network",
    stats: [
      ["12", "Sourcing belts"],
      ["4", "States"],
      ["2,400", "Registered farmers"],
    ],
  },
  {
    title: "Supply chain",
    stats: [
      ["5", "Processing stages"],
      ["48h", "Quote turnaround"],
      ["99.2%", "On-spec lots"],
    ],
  },
];

async function seed() {
  const tx = client.transaction();

  CATEGORIES.forEach((category, categoryIndex) => {
    const slug = slugify(category.title);
    const categoryId = `seed.category.${slug}`;

    tx.createOrReplace({
      _id: categoryId,
      _type: "productCategory",
      title: category.title,
      slug: { _type: "slug", current: slug },
      summary: category.summary,
      note: category.note,
      displayOrder: (categoryIndex + 1) * 10,
    });

    category.products.forEach(([name, spec], productIndex) => {
      tx.createOrReplace({
        _id: `seed.product.${slug}.${slugify(name)}`,
        _type: "product",
        title: name,
        spec,
        category: { _type: "reference", _ref: categoryId },
        displayOrder: (productIndex + 1) * 10,
      });
    });
  });

  TEAM.forEach((member, index) => {
    tx.createOrReplace({
      _id: `seed.team.${slugify(member.name)}`,
      _type: "teamMember",
      displayOrder: (index + 1) * 10,
      name: member.name,
      role: member.role,
      bio: member.bio,
      tags: member.tags,
    });
  });

  STAT_GROUPS.forEach((group, index) => {
    tx.createOrReplace({
      _id: `seed.stats.${slugify(group.title)}`,
      _type: "statGroup",
      displayOrder: (index + 1) * 10,
      title: group.title,
      stats: group.stats.map(([value, label]) => ({
        _key: slugify(label),
        _type: "stat",
        value,
        label,
      })),
    });
  });

  await tx.commit();

  const productCount = CATEGORIES.reduce(
    (total, category) => total + category.products.length,
    0,
  );
  console.log(
    `Seeded ${CATEGORIES.length} categories, ${productCount} products and ` +
      `${TEAM.length} team members and ${STAT_GROUPS.length} stat groups into "${dataset}".`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
