import { ListConfig } from "@keystone-6/core";

import { Post, Source, Tag, User } from "./lists";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lists: Record<string, ListConfig<any>> = {
  Post,
  Source,
  Tag,
  User,
};