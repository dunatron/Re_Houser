import gql from 'graphql-tag';
const RentalGroupApplicantInfoFragment = gql`
  fragment rentalGroupApplicantInfo on RentalGroupApplicant {
    id
    approved
    completed
    email
    firstName
    lastName
    user {
      id
      firstName
      lastName
    }
  }
`;

export { RentalGroupApplicantInfoFragment };
