//myLease

import React, { Component } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "react-apollo-hooks"
import Error from "../ErrorMessage"
import FinaliseLeaseBtn from "../MutationButtons/FinaliseLeaseButton"

const SINGLE_LEASE_QUERY = gql`
  query SINGLE_LEASE_QUERY($where: PropertyLeaseWhereUniqueInput!) {
    myLease(where: $where) {
      id
      location
      rent
      finalised
      lessees {
        id
        signed
        user {
          id
          email
        }
      }
      lessors {
        id
        signed
        user {
          id
          email
        }
      }
    }
  }
`

const LeaseManager = ({ leaseId }) => {
  const { data, error, loading } = useQuery(SINGLE_LEASE_QUERY, {
    variables: {
      where: {
        id: leaseId,
      },
    },
    suspend: false,
  })

  if (loading) return "Preparing Lease, please wait..."
  if (error) return "Error with feting lease Data"
  const { finalised, location, rent, lessors, lessees } = data.myLease
  return (
    <div>
      <FinaliseLeaseBtn leaseId={leaseId} finalised={finalised} />
      <h1>I am The Lease Manager</h1>
      <p>Finalised => {finalised ? "YES" : "NO"}</p>
      <p>lease ID => {leaseId}</p>
      <p>lease rent => {rent}</p>
      <p>lease location => {location}</p>
      <h4>Lessors</h4>
      {lessors.map(lessor => {
        return (
          <div>
            <p>Unique Lessor ID => {lessor.id}</p>
            <p>Signed => {lessor.signed ? "YES" : "NO"}</p>
            <p>lessor User details</p>
            <ul>
              <li>{lessor.user.id}</li>
              <li>{lessor.user.email}</li>
            </ul>
          </div>
        )
      })}
      <h4>Lessees</h4>
      {lessees.map(lessee => {
        return (
          <div>
            <p>Unique lessee ID => {lessee.id}</p>
            <p>Signed => {lessee.signed ? "YES" : "NO"}</p>
            <p>lessee User details</p>
            <ul>
              <li>{lessee.user.id}</li>
              <li>{lessee.user.email}</li>
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default LeaseManager
