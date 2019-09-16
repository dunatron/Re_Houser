import { Query } from "react-apollo"
import { CURRENT_USER_QUERY } from "../User/index"

const WithUser = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      console.log("User data => ", data)
      if (loading) return <p>Fetching User data...</p>
      return props.children
    }}
  </Query>
)

export default WithUser
