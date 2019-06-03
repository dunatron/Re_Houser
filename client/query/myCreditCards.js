// import gql from "graphql-tag"

// const MY_CREDIT_CARDS_QUERY = gql`
//   query MY_CREDIT_CARDS_QUERY($where: CreditCardWhereInput!) {
//     myCreditCards(where: $where) {
//     id
//     fingerprint
//     last4
//   }
// `

// export { MY_CREDIT_CARDS_QUERY }

import gql from "graphql-tag"

const MY_CREDIT_CARDS_QUERY = gql`
  query MY_CREDIT_CARDS_QUERY($where: CreditCardWhereInput!) {
    myCreditCards(where: $where) {
      id
      fingerprint
      last4
      name
      stripeCardId
      exp_month
      exp_year
    }
  }
`
export { MY_CREDIT_CARDS_QUERY }
