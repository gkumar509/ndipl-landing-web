import { PackageIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { displayOrderField, imageField } from "./shared/fields";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'For example "Chickpeas (Kabuli / Desi)".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "spec",
      title: "Specification",
      type: "string",
      description:
        'The grade line under the name, e.g. "42-58 count · sortex clean".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "details",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "Long description shown in the product popup.",
    }),
    imageField(),
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
    select: { title: "title", subtitle: "spec", media: "image" },
  },
});
