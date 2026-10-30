import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { displayOrderField, imageField } from "./shared/fields";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'For example "Pulses & Lentils".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      description: "Used internally.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "string",
      description:
        'The short item list shown on the home page card, e.g. "Chana, toor, moong, urad, masoor, rajma".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Quality note",
      type: "string",
      description:
        'Shown beside the category heading on the products page, e.g. "Machine cleaned · sortex · 99.5% purity".',
    }),
    imageField({ title: "Category image" }),
    displayOrderField,
  ],
  orderings: [
    {
      name: "displayOrderAsc",
      title: "Display order",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "image" },
  },
});
