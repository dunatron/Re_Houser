import gql from 'graphql-tag';
/**
 * Not working.. maybe because we are spreading on an array
 */
const PaymentInfoFragment = gql`
  fragment paymentInfo on Payment {
    id
    wallet {
      id
    }
    userId
    bankName
    bankNumber
    bankBranch
    bankAccount
    bankSuffix
    bankRef
    type
    reason
    leaseId
    propertyId
    stripePaymentId
    object
    amount
    createdAt
    description
    status
  }
`;

export { PaymentInfoFragment };
export default PaymentInfoFragment;
