import type { Lists } from ".keystone/types";
import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, calendarDay, virtual } from "@keystone-6/core/fields";

export const Ownership: Exclude<Lists["Ownership"], undefined> = list({
  // Ownership is a concept of who owns something and when they did

  access: allowAll,

  ui:{
    labelField: "label"
  },

  // this is the fields for our Ownership list
  fields: {
    startDate: calendarDay(),
    endDate: calendarDay(),
    faction: relationship({ 
      ref: "Faction.ownerships", 
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: [ "name" ],
        linkToItem: true,
        inlineConnect: true,
      },
     }),
     planet: relationship({ ref: "Planet.ownership", many: false }),
     //Construct a human-readable label for admin UI rather than rely on UUID
     label: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context){
          //Query faction based on current related ID
          const { faction } = await context.query.Ownership.findOne({
            where: {id: item.id?.toString()},
            query: "faction { name }"
          });
          //Query planet based on current related ID
          const { planet } = await context.query.Ownership.findOne({
            where: {id: item.id?.toString()},
            query: "planet { name }"
          });
          //Make some nicer strings
          const shortStartDate = `${item.startDate?.getMonth()}/${item.startDate?.getFullYear()}`
          const shortEndDate = `${item.endDate?.getMonth()}/${item.endDate?.getFullYear()}`
          const planetName = planet ? planet.name : "Unassigned"
          const labelName = `${planetName} | ${faction.name} | ${shortStartDate} to ${shortEndDate}`
          return faction && labelName
        }
      })
    }),
  },
});