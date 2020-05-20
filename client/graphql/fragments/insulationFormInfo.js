import gql from 'graphql-tag';

const InsulationFormInfoFragment = gql`
  fragment insulationFormInfo on InsulationForm {
    id
    meetsMinCeilingReq
    meetsMinCeilingReqReason
    meetsMinUnderfloorReq
    meetsMinUnderfloorReqReason
    ceilingCoverage
    ceilingCoverageReason
    ceilingTypes
    ceilingTypesOther
    ceilingBulkRValue
    ceilingMinimumThickness
    ceilingInsulationInstallDate
    ceilingConditions
    ceilingConditionReason
    underfloorCoverage
    underfloorCoverageReason
    underfloorTypes
    underfloorTypesOther
    underfloorBulkRValue
    underfloorMinimumThickness
    underfloorInsulationInstallDate
    underfloorConditions
    underfloorConditionReason
    wallCoverage
    wallCoverageReason
    supplementaryInfo
    lastUpgradedDate
    profesionallyAssessedDate
    declarationCheck
    healthyHomesStandardStatement
  }
`;

export { InsulationFormInfoFragment };
export default InsulationFormInfoFragment;
