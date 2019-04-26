import React, { Component } from "react"
import { useQuery } from "react-apollo-hooks"
import { RENTAL_APPLICATIONS_QUERY } from "../../query/index"

const RentalApplications = props => {
  const { data, error, loading } = useQuery(RENTAL_APPLICATIONS_QUERY, {
    variables: {
      where: {
        property: {
          id: props.property.id,
        },
      },
    },
    suspend: false,
  })
  if (loading) {
    return <div>fetching applications please wait....</div>
  }
  if (error) {
    return <div>Error! {error.message}</div>
  }
  return (
    <div>
      <h1>I am the Applications details component</h1>
      {JSON.stringify(data)}
      {data.rentalApplications.map((application, i) => {
        return (
          <div>
            <h2>ID: {application.id}</h2>
            <h2>Visibility: {application.visibility}</h2>
            <h2>Stage: {application.stage}</h2>
            <h2>FINALISED: {application.finalised}</h2>
            <h2>{application.id}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default RentalApplications
