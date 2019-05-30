import { useState } from "react"
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks"
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationUpdatedSub"
import ApplicationCard from "../PropertyDetails/ApplicationCard"
import { openSnackbar } from "../Notifier/index"

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
const PropertyPendingRentalApplicationsSub = ({ property }) => {
  const [newObjects, setNewObjects] = useState([])
  const [updateCount, setUpdateCount] = useState(0)
  const { loading, data, error } = useSubscription(
    RENTAL_APPLICATION_UPDATED_SUBSCRIPTION,
    {
      suspend: false,
      variables: {
        where: {
          mutation_in: "UPDATED",
          node: {
            stage_in: ["PENDING", "INITIALIZING", "DENIED", "ACCEPTED"],
            // id_in: applicationIds,
            property: {
              id: property.id,
            },
          },
        },
      },
      onSubscriptionData: ({ client, subscriptionData }) => {
        setUpdateCount(updateCount + 1)
        setNewObjects(
          newObjects.concat(
            subscriptionData.data.rentalApplicationUpdateSub.node
          )
        )
        openSnackbar({
          message: `<h3>New Pending Rental Application for ${
            property.location
          }</h3>`,
          duration: 6000,
          type: "success",
        })
      },
    }
  )
  if (loading) return null
  if (error)
    return (
      <div>
        No Websocket connection. You will need to manually refresh for updates
      </div>
    )
  return (
    <div>
      You have {updateCount} New Applications{" "}
      <button onClick={() => alert("refresh queries")}>refresh</button>
      {newObjects.map(newObj => (
        <ApplicationCard application={newObj} property={property} />
      ))}
      <hr />
    </div>
  )
}

export default PropertyPendingRentalApplicationsSub
