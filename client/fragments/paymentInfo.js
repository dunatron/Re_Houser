import gql from "graphql-tag"
/**
 * Not working.. maybe because we are spreading on an array
 */
const PaymentInfoFragment = gql`
  fragment paymentInfo on Payment {
    id
    userId
    leaseId
    propertyId
    stripePaymentId
    object
    amount
    amount_refunded
    balance_transaction
    captured
    created
    currency
    customer
    description
    paid
    payment_method
    status
  }
`

export { PaymentInfoFragment }


