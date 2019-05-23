import gql from "graphql-tag"

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
`

export { ACCEPT_RENTAL_APPLICATION_MUTATION }
