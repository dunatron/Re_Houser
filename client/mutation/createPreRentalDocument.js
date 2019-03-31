import gql from "graphql-tag"

const CREATE_PRE_RENTAL_DOCUMENT_MUTATION = gql`
  mutation CREATE_PROPERTY_MUTATION($id: ID!) {
    createPreRentalDocument(rentalGroupApplicantId: $id)
  }
`

export { CREATE_PRE_RENTAL_DOCUMENT_MUTATION }
