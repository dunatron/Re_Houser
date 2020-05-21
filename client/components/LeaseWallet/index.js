// // https://github.com/beezeebly/next-stripe-checkout-example
// // https://www.serverlesstribe.com/using-the-new-stripe-checkout-in-next-js-ssr/
// import React, { useState, useEffect } from 'react';
// import {
//   useStripe,
//   PaymentRequestButtonElement,
//   CardElement,
//   //   CardNumberElement,
//   //   CardExpiryElement,
//   //   CardCvcElement,
//   AuBankAccountElement,
//   IbanElement,
//   IdealBankElement,
//   FpxBankElement,
// } from '@stripe/react-stripe-js';
// import { Paper, Typography } from '@material-ui/core';

// // Paymnet method components
// import CardPaymentForm from './CardPaymentForm';

// const LeaseWallet = ({ lease }) => {
//   const { wallet } = lease;
//   const stripe = useStripe();
//   const [paymentRequest, setPaymentRequest] = useState(null);

//   console.log('STRIPE => ', stripe);

//   useEffect(() => {
//     if (stripe) {
//       const pr = stripe.paymentRequest({
//         country: 'US',
//         currency: 'usd',
//         total: {
//           label: 'Demo total',
//           amount: 1099,
//         },
//         requestPayerName: true,
//         requestPayerEmail: true,
//       });
//       // Check the availability of the Payment Request API.
//       pr.canMakePayment().then(result => {
//         console.log('Can make payment request result => ', result);
//         if (result) {
//           setPaymentRequest(pr);
//         }
//       });
//     }
//   }, [stripe]);

//   if (paymentRequest) {
//     return <PaymentRequestButtonElement options={{ paymentRequest }} />;
//   }

//   if (!wallet) {
//     return 'Lease has no wallet please contact support';
//   }

//   // Use a traditional checkout form.
//   // ALl these need to be seperate components that update the server. Lots of payment options
//   return (
//     <>
//       <Paper>
//         <Typography>WALLET </Typography>${wallet.amount}
//       </Paper>
//       <Paper>
//         <Typography>Card payment form </Typography>
//         <CardPaymentForm />
//       </Paper>
//       {/* <Paper>
//         <Typography>CardElement</Typography>
//         <CardElement />
//       </Paper> */}
//       <Paper>
//         <Typography>AuBankAccountElement</Typography>
//         <AuBankAccountElement />
//       </Paper>
//       <Paper>
//         <Typography>IbanElement</Typography>
//         <IbanElement />
//       </Paper>
//       <Paper>
//         <Typography>IdealBankElement</Typography>
//         <IdealBankElement />
//       </Paper>
//       <Paper>
//         <Typography>FpxBankElement</Typography>
//         <FpxBankElement />
//       </Paper>
//     </>
//   );
// };

// export default LeaseWallet;

// https://github.com/beezeebly/next-stripe-checkout-example
// https://www.serverlesstribe.com/using-the-new-stripe-checkout-in-next-js-ssr/
// https://fireship.io/lessons/stripe-payment-intents-tutorial/
// https://stripe.com/docs/stripe-cli run webhooks locally etc
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
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

import {
  endpoint,
  prodEndpoint,
  wsEndpoint,
  wsProdEndpoint,
} from '../../config';

// Paymnet method components
import CardPaymentForm from './CardPaymentForm';

const serverBackend =
  process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;

const LeaseWallet = ({ lease }) => {
  const { wallet } = lease;
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();

  const createPaymentIntent = e => {
    // create payment intent on nodeJs server
    fetch(`${serverBackend}/intents?amount=${amount}`)
      .then(response => response.json())
      .then(state => {
        console.log('Payment intents state => ', state);
      });
  };

  // Use a traditional checkout form.
  // ALl these need to be seperate components that update the server. Lots of payment options
  return (
    <>
      <Paper>
        <Typography>WALLET </Typography>${wallet.amount}
        <div>
          <h3>Set the amount you intend to pay on the server</h3>
          <input value={amount} onChange={e => setAmount(e.target.value)} />
          <button onClick={createPaymentIntent}>Create payment Intent</button>
        </div>
      </Paper>
    </>
  );
};

export default LeaseWallet;
