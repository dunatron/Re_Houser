import { Elements, StripeProvider } from "react-stripe-elements"
import StripeClientSideWrapper from "./StripeClientSideWrapper"

// const WithElements = props => <Elements>{props.children}</Elements>

const WithElements = props => (
  <Elements>
    <StripeClientSideWrapper
      children={props.children}></StripeClientSideWrapper>
  </Elements>
)

export default WithElements
