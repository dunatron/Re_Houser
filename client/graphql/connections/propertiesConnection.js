import gql from 'graphql-tag';
import { PropertyInfoFragment } from '../fragments/propertyInfo';

/**
 * The connection using ...propertyInfo is going to be too heavy imo
 */
const PROPERTIES_CONNECTION_QUERY = gql`
  query PROPERTIES_CONNECTION_QUERY(
    $where: PropertyWhereInput
    $orderBy: PropertyOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    propertiesConnection(
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
          ...propertyInfo
        }
      }
    }
  }
  ${PropertyInfoFragment}
`;
export { PROPERTIES_CONNECTION_QUERY };
