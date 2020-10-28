// import gql from 'graphql-tag';
import { gql } from '@apollo/client';
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
export default CURRENT_USER_QUERY;
