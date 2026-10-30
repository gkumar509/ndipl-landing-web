import { BarChartIcon, PackageIcon, TagIcon, UsersIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("productCategory")
        .title("Product categories")
        .icon(TagIcon),
      S.documentTypeListItem("product").title("Products").icon(PackageIcon),
      S.documentTypeListItem("teamMember").title("Team").icon(UsersIcon),
      S.documentTypeListItem("statGroup")
        .title("Home page stats")
        .icon(BarChartIcon),
    ]);
