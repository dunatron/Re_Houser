import gql from 'graphql-tag';

const CHARGE_SUBSCRIPTION = gql`
  subscription chargeSub($where: ChargeSubscriptionWhereInput) {
    chargeSub(where: $where) {
      node {
        id
        amount
        description
        wallet {
          id
          amount
        }
      }
    }
  }
`;

export { CHARGE_SUBSCRIPTION };
