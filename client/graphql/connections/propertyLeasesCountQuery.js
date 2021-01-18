import gql from 'graphql-tag';

const PROPERTY_LEASES_COUNT_QUERY = gql`
  query PROPERTY_LEASES_COUNT_QUERY(
    $where: PropertyLeaseWhereInput
    $orderBy: PropertyLeaseOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    propertyLeasesConnection(
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
export { PROPERTY_LEASES_COUNT_QUERY };
