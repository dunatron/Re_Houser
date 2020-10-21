import gql from 'graphql-tag';

import * as fragments from '../fragments';

const USER_SUBSCRIPTION = gql`
  subscription userSub($where: UserSubscriptionWhereInput) {
    userSub(where: $where) {
      node {
        ...userInfo
      }
    }
  }
  ${fragments.UserInfoFragment}
`;

export { USER_SUBSCRIPTION };

// const USER_SUBSCRIPTION = gql`
//   subscription($where: UserSubscriptionWhereInput) {
//     userSub(where: $where) {
//       node {
//         id
//         firstName
//       }
//     }
//   }
// `;

// export { USER_SUBSCRIPTION };
