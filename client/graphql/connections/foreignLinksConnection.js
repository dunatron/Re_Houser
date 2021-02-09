import gql from 'graphql-tag';
import { ForeignLinkInfoFragment } from '../fragments/foreignLinkInfo';

const FOREIGN_LINKS_CONNECTION_QUERY = gql`
  query FOREIGN_LINKS_CONNECTION_QUERY(
    $where: ForeignLinkWhereInput
    $orderBy: ForeignLinkOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    foreignLinksConnection(
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
          ...foreignLinkInfo
        }
      }
    }
  }
  ${ForeignLinkInfoFragment}
`;
export { FOREIGN_LINKS_CONNECTION_QUERY };
