import { Elements, StripeProvider } from 'react-stripe-elements';
import StripeClientSideWrapper from './StripeClientSideWrapper';
import NoSSR from 'react-no-ssr';

// const WithElements = props => <Elements>{props.children}</Elements>

const WithElements = props => {
  const { clear } = props;
  return (
    <NoSSR onSSR={<div>LOADING FROM SERVER PLEASE WAIT</div>}>
      <Elements>
        <StripeClientSideWrapper
          clear={() => alert('We catch it here')}
          children={props.children}></StripeClientSideWrapper>
      </Elements>
    </NoSSR>
  );
};

export default WithElements;
