import gql from 'graphql-tag';
import { UserInfoFragment } from '../fragments/userInfo';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      ...userInfo
    }
  }
  ${UserInfoFragment}
`;

export { CURRENT_USER_QUERY };
