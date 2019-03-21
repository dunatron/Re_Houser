import gql from "graphql-tag"

const CREATE_RENTAL_APPLICATION = gql`
  mutation createRentalApplication($data: RentalApplicationCreateInput!) {
    createRentalApplication(data: $data) {
      id
      stage
      # members {
      #   id
      #   firstName
      # }
      property {
        id
        location
      }
    }
  }
`

export { CREATE_RENTAL_APPLICATION }
