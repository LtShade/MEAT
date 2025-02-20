import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";



export const Source: Exclude<Lists["Source"], undefined> = list({
  // WARNING
  //   anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // Sources include sourcebook titles such as rulebooks, technical readouts, or other publications such as fan-made materials or videogame mods.
  fields: {
    name: text({ validation: { isRequired: true } }),
    equipments: relationship({ ref: "Equipment.sources", many: true }),
  },
  
});