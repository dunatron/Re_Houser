import React, { Component } from "react"
import { adopt } from "react-adopt"
import { Query, Mutation } from "react-apollo"

import { MY_RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import User from "../User/index"
import Error from "../ErrorMessage/index"

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
})
export default class RentalApplications extends Component {
  render() {
    return (
      <div>
        <Composed>
          {({ user, createRentalApplication }) => {
            const me = user.data.me
            if (!me) return <h1>No User</h1>
            return (
              <Query query={MY_RENTAL_APPLICATIONS_QUERY}>
                {({ data, loading, error }) => {
                  if (error) return <Error error={error} />
                  if (loading) return <p>Loading...</p>
                  const { myRentalApplications } = data
                  return (
                    <div
                      style={{
                        display: "flex",
                        // alignItems: "center",
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      {myRentalApplications.map((property, i) => (
                        <div>{i} => </div>
                        // <PropertyCard key={i} property={property} />
                      ))}
                    </div>
                  )
                }}
              </Query>
            )
          }}
        </Composed>
      </div>
    )
  }
}
