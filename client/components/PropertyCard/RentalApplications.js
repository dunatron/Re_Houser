import React, { Component } from "react"
import ApplicationItem from "./ApplicationItem"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import { Query, Mutation } from "react-apollo"
import { useSubscription, useState } from "react-apollo-hooks"
import { RENTAL_APPLICATION_CREATED_SUBSCRIPTION } from "../../subscriptions/RentalApplicationCreatedSub"

// const { data, error, loading } = useSubscription(
//   RENTAL_APPLICATION_CREATED_SUBSCRIPTION,
//   {
//     // variables: {
//     //   // ...
//     // },
//     onSubscriptionData: ({ client, subscriptionData }) => {
//       console.log("Ohhh this is just fantastic georgew => ", subscriptionData)
//       // Optional callback which provides you access to the new subscription
//       // data and the Apollo client. You can use methods of the client to update
//       // the Apollo cache:
//       // https://www.apollographql.com/docs/react/advanced/caching.html#direct
//     },
//     // ... rest options
//   }
// )

// export default class RentalApplications extends Component {
//   render() {
//     const { propertyId, property, me } = this.props
//     return (
//       <div>
//         <Query
//           query={RENTAL_APPLICATIONS_QUERY}
//           variables={{
//             where: {
//               property: {
//                 id: propertyId,
//               },
//             },
//           }}>
//           {({ data, loading, error }) => {
//             if (error) return <Error error={error} />
//             if (loading) return <p>fetching applications...</p>
//             const { rentalApplications } = data
//             console.log("Rental Application Data => ", rentalApplications)
//             return (
//               <div>
//                 {rentalApplications &&
//                   rentalApplications.map((application, idx) => {
//                     return (
//                       <ApplicationItem
//                         key={application.id}
//                         application={application}
//                         index={idx}
//                         property={property}
//                         openRentalAppModal={rentalData =>
//                           this.props.openRentalAppModal(rentalData)
//                         }
//                       />
//                     )
//                   })}
//               </div>
//             )
//           }}
//         </Query>
//       </div>
//     )
//   }
// }

const RentalApplications = props => {
  const { propertyId, property, me } = props
  const { data, error, loading } = useSubscription(
    RENTAL_APPLICATION_CREATED_SUBSCRIPTION,
    {
      // variables: {
      //   // ...
      // },
      onSubscriptionData: ({ client, subscriptionData }) => {
        console.log("Ohhh this is just fantastic georgew => ", subscriptionData)
        alert(
          "Ohhh You should refresh. the stack is right, time to go HAM with hooks"
        )
        // Optional callback which provides you access to the new subscription
        // data and the Apollo client. You can use methods of the client to update
        // the Apollo cache:
        // https://www.apollographql.com/docs/react/advanced/caching.html#direct
      },
      // ... rest options
    }
  )
  return (
    <div>
      <Query
        query={RENTAL_APPLICATIONS_QUERY}
        variables={{
          where: {
            property: {
              id: propertyId,
            },
          },
        }}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />
          if (loading) return <p>fetching applications...</p>
          const { rentalApplications } = data
          console.log("Rental Application Data => ", rentalApplications)
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
        }}
      </Query>
    </div>
  )
}

export default RentalApplications
