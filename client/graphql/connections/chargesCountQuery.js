import gql from 'graphql-tag';

const CHARGES_COUNT_QUERY = gql`
  query CHARGES_COUNT_QUERY(
    $where: ChargeWhereInput
    $orderBy: ChargeOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chargesConnection(
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
export { CHARGES_COUNT_QUERY };
