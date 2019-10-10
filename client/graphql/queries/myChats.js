import gql from 'graphql-tag';
import * as fragments from '../fragments';

const MY_CHATS_QUERY = gql`
  query MY_CHATS_QUERY(
    $where: ChatWhereInput
    $orderBy: ChatOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    chatsConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...Chat
        }
        cursor
      }
      aggregate {
        count
      }
    }
  }
  ${fragments.chat}
`;
export { MY_CHATS_QUERY };
