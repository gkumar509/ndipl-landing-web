import type { SchemaTypeDefinition } from "sanity";

import { product } from "./product";
import { productCategory } from "./productCategory";
import { statGroup } from "./statGroup";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  productCategory,
  product,
  teamMember,
  statGroup,
];
