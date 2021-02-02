import gql from 'graphql-tag';
import { PrivateUserInfoFragment } from '../fragments/privateUserInfo';

const PRIVATE_USER_QUERY = gql`
  query PRIVATE_USER_QUERY($where: UserWhereUniqueInput!) {
    user(where: $where) {
      ...privateUserInfo
    }
  }
  ${PrivateUserInfoFragment}
`;

export { PRIVATE_USER_QUERY };
export default PRIVATE_USER_QUERY;
