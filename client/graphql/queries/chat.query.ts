import gql from 'graphql-tag';
import * as fragments from '../fragments';

const CHAT_QUERY = gql`
  query CHAT_QUERY($where: ChatWhereUniqueInput!) {
    chat(where: $where) {
      ...Chat
    }
  }
  ${fragments.chat}
`;
export { CHAT_QUERY };
