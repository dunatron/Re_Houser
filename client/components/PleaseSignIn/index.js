import { Query } from "react-apollo"
import { CURRENT_USER_QUERY } from "../User/index"
import Signin from "../Signin/index"

const Message = ({ message }) => {
  if (message) return <p>{message}</p>
  return <p>Please Sign In before Continuing</p>
}

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.me) {
        return (
          <div>
            <Message message={props.message} />
            <Signin />
          </div>
        )
      }
      return props.children
    }}
  </Query>
)

export default PleaseSignIn
