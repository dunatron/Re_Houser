import React, { Component } from "react"
import { useQuery } from "@apollo/react-hooks"
import { MY_LEASES_QUERY } from "../../query/index"
import Error from "../ErrorMessage"
import LeasesTable from "./LeasesTable"
import SuperiorTable from "../SuperiorTable"

const LeasesList = () => {
  const { data, error, loading } = useQuery(MY_LEASES_QUERY)
  if (error) return <Error error={error} />
  if (loading) return "fetching your leases"

  // const columns = [
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "rent",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  //   {
  //     title: "YAYAY",
  //     field: "location",
  //   },
  // ]

  // return (
  //   <SuperiorTable
  //     data={data.myLeases}
  //     columns={columns}
  //     options={{
  //       search: true,
  //     }}
  //   />
  // )
  return <LeasesTable leases={data.myLeases} />
}

export default LeasesList
