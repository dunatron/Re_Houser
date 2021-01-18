import gql from 'graphql-tag';

const INSPECTIONS_COUNT_QUERY = gql`
  query INSPECTIONS_COUNT_QUERY(
    $where: InspectionWhereInput
    $orderBy: InspectionOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    inspectionsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      aggregate {
        count
      }
    }
  }
`;
export { INSPECTIONS_COUNT_QUERY };
