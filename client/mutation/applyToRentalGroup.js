import gql from "graphql-tag"

const APPLY_TO_RENTAL_GROUP_APPLICATION = gql`
  mutation applyToRentalGroup($data: RentalGroupApplicantCreateInput!) {
    applyToRentalGroup(data: $data) {
      id
      user {
        id
      }
      approved
      application {
        id
      }
    }
  }
`

export { APPLY_TO_RENTAL_GROUP_APPLICATION }
