

import gql from 'graphql-tag';
import { PropertyLeaseInfoFragment } from '../fragments/propertyLeaseInfo';

const PROPERTY_LEASES_CONNECTION_QUERY = gql`
  query PROPERTY_LEASES_CONNECTION_QUERY(
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
      pageInfo {
        hasNextPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          ...propertyLeaseInfo
        }
      }
    }
  }
  ${PropertyLeaseInfoFragment}
`;
export { PROPERTY_LEASES_CONNECTION_QUERY };