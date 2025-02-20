import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";



export const Faction: Exclude<Lists["Faction"], undefined> = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  ui: {
    isHidden: false,
  },

  // this is the fields for our Faction list
  fields: {
    name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
    ownerships: relationship({ 
      ref: "Ownership.faction", 
      many: true, 
    })

  },
});