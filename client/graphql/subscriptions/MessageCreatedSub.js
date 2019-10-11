import gql from 'graphql-tag';
import * as fragments from '../fragments';

// const MESSAGE_CREATED_SUBSCRIPTION = gql`
//   subscription($where: MessageSubscriptionWhereInput) {
//     messageSub(where: $where) {
//       node {
//         ...Message
//       }
//     }
//   }
//   ${fragments.message}
// `;

// export { MESSAGE_CREATED_SUBSCRIPTION };

const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription($where: MessageSubscriptionWhereInput) {
    messageSub(where: $where) {
      mutation
      node {
        id
        createdAt
        content
        isMine
        chat {
          id
        }
        sender {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export { MESSAGE_CREATED_SUBSCRIPTION };
