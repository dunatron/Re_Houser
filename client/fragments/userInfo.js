import gql from "graphql-tag"
const UserInfoFragment = gql`
  fragment userInfo on User {
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
`

export { UserInfoFragment }
