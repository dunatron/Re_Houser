import gql from 'graphql-tag';

const DECLINE_RENTAL_APPLICATION_MUTATION = gql`
  mutation DECLINE_RENTAL_APPLICATION_MUTATION($applicationId: ID!) {
    declineRentalApplication(applicationId: $applicationId) {
      message
    }
  }
`;

export { DECLINE_RENTAL_APPLICATION_MUTATION };
