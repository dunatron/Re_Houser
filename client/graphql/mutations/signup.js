import gql from 'graphql-tag';
import * as fragments from '../fragments';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $password: String!
  ) {
    signup(
      email: $email
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      password: $password
    ) {
      ...userInfo
    }
  }
  ${fragments.UserInfoFragment}
`;

export { SIGNUP_MUTATION };