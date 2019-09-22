import { Query } from "react-apollo"
import { CURRENT_USER_QUERY } from "../User/index"
import Loader from "../Loader"

const WithUser = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading)
        return (
          <div>
            Personalizing application
            <Loader loading={loading} text="Fetching your data" />
          </div>
        )
      return props.children
    }}
  </Query>
)

export default WithUser
