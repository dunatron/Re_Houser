import gql from 'graphql-tag';
import { ChargeInfoFragment } from '../fragments/index';

const CHARGES_CONNECTION_QUERY = gql`
  query CHARGES_CONNECTION_QUERY(
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
      pageInfo {
        hasNextPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...chargeInfo
        }
      }
    }
  }
  ${ChargeInfoFragment}
`;
export { CHARGES_CONNECTION_QUERY };
