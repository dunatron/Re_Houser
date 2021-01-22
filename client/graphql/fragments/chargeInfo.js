import gql from 'graphql-tag';

// id: ID! @unique @id
// createdAt: DateTime! @createdAt
// wallet: Wallet @relation(name: "WalletCharges")
// reason: ChargeReason
// amount: Float
// description: String
const ChargeInfoFragment = gql`
  fragment chargeInfo on Charge {
    id
    createdAt
    reason
    amount
    description
    wallet {
      id
      amount
    }
  }
`;

export { ChargeInfoFragment };
export default ChargeInfoFragment;
