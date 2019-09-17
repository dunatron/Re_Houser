import React from "react"
import { useQuery, useMutation } from "@apollo/react-hooks"
import { PAYMENTS_QUERY } from "../../query/payments"
import PaymentManager from "../PaymentManager"

/**
 * Here we can do things like query all the data we need, e.g payments,
 * lessees
 * lessors
 * lease
 * create direct email etc
 */
const CompletedLease = ({ leaseId }) => {
  const { data, error, loading } = useQuery(PAYMENTS_QUERY, {
    variables: {
      where: {
        leaseId: leaseId,
      },
    },
    suspend: false,
  })

  if (loading) return "Preparing Lease, please wait..."
  if (error) return "Error with feting lease Data"
  return (
    <div>
      <h1>
        This is like an accepted lease and all that stuff. Lotts off components
        to come here
      </h1>
      <h4>Lease Payments</h4>
      <PaymentManager payments={data.payments} title="Lease" />
    </div>
  )
}

export default CompletedLease
