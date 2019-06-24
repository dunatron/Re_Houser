import React, { Component } from "react"
import ApplicationItem from "./ApplicationItem"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import { useSubscription, useQuery } from "react-apollo-hooks"
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationCreatedSub"

const RentalApplications = props => {
  const { propertyId, property, me } = props
  const applications = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        OR: [
          {
            visibility: "PUBLIC",
          },
          {
            owner: {
              id: me.id,
            },
          },
        ],
        AND: {
          property: {
            id: propertyId,
          },
        },
      },
    },
  })
  const { data, error, loading } = useSubscription(
    RENTAL_APPLICATION_CREATED_SUBSCRIPTION,
    {
      // variables: {
      //   // ...
      // },
      onSubscriptionData: ({ client, subscriptionData }) => {
        const applications = client.readQuery({
          query: RENTAL_APPLICATIONS_QUERY,
          variables: {
            where: {
              property: {
                id: propertyId,
              },
            },
          },
        })
        console.log("applications from subscription => ", applications)
        console.log("subscription data => ", subscriptionData)

        // 1. Read the cache for the items we want
        // const data = cache.readQuery({ query: ALL_FILES_QUERY })
        // // 2. Filter the deleted itemout of the page
        // data.files = data.files.filter(
        //   file => file.id !== payload.data.deleteFile.id
        // )
        // // 3. Put the items back!
        // cache.writeQuery({ query: ALL_FILES_QUERY, data })
        // Optional callback which provides you access to the new subscription
        // data and the Apollo client. You can use methods of the client to update
        // the Apollo cache:
        // https://www.apollographql.com/docs/react/advanced/caching.html#direct
      },
      // ... rest options
    }
  )
  if (applications.error) return <Error error={applications.error} />
  if (applications.loading) return <p>fetching applications...</p>
  const { rentalApplications } = applications.data
  return (
    <div>
      {rentalApplications &&
        rentalApplications.map((application, idx) => {
          return (
            <ApplicationItem
              key={application.id}
              application={application}
              index={idx}
              property={property}
              openRentalAppModal={rentalData =>
                props.openRentalAppModal(rentalData)
              }
            />
          )
        })}
    </div>
  )
}

export default RentalApplications
