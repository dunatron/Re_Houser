import gql from 'graphql-tag';
import * as fragments from '../fragments';

const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription messageSub($where: MessageSubscriptionWhereInput) {
    messageSub(where: $where) {
      mutation
      node {
        ...Message
      }
    }
  }
  ${fragments.message}
`;

export { MESSAGE_CREATED_SUBSCRIPTION };
