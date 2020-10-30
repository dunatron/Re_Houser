import gql from 'graphql-tag';

import * as fragments from '../fragments';

const USER_SUBSCRIPTION = gql`
  subscription userSub($where: UserSubscriptionWhereInput) {
    userSub(where: $where) {
      node {
        id
        ...userInfo
      }
    }
  }
  ${fragments.UserInfoFragment}
`;

export { USER_SUBSCRIPTION };
