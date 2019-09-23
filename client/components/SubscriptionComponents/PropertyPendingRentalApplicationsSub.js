import { useState } from "react"
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks"
import { RENTAL_APPLICATION_UPDATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationUpdatedSub"
import ApplicationCard from "../PropertyDetails/ApplicationCard"
import { ToastContainer, toast } from "react-toastify"

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
        toast(
          <div>
            <h1>Property Subscription</h1>
            <p>
              PropertyPendingRentalApplicationsSub iS Subscribed chefck boy and
              Css
            </p>
          </div>
        )
      },
    }
  )
  if (loading) return null
  if (error)
    toast(
      <div>
        <p>
          No Websocket connection. You will need to manually refresh for updates
        </p>
      </div>
    )
  if (!error)
    toast(
      <div>
        <p>Subbed to {property.location}</p>
      </div>
    )
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