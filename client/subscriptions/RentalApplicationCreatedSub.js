import gql from "graphql-tag"

const RENTAL_APPLICATION_CREATED_SUBSCRIPTION = gql`
  subscription {
    rentalApplicationCreatedSub {
      node {
        id
        title
        stage
        visibility
      }
    }
  }
`

export { RENTAL_APPLICATION_CREATED_SUBSCRIPTION }
