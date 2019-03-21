import gql from "graphql-tag"

const CREATE_RENTAL_APPLICATION = gql`
  mutation createRentalApplication($data: RentalApplicationCreateInput!) {
    createRentalApplication(data: $data) {
      id
      stage
      applicants {
        id
        approved
        user {
          id
          firstName
          lastName
        }
      }
      property {
        id
        location
      }
      owner {
        id
      }
    }
  }
`

export { CREATE_RENTAL_APPLICATION }
