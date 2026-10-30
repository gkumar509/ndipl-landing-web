import { BarChartIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { displayOrderField } from "./shared/fields";

/** A row of headline numbers in the home page "Our purpose" section. */
export const statGroup = defineType({
  name: "statGroup",
  title: "Stat group",
  type: "document",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: 'For example "Network" or "Supply chain".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "stats",
      type: "array",
      description: "Shown side by side; three fit best.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              type: "string",
              description: 'Written as displayed, e.g. "2,400", "48h" or "99.2%".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              type: "string",
              description: 'For example "Registered farmers".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(4),
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
    select: { title: "title", stats: "stats" },
    prepare: ({ title, stats }) => ({
      title,
      subtitle: `${stats?.length ?? 0} stats`,
    }),
  },
});
