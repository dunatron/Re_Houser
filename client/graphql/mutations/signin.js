import gql from 'graphql-tag';
import * as fragments from '../fragments';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ...userInfo
    }
  }
  ${fragments.UserInfoFragment}
`;

export { SIGNIN_MUTATION };
