import gql from 'graphql-tag';
import * as fragments from '../fragments';

const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($email: String!, $token: String!) {
    confirmEmail(email: $email, token: $token) {
      ...userInfo
    }
  }
  ${fragments.UserInfoFragment}
`;

export { CONFIRM_EMAIL_MUTATION };
