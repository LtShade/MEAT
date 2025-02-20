import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";



export const Manufacturer: Exclude<Lists["Manufacturer"], undefined> = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Manufacturer list
  fields: {
    name: text({ validation: { isRequired: true } }),

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields

    // with this field, you can add some Planets to Manufacturers
    planets: relationship({
      ref: "Planet.manufacturers",
      // a Manufacturer can have many Planets, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: [ "name" ],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    //Needs to point to EQUIPMENT not EquipmentDatum
    //equipment: relationship({ ref: "EquipmentDatum.manufacturers", many: true }),
  },
});