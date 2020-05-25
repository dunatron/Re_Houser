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
  useElements,
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

const LeaseWallet = ({ lease, me }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { wallet } = lease;
  const [amount, setAmount] = useState(0);
  const [intentSecret, setIntentSecret] = useState(undefined);

  const createPaymentIntent = e => {
    // create payment intent on nodeJs server
    console.log('Try create a payment intent');

    // fetch(`${serverBackend}helpme`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     amount: 200,
    //     sad: 'Sad times',
    //   }),
    // })
    //   .then(response => response.json())
    //   .then(state => {
    //     console.log('Payment intents state => ', state);
    //     setIntentSecret(state.client_secret);
    //   });

    fetch(`${serverBackend}payments/intents`, {
      method: 'POST',
      // credentials: 'same-origin', // include, *same-origin, omit
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then(response => response.json())
      .then(state => {
        console.log('Payment intents state => ', state);
        setIntentSecret(state.client_secret);
      });

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   headers: new Headers(),
    //   body: JSON.stringify({ tittle: tittle, body: body }),
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));
  };

  const hanldeIntentAccept = async () => {
    const result = await stripe.confirmCardPayment(intentSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: null,
            country: null,
            line1: null,
            line2: null,
            state: null,
          },
          email: me.email,
          name: `${me.firstName} ${me.lastName}`,
          phone: me.phone,
        },
      },
    });
    console.log('Payment result => ', result);
    //  paymentIntent:
    //       amount: 1000
    //       canceled_at: null
    //       cancellation_reason: null
    //       capture_method: "automatic"
    //       client_secret: "pi_1Gl67uDzDGjSizvyjuPy4hMT_secret_qx1mqlQVoESMm9D0z30FzoFNs"
    //       confirmation_method: "automatic"
    //       created: 1590035726
    //       currency: "nzd"
    //       description: null
    //       id: "pi_1Gl67uDzDGjSizvyjuPy4hMT"
    //       last_payment_error: null
    //       livemode: false
    //       next_action: null
    //       object: "payment_intent"
    //       payment_method: "pm_1Gl684DzDGjSizvybherkjWP"
    //       payment_method_types: Array(1)
    //       0: "card"
    //       length: 1
    //       __proto__: Array(0)
    //       receipt_email: null
    //       setup_future_usage: null
    //       shipping: null
    //       source: null
    //       status: "succeeded"
  };

  // Use a traditional checkout form.
  // ALl these need to be seperate components that update the server. Lots of payment options
  return (
    <>
      <Paper>
        <Typography>WALLET </Typography>${wallet.amount}
        {!intentSecret && (
          <div>
            <h3>Set the amount you intend to pay on the server</h3>
            <input value={amount} onChange={e => setAmount(e.target.value)} />
            <button onClick={createPaymentIntent}>Create payment Intent</button>
          </div>
        )}
        {intentSecret && (
          <div>
            The server is aware of your intent on a payment of ${amount}
            <button onClick={() => hanldeIntentAccept()}>Pay amount</button>
            {/* <CardPaymentForm /> */}
            <CardElement />
          </div>
        )}
      </Paper>
    </>
  );
};

export default LeaseWallet;
