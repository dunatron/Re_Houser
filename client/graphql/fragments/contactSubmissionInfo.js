import gql from 'graphql-tag';

const ContactSubmissionInfoFragment = gql`
  fragment contactSubmissionInfo on ContactSubmission {
    id
    updatedAt
    createdAt
    firstName
    lastName
    phone
    email
    seen
    notes
    message
  }
`;

export { ContactSubmissionInfoFragment };
export default ContactSubmissionInfoFragment;
