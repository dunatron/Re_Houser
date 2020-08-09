// resendConfirmEmail
import gql from 'graphql-tag';

const RESEND_CONFIRM_EMAIL_MUTATION = gql`
  mutation RESEND_CONFIRM_EMAIL_MUTATION($email: String!) {
    resendConfirmEmail(email: $email) {
      id
    }
  }
`;

export { RESEND_CONFIRM_EMAIL_MUTATION };
