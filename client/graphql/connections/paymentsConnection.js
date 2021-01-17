import gql from 'graphql-tag';
import { PaymentInfoFragment } from '../fragments/index';

const PAYMENTS_CONNECTION_QUERY = gql`
  query PAYMENTS_CONNECTION_QUERY(
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
      pageInfo {
        hasNextPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...paymentInfo
        }
      }
    }
  }
  ${PaymentInfoFragment}
`;
export { PAYMENTS_CONNECTION_QUERY };
