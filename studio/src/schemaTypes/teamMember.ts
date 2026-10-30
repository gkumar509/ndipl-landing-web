import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { displayOrderField, imageField } from "./shared/fields";

const BIO_MAX = 120;

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    imageField({ title: "Portrait" }),
    defineField({
      name: "bio",
      title: "Short bio",
      type: "text",
      description: `Up to ${BIO_MAX} characters, so every card stays the same size.`,
      validation: (rule) => rule.required().max(BIO_MAX),
    }),
    defineField({
      name: "tags",
      title: "Areas of expertise",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description: "Shown as pills on the card.",
    }),
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
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
