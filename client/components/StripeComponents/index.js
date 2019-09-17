import { Elements, StripeProvider } from "react-stripe-elements";
import StripeClientSideWrapper from "./StripeClientSideWrapper";
import NoSSR from "react-no-ssr";

// const WithElements = props => <Elements>{props.children}</Elements>

const WithElements = props => (
  <NoSSR onSSR={<div>LOADING FROM SERVER PLEASE WAIT</div>}>
    <Elements>
      <StripeClientSideWrapper
        children={props.children}
      ></StripeClientSideWrapper>
    </Elements>
  </NoSSR>
);

export default WithElements;
