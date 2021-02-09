import gql from 'graphql-tag';

const FOREIGN_LINKS_COUNT_QUERY = gql`
  query FOREIGN_LINKS_COUNT_QUERY(
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
    }
  }
`;
export { FOREIGN_LINKS_COUNT_QUERY };
