import { useState } from "react"
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks"
import { toast } from "react-toastify"
import { RENTAL_APPLICATION_SUBSCRIPTION } from "../../subscriptions/RentalApplicationSub"
import ApplicationCard from "../PropertyDetails/ApplicationCard"

/**
 *
 * @param {*} param0
 * THE SMART MONEY SAYS: implement these quickly everywhere by providing the simple skeleton.
 * collect, number of updates, implement refreshQueries || provide a child component
 * child component i.e instead of <ApplicationCard /> use <Component component={child} {...props} />
 * child component i.e instead of <ApplicationCard /> use <Component component={child} {...props} />
 * Na too much. This is the explicit phase. Compiose heaps of these guys and pass in dumb components, that can do smart things wityhin reason.
 *
 */
const AdminAlertNewRentalApplicationSub = () => {
  const [newObjects, setNewObjects] = useState([])
  const [updateCount, setUpdateCount] = useState(0)
  const { loading, data, error } = useSubscription(
    RENTAL_APPLICATION_SUBSCRIPTION,
    {
      suspend: false,
      variables: {
        where: {
          mutation_in: "UPDATED",
          // node: {
          //   stage_in: ["PENDING", "INITIALIZING", "DENIED", "ACCEPTED"],
          //   // id_in: applicationIds,
          //   property: {
          //     id: property.id,
          //   },
          // },
        },
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        console.log("subscriptionData => ", subscriptionData)
        setUpdateCount(updateCount + 1)
        toast.success(<p>New Pending Rental Application for</p>)
      },
    }
  )
  console.group("AdminAlertNewRentalApplicationSub")
  console.log("loading => ", loading)
  console.log("data => ", data)
  console.log("error => ", error)
  console.groupEnd()
  if (loading) return null
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for updates
      </div>
    )
  // they are just aledrts find the best way to return nothing
  return null
}

export default AdminAlertNewRentalApplicationSub
