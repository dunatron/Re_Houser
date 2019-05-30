import AdminAlertNewRentalApplicationSub from "../components/SubscriptionComponents/AdminAlertNewRentalApplicationSub"
import User from "../components/User/index"
/**
 * I am Simply a wrapper for all alerts admin
 * // Maybe 1 small advancement we can make wth alerts is a simple where?
 * // We know what they are essentially, so just be smart with the where
 */
const AdminAlertsContainer = () => {
  return (
    <>
      <User>
        {props => {
          console.log("USER PROPS FOR AdminAlertsContainer => ", props)
          const { me } = props.data
          return (
            <div>
              <h1>User DStufff</h1>
            </div>
          )
        }}
      </User>
      <User>
        {({ data }) => {
          const me = data ? data.me : null
          return (
            <AdminAlertNewRentalApplicationSub />
          )
        }}
      </User>
      
    </>
  )
}

export default AdminAlertsContainer
