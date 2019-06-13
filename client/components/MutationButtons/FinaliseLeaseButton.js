import React, { Component } from "react"
import gql from "graphql-tag"
import { useQuery, useMutation } from "react-apollo-hooks"
import Error from "../ErrorMessage"
import Button from "@material-ui/core/Button"
import { toast } from "react-toastify"
import { SINGLE_LEASE_QUERY } from "../LeaseManager"

const FINALISE_PROPERTY_LEASE_MUTATION = gql`
  mutation FINALISE_PROPERTY_LEASE_MUTATION($leaseId: ID!) {
    finalisePropertyLease(leaseId: $leaseId) {
      message
    }
  }
`

const FinaliseLeaseBtn = ({ leaseId, finalised }) => {
  const [finaliseLease, finaliseLeaseProps] = useMutation(
    FINALISE_PROPERTY_LEASE_MUTATION,
    {
      variables: {
        leaseId: leaseId,
      },
      update: (proxy, payload) => {
        const leaseData = proxy.readQuery({
          query: SINGLE_LEASE_QUERY,
          variables: {
            where: {
              id: leaseId,
            },
          },
        })
        if (payload.data.finalisePropertyLease) {
          if (
            payload.data.finalisePropertyLease.__typename === "SuccessMessage"
          ) {
            leaseData.myLease.finalised = true
            toast.info(<p>{payload.data.finalisePropertyLease.message}</p>)
          }
        }
      },
    }
  )
  if (finalised) {
    return "Lease has been signed and finalised"
  }
  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => finaliseLease()}
        disabled={finaliseLeaseProps.loading}>
        {finaliseLeaseProps.loading ? "FINALISING LEASE" : "FINALISE LEASE"}
      </Button>
      {finaliseLeaseProps.error && <Error error={finaliseLeaseProps.error} />}
    </div>
  )
}

export default FinaliseLeaseBtn
