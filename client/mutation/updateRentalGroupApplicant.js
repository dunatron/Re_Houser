import gql from "graphql-tag"

const UPDATE_RENTAL_GROUP_APPLICANT_MUTATION = gql`
  mutation updateRentalGroupApplicant(
    $data: RentalGroupApplicantUpdateInput!
    $where: RentalGroupApplicantWhereUniqueInput!
  ) {
    updateRentalGroupApplicant(data: $data, where: $where) {
      id
      approved
      completed
      firstName
      lastName
      email
    }
  }
`

export { UPDATE_RENTAL_GROUP_APPLICANT_MUTATION }
