import gql from "graphql-tag"
const RentalApplicationInfoFragment = gql`
  fragment rentalApplicationInfo on RentalApplication {
    id
    visibility
    stage
    finalised
    # applicants {
    #   ...RentalGroupApplicantData
    # }
    id
    stage
    owner {
      id
    }
    applicants {
      id
      approved
      completed
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export { RentalApplicationInfoFragment }
