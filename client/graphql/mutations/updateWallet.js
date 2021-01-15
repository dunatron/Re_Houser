import gql from 'graphql-tag';

// data: WalletUpdateInput!
// where: WalletWhereUniqueInput!
const UPDATE_WALLET_MUTATION = gql`
  mutation updateWallet(
    $data: WalletUpdateInput!
    $where: WalletWhereUniqueInput!
  ) {
    updateWallet(data: $data, where: $where) {
      id
      amount
      lease {
        id
        stage
      }
    }
  }
`;

export { UPDATE_WALLET_MUTATION };
