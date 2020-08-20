import gql from 'graphql-tag';

const INSPECTIONS_CONNECTION_QUERY = gql`
  query INSPECTIONS_CONNECTION_QUERY(
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
      pageInfo {
        hasNextPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          date
          completed
        }
      }
    }
  }
`;
export { INSPECTIONS_CONNECTION_QUERY };
