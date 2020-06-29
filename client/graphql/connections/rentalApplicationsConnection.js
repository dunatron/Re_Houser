import gql from 'graphql-tag';
import { RentalApplicationInfoFragment } from '../fragments/rentalApplicationInfo';

const RENTAL_APPLICATIONS_CONNECTION_QUERY = gql`
  query RENTAL_APPLICATIONS_CONNECTION_QUERY(
    $where: RentalApplicationWhereInput
    $orderBy: RentalApplicationOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    rentalApplicationsConnection(
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
          ...rentalApplicationInfo
        }
      }
    }
  }
  ${RentalApplicationInfoFragment}
`;
export { RENTAL_APPLICATIONS_CONNECTION_QUERY };
