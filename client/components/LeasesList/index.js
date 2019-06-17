import React, { Component } from "react"
import { useQuery } from "react-apollo-hooks"
import { MY_LEASES_QUERY } from "../../query/index"
import Error from "../ErrorMessage"
import LeasesTable from "./LeasesTable"

const LeasesList = () => {
  const { data, error, loading } = useQuery(MY_LEASES_QUERY)
  if (error) return <Error error={error} />
  if (loading) return "fetching your leases"

  return <LeasesTable leases={data.myLeases} />
}

export default LeasesList
