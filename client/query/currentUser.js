import gql from "graphql-tag"

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      id
      email
      firstName
      lastName
      phone
      permissions
      photoIdentification {
        createdAt
        updatedAt
        filename
        mimetype
        encoding
        url
      }
      identificationNumber
      emergencyContactName
      emergencyContactNumber
      emergencyContactEmail
      referee1Name
      referee1Phone
      referee1Email
      referee2Name
      referee2Phone
      referee2Email
    }
  }
`

export { CURRENT_USER_QUERY }
