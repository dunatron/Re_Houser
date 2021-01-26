import gql from 'graphql-tag';
import { PublicUserInfoFragment } from '../fragments/publicUserInfo';

const PUBLIC_USER_QUERY = gql`
  query CURRENT_USER_QUERY($where: UserWhereUniqueInput!) {
    user(where: $where) {
      ...publicUserInfo
    }
  }
  ${PublicUserInfoFragment}
`;

export { PUBLIC_USER_QUERY };
export default PUBLIC_USER_QUERY;
