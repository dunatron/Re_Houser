import gql from 'graphql-tag';
import * as fragments from '../fragments';

const CHAT_SUBSCRIPTION = gql`
  subscription chatSub($where: ChatSubscriptionWhereInput) {
    chatSub(where: $where) {
      mutation
      previousValues {
        id
      }
      updatedFields
      node {
        ...Chat
      }
    }
  }
  ${fragments.chat}
`;

export { CHAT_SUBSCRIPTION };

// const CHAT_SUBSCRIPTION = gql`
//   subscription chatSub($where: ChatSubscriptionWhereInput) {
//     chatSub(where: $where) {
//       mutation
//       previousValues {
//         id
//       }
//       updatedFields
//       node {
//         ...Chat
//       }
//     }
//   }
//   fragment Chat on Chat {
//     id
//     type
//     name
//     participants {
//       id
//       firstName
//       lastName
//       profilePhoto {
//         filename
//         url
//       }
//     }
//   }
// `;

// export { CHAT_SUBSCRIPTION };
