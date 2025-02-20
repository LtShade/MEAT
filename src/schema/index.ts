import { ListConfig } from "@keystone-6/core";

import {Equipment, Faction, Manufacturer, Ownership, Planet, Post, Source, Tag, User } from "./lists";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const lists: Record<string, ListConfig<any>> = {
  Equipment,
  Faction,
  Manufacturer,
  Ownership,
  Planet,
  Post,
  Source,
  Tag,
  User,
};