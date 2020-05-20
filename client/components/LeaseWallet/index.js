// https://github.com/beezeebly/next-stripe-checkout-example
// https://www.serverlesstribe.com/using-the-new-stripe-checkout-in-next-js-ssr/
import React, { useState, useEffect } from 'react';
import {
  useStripe,
  PaymentRequestButtonElement,
  CardElement,
  //   CardNumberElement,
  //   CardExpiryElement,
  //   CardCvcElement,
  AuBankAccountElement,
  IbanElement,
  IdealBankElement,
  FpxBankElement,
} from '@stripe/react-stripe-js';
import { Paper, Typography } from '@material-ui/core';

// Paymnet method components
import CardPaymentForm from './CardPaymentForm';

const LeaseWallet = ({ lease }) => {
  const { wallet } = lease;
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null);

  console.log('STRIPE => ', stripe);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        console.log('Can make payment request result => ', result);
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />;
  }

  if (!wallet) {
    return 'Lease has no wallet please contact support';
  }

  // Use a traditional checkout form.
  // ALl these need to be seperate components that update the server. Lots of payment options
  return (
    <>
      <Paper>
        <Typography>WALLET </Typography>${wallet.amount}
      </Paper>
      <Paper>
        <Typography>Card payment form </Typography>
        <CardPaymentForm />
      </Paper>
      {/* <Paper>
        <Typography>CardElement</Typography>
        <CardElement />
      </Paper> */}
      <Paper>
        <Typography>AuBankAccountElement</Typography>
        <AuBankAccountElement />
      </Paper>
      <Paper>
        <Typography>IbanElement</Typography>
        <IbanElement />
      </Paper>
      <Paper>
        <Typography>IdealBankElement</Typography>
        <IdealBankElement />
      </Paper>
      <Paper>
        <Typography>FpxBankElement</Typography>
        <FpxBankElement />
      </Paper>
    </>
  );
};

export default LeaseWallet;
