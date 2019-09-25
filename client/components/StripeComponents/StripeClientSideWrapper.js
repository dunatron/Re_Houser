import React, { useState, useEffect } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import ForceReloadButton from '../ForceReloadButton.js';
import RefreshIcon from '../../styles/icons/RefreshIcon';

const StripeClientSideWrapper = props => {
  const { stripe, clear } = props;
  if (!stripe) {
    return (
      <div>
        Unfortunately we utilise server-side-rendering and have not been able
        fetch the Stripe client to securely transmit data client side. Don't
        worry just hit the button API and you can continue
        <ForceReloadButton
          title={
            <div>
              Get Stripe CLient
              <RefreshIcon />
            </div>
          }
        />
      </div>
    );
  }
  return props.children;
};

export default injectStripe(StripeClientSideWrapper);
