import type { SanityImageValue } from "@/components/common/sanity-image";

/**
 * Shapes returned by the GROQ queries. Replace these with the generated types
 * from `pnpm typegen` once the Studio is connected to a real project.
 */

export type ProductCategory = {
  _id: string;
  title: string | null;
  slug: string | null;
  summary: string | null;
  note: string | null;
  image: SanityImageValue | null;
};

export type Product = {
  _id: string;
  title: string | null;
  spec: string | null;
  image: SanityImageValue | null;
};

export type CategoryWithProducts = Omit<ProductCategory, "image"> & {
  products: Product[];
};

export type TeamLeader = {
  _id: string;
  name: string | null;
  role: string | null;
  bio: string | null;
  tags: string[] | null;
  image: SanityImageValue | null;
};

export type TeamDepartmentMember = {
  _id: string;
  name: string | null;
  role: string | null;
  image: SanityImageValue | null;
};

export type Team = {
  leadership: TeamLeader[];
  departments: TeamDepartmentMember[];
};
