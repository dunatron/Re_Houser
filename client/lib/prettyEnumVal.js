/**
 *
 * format enum values e.g
 * HOUSE => House
 * WALL_HEATER => Wall heater
 * HOB_OR_STOVE => Hob / Stove
 * HOB_OR_STOVE => Hob or stove
 */
const prettyEnumVal = val => {
  return val.toLowerCase();
};

export default prettyEnumVal;
