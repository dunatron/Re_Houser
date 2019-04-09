import gql from "graphql-tag"

const APPLY_TO_RENTAL_GROUP_APPLICATION = gql`
  mutation applyToRentalGroup($data: RentalGroupApplicantCreateInput!) {
    applyToRentalGroup(data: $data) {
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

export { APPLY_TO_RENTAL_GROUP_APPLICATION }
