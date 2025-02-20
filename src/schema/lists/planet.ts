import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, text } from "@keystone-6/core/fields";

  // TODO: Reconsider how to establish ownership of a planet for a period of time; currently only shows ID of Ownership which is not useful.

export const Planet: Exclude<Lists["Planet"], undefined> = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Planet list
  fields: {
    name: text({ validation: { isRequired: true } }),
    fullName: text({ validation: { isRequired: true } }),

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields

    // with this field, you can add some Tags to Planets
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: "Tag.planets",

      // a Planet can have many Tags, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: [ "name" ],
        inlineEdit: { fields: [ "name" ] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: [ "name" ] },
      },
    }),
    manufacturers: relationship({ ref: "Manufacturer.planets", many: true }),
    ownership: relationship({
      ref: "Ownership.planet",
      many: false
  })
  },
});