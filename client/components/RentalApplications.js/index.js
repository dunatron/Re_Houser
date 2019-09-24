import React, { Component } from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { MY_RENTAL_APPLICATIONS_QUERY } from "../../query/index"
import Error from "../ErrorMessage/index"
import Loader from "../Loader/index"
import RentalApplicationsTable from "./RentalApplicationsTable"

const RentalApplications = props => {
  const { me } = props
  const { loading, error, data } = useQuery(MY_RENTAL_APPLICATIONS_QUERY)

  console.log("props what ar u => ", props)
  if (loading)
    return <Loader loading={loading} text="Loading your applications" />
  if (error) return <Error error={error} />
  if (!me) return <h1>No User</h1>
  const { myRentalApplications } = data
  return (
    <RentalApplicationsTable
      myRentalApplications={myRentalApplications}
      me={me}
    />
  )
}

export default RentalApplications
