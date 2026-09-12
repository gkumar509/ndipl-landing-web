import { defineQuery } from "next-sanity";

const IMAGE_FRAGMENT = /* groq */ `
  "image": image{
    ...,
    "alt": coalesce(alt, ""),
    "lqip": asset->metadata.lqip
  }
`;

/**
 * Fields are internationalized arrays, so every text projection picks the
 * requested locale and falls back to English when a translation is missing.
 *
 * Entries carry the locale either as the array `_key` (what `scripts/seed.ts`
 * writes) or in a `language` field with a random `_key` (what the Studio
 * writes), so both spellings have to be matched or the field reads as null.
 */
const localized = (field: string) => /* groq */ `
  "${field}": coalesce(
    ${field}[language == $locale][0].value,
    ${field}[_key == $locale][0].value,
    ${field}[language == "en"][0].value,
    ${field}[_key == "en"][0].value
  )
`;

/** Home page: category cards only, no products. */
export const PRODUCT_CATEGORIES_QUERY = defineQuery(`
  *[_type == "productCategory"] | order(displayOrder asc) {
    _id,
    "slug": slug.current,
    ${localized("title")},
    ${localized("summary")},
    ${localized("note")},
    ${IMAGE_FRAGMENT}
  }
`);

/** Products page: every category with its products nested underneath. */
export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "productCategory"] | order(displayOrder asc) {
    _id,
    "slug": slug.current,
    ${localized("title")},
    ${localized("summary")},
    ${localized("note")},
    "products": *[_type == "product" && category._ref == ^._id]
      | order(displayOrder asc) {
        _id,
        ${localized("title")},
        ${localized("spec")},
        ${IMAGE_FRAGMENT}
      }
  }
`);

export const TEAM_QUERY = defineQuery(`
  {
    "leadership": *[_type == "teamMember" && group == "leadership"]
      | order(displayOrder asc) {
        _id,
        ${localized("name")},
        ${localized("role")},
        ${localized("bio")},
        ${localized("tags")},
        ${IMAGE_FRAGMENT}
      },
    "departments": *[_type == "teamMember" && group == "department"]
      | order(displayOrder asc) {
        _id,
        ${localized("name")},
        ${localized("role")},
        ${IMAGE_FRAGMENT}
      }
  }
`);
