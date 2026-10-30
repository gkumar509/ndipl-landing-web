import { defineField } from "sanity";

/** Image with a required alt text, so the frontend never has to invent one. */
export const imageField = (options?: { name?: string; title?: string }) =>
  defineField({
    name: options?.name ?? "image",
    title: options?.title ?? "Image",
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alternative text",
        type: "string",
        description: "Describes the image for screen readers and SEO.",
        validation: (rule) => rule.required(),
      }),
    ],
  });

/** Manual sort order shared by every orderable document type. */
export const displayOrderField = defineField({
  name: "displayOrder",
  title: "Display order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 100,
  validation: (rule) => rule.required().integer().min(0),
});
