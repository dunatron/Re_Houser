import gql from "graphql-tag"

const CREATE_RENTAL_APPLICATION = gql`
  mutation createRentalApplication($data: RentalApplicationCreateInput!) {
    createRentalApplication(data: $data) {
      id
      stage
      visibility
      finalised
      applicants {
        id
        approved
        completed
        user {
          id
          firstName
          lastName
        }
        email
        firstName
      }
      property {
        id
        location
      }
      owner {
        id
        email
        firstName
        lastName
      }
    }
  }
`

export { CREATE_RENTAL_APPLICATION }
