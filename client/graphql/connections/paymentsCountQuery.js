import gql from 'graphql-tag';

const PAYMENTS_COUNT_QUERY = gql`
  query PAYMENTS_COUNT_QUERY(
    $where: PaymentWhereInput
    $orderBy: PaymentOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    paymentsConnection(
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
export { PAYMENTS_COUNT_QUERY };
