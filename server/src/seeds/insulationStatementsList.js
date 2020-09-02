const moment = require("moment");

const insulationStatement1 = {
  meetsMinCeilingReq: true,
  meetsMinCeilingReqReason: "",
  meetsMinUnderfloorReq: false,
  meetsMinUnderfloorReqReason: "Well too hard to reach it",
  ceilingCoverage: "COMPLETE",
  ceilingCoverageReason: "",
  ceilingTypes: {
    set: ["SEGMENTS_BLANKETS", "LOOSE_FILL"],
  },
  ceilingTypesOther: "",
  ceilingBulkRValue: "Bulk R val",
  ceilingMinimumThickness: "3 inch girth",
  ceilingInsulationInstallDate: moment()
    .subtract(3, "year")
    .format(),
  ceilingConditions: {
    set: ["REASONABLE", "NO_GAPS"],
  },
  ceilingConditionReason: "",
  underfloorCoverage: "COMPLETE",
  underfloorCoverageReason: "",
  underfloorTypes: {
    set: ["SEGMENTS_BLANKETS", "POLYSTYRENE", "FOIL", "BULK_WITH_FOIL_LINING"],
  },
  underfloorTypesOther: "",
  underfloorBulkRValue: "",
  underfloorMinimumThickness: "",
  underfloorInsulationInstallDate: moment()
    .subtract(3, "year")
    .format(),
  underfloorConditions: {
    set: ["NOT_REASONABLE"],
  },
  underfloorConditionReason: "I couldnt be fucked, I am bad landlord",
  wallCoverage: "PARTIAL",
  wallCoverageReason: "I got it like oh ew oh ew wee wee whoa",
  supplementaryInfo:
    "here are my thoughts and if its too nasty spit it back at me",
  lastUpgradedDate: moment()
    .subtract(3, "month")
    .format(),
  profesionallyAssessedDate: moment()
    .subtract(1, "year")
    .format(),
  declarationCheck: true,
  healthyHomesStandardStatement: "ALREADY_COMPLYING",
};

const insulationStatement2 = {
  meetsMinCeilingReq: true,
  meetsMinCeilingReqReason: "",
  meetsMinUnderfloorReq: false,
  meetsMinUnderfloorReqReason: "Well too hard to reach it",
  ceilingCoverage: "COMPLETE",
  ceilingCoverageReason: "",
  ceilingTypes: {
    set: ["SEGMENTS_BLANKETS", "LOOSE_FILL"],
  },
  ceilingTypesOther: "",
  ceilingBulkRValue: "Bulk R val",
  ceilingMinimumThickness: "3 inch girth",
  ceilingInsulationInstallDate: moment()
    .subtract(3, "year")
    .format(),
  ceilingConditions: {
    set: ["REASONABLE", "NO_GAPS"],
  },
  ceilingConditionReason: "",
  underfloorCoverage: "COMPLETE",
  underfloorCoverageReason: "",
  underfloorTypes: {
    set: ["SEGMENTS_BLANKETS", "POLYSTYRENE", "FOIL", "BULK_WITH_FOIL_LINING"],
  },
  underfloorTypesOther: "",
  underfloorBulkRValue: "",
  underfloorMinimumThickness: "",
  underfloorInsulationInstallDate: moment()
    .subtract(3, "year")
    .format(),
  underfloorConditions: {
    set: ["NOT_REASONABLE"],
  },
  underfloorConditionReason: "I couldnt be fucked, I am bad landlord",
  wallCoverage: "PARTIAL",
  wallCoverageReason: "I got it like oh ew oh ew wee wee whoa",
  supplementaryInfo:
    "here are my thoughts and if its too nasty spit it back at me",
  lastUpgradedDate: moment()
    .subtract(3, "month")
    .format(),
  profesionallyAssessedDate: moment()
    .subtract(1, "year")
    .format(),
  declarationCheck: true,
  healthyHomesStandardStatement: "ALREADY_COMPLYING",
};

const insulationStatementsList = [insulationStatement1, insulationStatement2];

module.exports = process.env.STAGE === "dev" ? insulationStatementsList : [];
// module.exports = insulationStatementsList;
