import gql from 'graphql-tag';

const INSULATION_FORM_QUERY = gql`
  query INSULATION_FORM_QUERY($where: InsulationFormWhereUniqueInput!) {
    insulationForm(where: $where) {
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
  }
`;

export { INSULATION_FORM_QUERY };
