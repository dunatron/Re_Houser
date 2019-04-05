import React, { Component } from "react"
import ApplicationItem from "./ApplicationItem"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import { Query, Mutation } from "react-apollo"

export default class RentalApplications extends Component {
  render() {
    const { propertyId } = this.props
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
            return (
              <div>
                {rentalApplications &&
                  rentalApplications.map((application, idx) => {
                    return (
                      <ApplicationItem application={application} index={idx} />
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
