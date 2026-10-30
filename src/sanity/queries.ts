import { defineQuery } from "next-sanity";

const IMAGE_FRAGMENT = /* groq */ `
  "image": image{
    ...,
    "alt": coalesce(alt, ""),
    "lqip": asset->metadata.lqip
  }
`;

/** Home page: category cards only, no products. */
export const PRODUCT_CATEGORIES_QUERY = defineQuery(`
  *[_type == "productCategory"] | order(displayOrder asc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    note,
    ${IMAGE_FRAGMENT}
  }
`);

/** Products page: every category with its products nested underneath. */
export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "productCategory"] | order(displayOrder asc) {
    _id,
    "slug": slug.current,
    title,
    summary,
    note,
    "products": *[_type == "product" && category._ref == ^._id]
      | order(displayOrder asc) {
        _id,
        title,
        spec,
        details,
        ${IMAGE_FRAGMENT}
      }
  }
`);

/** Home page "Our purpose" section: rows of headline numbers. */
export const STAT_GROUPS_QUERY = defineQuery(`
  *[_type == "statGroup"] | order(displayOrder asc) {
    _id,
    title,
    "stats": stats[]{
      _key,
      value,
      label
    }
  }
`);

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    role,
    bio,
    tags,
    ${IMAGE_FRAGMENT}
  }
`);
