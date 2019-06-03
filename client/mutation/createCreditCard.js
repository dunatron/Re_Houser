import gql from "graphql-tag"

const CREATE_CREDIT_CARD_MUTATION = gql`
  mutation CREATE_CREDIT_CARD_MUTATION($token: String!) {
    createCreditCard(token: $token) {
      id
    }
  }
`

export { CREATE_CREDIT_CARD_MUTATION }
