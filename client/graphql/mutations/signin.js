import gql from 'graphql-tag';
import * as fragments from '../fragments';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
    $captchaToken: String!
  ) {
    signin(email: $email, password: $password, captchaToken: $captchaToken) {
      ...userInfo
    }
  }
  ${fragments.UserInfoFragment}
`;

export { SIGNIN_MUTATION };
