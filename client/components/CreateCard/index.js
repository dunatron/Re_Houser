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
  const createCreditCard = useMutation(CREATE_CREDIT_CARD_MUTATION)
  const onToken = res => {
    console.log("We have a Stripe Token => ", res)
    console.log("res.id => ", res.id)
    const card = createCreditCard({ variables: { token: res.id } })
    console.log("The create card freom the mutation => ", card)
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
            // token={res => onToken(res)}
            token={res => {
              const token = onToken(res)
              // const card = createCreditCard({ variables: token.id })
              // console.log("Here is the card => ", card)
            }}>
            {props.children}
          </StripeCheckout>
        </>
      )}
    </User>
  )
}

export default CreateCard

/** 
class _CardForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

*/

// const CreateCard = props => {
//   return (
//     <User>
//       {({ data: { me } }) => (
//         <Elements>
//           <InjectedCheckoutForm fontSize={"30px"} />
//         </Elements>
//       )}
//     </User>
//   )
// }

// export default CreateCard
