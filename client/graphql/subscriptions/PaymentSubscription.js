import gql from 'graphql-tag';

const PAYMENT_SUBSCRIPTION = gql`
  subscription paymentSub($where: PaymentSubscriptionWhereInput) {
    paymentSub(where: $where) {
      node {
        id
        amount
        wallet {
          id
          amount
        }
      }
    }
  }
`;

export { PAYMENT_SUBSCRIPTION };
