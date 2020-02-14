import gql from 'graphql-tag';

const DELETE_USER_ACCOUNT = gql`
  mutation DELETE_USER_ACCOUNT($email: String!, $password: String!) {
    deleteAccount(email: $email, password: $password) {
      message
      data
    }
  } 
`;

export { DELETE_USER_ACCOUNT };

// const DELETE_USER_ACCOUNT = gql`
//   mutation DELETE_USER_ACCOUNT(
//     email: email, password: $password
//   ) {
//     deleteAccount(
//       email: $email
//       firstName: $firstName
//       lastName: $lastName
//       phone: $phone
//       password: $password
//       captchaToken: $captchaToken
//     ) {
//       ...userInfo
//     }
//   }
//   ${fragments.UserInfoFragment}
// `;

// export { DELETE_USER_ACCOUNT };
