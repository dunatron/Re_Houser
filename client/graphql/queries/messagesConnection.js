import gql from 'graphql-tag';
import * as fragments from '../fragments';

const MESSAGES_CONNECTION_QUERY = gql`
  query MESSAGES_CONNECTION_QUERY(
    $where: MessageWhereInput
    $orderBy: MessageOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    messagesConnection(
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
          ...Message
        }
      }
    }
  }
  ${fragments.message}
`;
export { MESSAGES_CONNECTION_QUERY };
