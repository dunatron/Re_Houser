import gql from 'graphql-tag';
import * as fragments from '../fragments';

const MESSAGES_QUERY = gql`
  query MESSAGES_QUERY(
    $where: MessageWhereInput
    $orderBy: MessageOrderByInput
    $skip: Int
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    messages(
      where: $where
      orderBy: $orderBy
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...Message
    }
  }
  ${fragments.message}
`;
export { MESSAGES_QUERY };

// {
//   "orderBy": "createdAt_DESC",
//   "first": 2,
//   "skip": 1
// }
