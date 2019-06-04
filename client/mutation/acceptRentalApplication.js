import gql from "graphql-tag";

// Maybe this should do mor ethan return a message.
// If it is being accepted then we are also creating a lease. we could at least return the lease Id so they can go to it and sign etc...
const ACCEPT_RENTAL_APPLICATION_MUTATION = gql`
  mutation ACCEPT_RENTAL_APPLICATION_MUTATION(
    $applicationId: ID!
    $propertyId: ID!
  ) {
    acceptRentalApplication(
      applicationId: $applicationId
      propertyId: $propertyId
    ) {
      message
    }
  }
`;

export { ACCEPT_RENTAL_APPLICATION_MUTATION };
