import React from "react"
import StripeCheckout from "react-stripe-checkout"
import { useMutation } from "react-apollo-hooks"
import { CREATE_CREDIT_CARD_MUTATION } from "../../mutation/createCreditCard"
import Router from "next/router"
import NProgress from "nprogress"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import User from "../User/index"
import { CURRENT_USER_QUERY } from "../../query/index"
import { StripeProvider, Elements } from "react-stripe-elements"
import InjectedCheckoutForm from "./CreateCardForm"

const CreateCard = props => {
  // ToDo: Mutation Props
  const [createCreditCard, createCreditCardProps] = useMutation(
    CREATE_CREDIT_CARD_MUTATION
  )
  const onToken = res => {
    const card = createCreditCard({ variables: { token: res.id } })
  }
  return (
    <User>
      {({ data: { me } }) => (
        <>
          {me.id}
          <StripeCheckout
            stripeKey="pk_test_CRnQzE6AWCNnYIbKLLLI7ZDx00DSpHVI1N"
            amount={0}
            description={`New Card for ${me.email}`}
            currency="NZD"
            email={me.email}
            image={me.photoIdentification ? me.photoIdentification.url : null}
            token={res => {
              const token = onToken(res)
            }}>
            {props.children}
          </StripeCheckout>
        </>
      )}
    </User>
  )
}

export default CreateCard
