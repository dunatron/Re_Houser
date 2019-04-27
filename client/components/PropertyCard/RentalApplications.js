import React, { Component } from "react"
import ApplicationItem from "./ApplicationItem"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import { Query, Mutation } from "react-apollo"

export default class RentalApplications extends Component {
  render() {
    const { propertyId, property, me } = this.props
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
                          this.props.openRentalAppModal(rentalData)
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
}
