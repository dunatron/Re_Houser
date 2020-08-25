import gql from 'graphql-tag';

const CREATE_CONTACT_FORM_MUTATION = gql`
  mutation CREATE_CONTACT_FORM_MUTATION(
    $firstName: String!
    $email: String!
    $message: String!
    $captchaToken: String!
  ) {
    createContactForm(
      firstName: $firstName
      email: $email
      message: $message
      captchaToken: $captchaToken
    ) {
      message
    }
  }
`;
export { CREATE_CONTACT_FORM_MUTATION };
