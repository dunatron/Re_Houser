import gql from 'graphql-tag';

const WALLET_SUBSCRIPTION = gql`
  subscription walletSub($where: WalletSubscriptionWhereInput) {
    walletSub(where: $where) {
      node {
        id
        lease {
          id
        }
        amount
      }
    }
  }
`;

export { WALLET_SUBSCRIPTION };
