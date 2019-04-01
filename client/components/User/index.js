import { Query } from "react-apollo"
import gql from "graphql-tag"
import PropTypes from "prop-types"
import { CURRENT_USER_QUERY } from "../../query/index"

// const CURRENT_USER_QUERY = gql`
//   query {
//     me {
//       id
//       email
//       firstName
//       lastName
//       phone
//       permissions
//       photoIdentification {
//         createdAt
//         updatedAt
//         filename
//         mimetype
//         encoding
//         url
//       }
//       identificationNumber
//       emergencyContactName
//       emergencyContactNumber
//       emergencyContactEmail
//       referee1Name
//       referee1Phone
//       referee1Email
//       referee2Name
//       referee2Phone
//       referee2Email
//     }
//   }
// `

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

User.propTypes = {
  children: PropTypes.func.isRequired,
}

export default User
export { CURRENT_USER_QUERY }
