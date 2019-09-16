import gql from "graphql-tag"
import { CreditCardInfoFragment } from "../fragments/creditCardInfo"

const CREATE_CREDIT_CARD_MUTATION = gql`
  mutation CREATE_CREDIT_CARD_MUTATION($token: String!) {
    createCreditCard(token: $token) {
      ...creditCardInfo
    }
  }
  ${CreditCardInfoFragment}
`
export { CREATE_CREDIT_CARD_MUTATION }
