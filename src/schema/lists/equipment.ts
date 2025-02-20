import type { Lists } from ".keystone/types";
import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { checkbox, float, integer, relationship, select, text } from "@keystone-6/core/fields";
//import { Rating } from "constants/validationRegex";
import { ChassisTypes, EngineTechs, EngineTypes, GearTypes, GyroTypes, MotiveTypes, Scales, TechBase } from "../../constants/selectOptions";




export const Equipment: Exclude<Lists["Equipment"], undefined> = list({
  access: allowAll,
  //graphQL was throwing a fit about 'Equipment'; possibly because English is dumb and equipment is both singular and plural.
  graphql:{plural: "Equipments"},

  // this is the fields for our Equipment list
  fields: {
    // --- BASIC METADATA --- ///
    name: text({
      validation: {
        isRequired: true
      }
    }),
    nameClan: text({
      db: {
        isNullable:true,
      },
      defaultValue: null
    }),
    //TODO: source
    official: checkbox({
      ui:{description: "Is this from an official FASA/Catalyst source?"}
    }),
    canon: checkbox({
      ui:{description: "Is this considered canon and non-apocryphal?"}
    }),
    sources: relationship({
      ref: "Source.equipments",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: [ "name" ],
        linkToItem: true,
        inlineConnect: true,
      },
    }),
    techBase: select({
      type: "enum",
      options: TechBase
    }),
    scale: select({
      type: "enum",
      options: Scales
    }),
    cost: integer({
      db: {
        isNullable:true,
      },
    }),
    bv: integer({
      db: {
        isNullable:true,
      },
      label:"BV"
    }),

    // --- Classification Data --- //
    chassisType: select({
      type: "enum",
      options: ChassisTypes,
      db:{isNullable: true}
    }),
    motiveType: select({
      type: "enum",
      options: MotiveTypes,
      db:{isNullable: true}
    }),
    gearType: select({
      type: "enum",
      options: GearTypes,
      db:{isNullable: true}
    }),
    omni: checkbox(),
    atmospheric: checkbox(),

    // --- Capacity Data --- //
    maxWeight: float({
      db: {isNullable: true},
    }),
    slotCapacity: integer({
      db: {isNullable: true},
    }),
    
    // --- Weight and Slot Data --- //
    weight: float({
      db: {isNullable: true},
    }),
    criticalSlots: integer({
      db: {isNullable: true},
    }),
    weightPerPoint: float({
      db: {isNullable: true},
    }),
    weightFactor: float({
      db: {isNullable: true},
      ui: {
        description: "Percentage Multiplier: 50% = 0.5"
      }
    }),
    structureFactor: float({
      db: {isNullable: true},
      ui: {
        description: "Percentage Multiplier: 50% = 0.5"
      }
    }),
    variableWeight: text({
      db: {isNullable: true}
    }),
    variableCrits: text({
      db: {isNullable: true}
    }),
    variableDamage: text({
      db: {isNullable: true}
    }),

    // --- WEAPON DATA --- //
    damage: float({
      db: {isNullable: true},
    }),
    heat: integer({
      db: {isNullable: true},
    }),
    rangeMin: integer({
      db: {isNullable: true},
    }),
    rangeShort: integer({
      db: {isNullable: true},
    }),
    rangeMed: integer({
      db: {isNullable: true},
    }),
    rangeLong: integer({
      db: {isNullable: true},
    }),
    shots: integer({
      db: {isNullable: true},
    }),

    // --- ENGINE & GYRO DATA --- //
    rating: integer({
      db: {isNullable: true},
    }),
    engineType: select({
      type: "enum",
      options: EngineTypes,
      db:{isNullable: true}
    }),
    engineTech: select({
      type: "enum",
      options: EngineTechs,
      db:{isNullable: true}
    }),
    gyroType: select({
      type: "enum",
      options: GyroTypes,
      db:{isNullable: true}
    }),

    // --- PRODUCTION DATA --- //
    prototypePhase: integer(),
    productionPhase: integer(),
    commonPhase: integer(),
    extinctPhase: integer(),
    reintroPhase: integer(),
    // By default, all equipment are unavailable.
    availabilityRating: text({
      validation: {
        match: {
          regex: RegExp("[A-FX]-[A-FX]\/[A-FX]\/[A-FX]\/[A-FX]"),
          explanation: "Must follow X-X/X/X/X format. Search 'BattleTech availability ratings' for details."
        }
      },
      defaultValue: "X-X/X/X/X"
    }),

    // --- RELATED EQUIPMENT FROM OTHER SOURCES --- //
    // Intended to allow game mods or fan-sources to reference that their version is a change from the source
    // i.e. HBS BattleTech (2018) has specific versions of Medium Lasers for various manufacturers with
    // differing stats but are, ultimately, abstracted in classic BattleTech as simply Medium Lasers

    alternateEquipment: relationship({
      ref: "Equipment",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: [ "name" ],
        linkToItem: true,
        inlineConnect: true,
      },
    })

  },
});