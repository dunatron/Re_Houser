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
import { useMutation, useSubscription } from '@apollo/client';
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
import { Paper, Typography, Button } from '@material-ui/core';

import {
  endpoint,
  prodEndpoint,
  wsEndpoint,
  wsProdEndpoint,
} from '../../config';

// Paymnet method components
import CardPaymentForm from './CardPaymentForm';
import RecentPayments from './RecentPayments';
import { WALLET_SUBSCRIPTION } from '../../graphql/subscriptions/WalletSubscription';
// { node: { id: "ckaqftsw3xeuh09996ihvdloa" }

const serverBackend =
  process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;

// should probably actually refetch the lease on a successful payment might be best.
// or perhaps get the wallet by itself here. and refetch that as it has payments and actually the right level we want to refetch on
const LeaseWallet = ({ lease, me }) => {
  console.log('Wtf doe me look like... => ', me);
  const stripe = useStripe();
  const elements = useElements();
  const { wallet } = lease;
  const [amount, setAmount] = useState(0);
  const [intentSecret, setIntentSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [error, setError] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);

  const { data, loading } = useSubscription(WALLET_SUBSCRIPTION, {
    variables: {
      where: {
        node: {
          id: wallet.id,
        },
      },
    },
  });

  console.log('WALLET SUB loading => ', loading);
  console.log('WALLET SUB data => ', data);
  console.log('Wallet id => ', wallet.id);

  // ToDo: i think maybe we subscribe to wallet updates...

  // const createPaymentIntent = e => {
  //   setLoading(true);
  //   setError(null);
  //   fetch(`${serverBackend}payments/intents`, {
  //     method: 'POST',
  //     // credentials: 'same-origin', // include, *same-origin, omit
  //     credentials: 'include',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       amount: amount,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(state => {
  //       console.log('Payment intents state => ', state);
  //       setIntentSecret(state.client_secret);
  //     })
  //     .catch(e => {
  //       setError(e);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const createPaymentIntent = e => {
    setLoadingIntent(true);
    setError(null);
    fetch(`${serverBackend}/stripe/intent`, {
      method: 'POST',
      // credentials: 'same-origin', // include, *same-origin, omit
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        leaseId: lease.id,
        walletId: wallet.id,
      }),
    })
      .then(response => response.json())
      .then(state => {
        console.log('Payment intents state => ', state);
        setIntentSecret(state.client_secret);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setLoadingIntent(false);
      });
  };

  const handleOnPaySuccess = payload => {
    console.log('Payload => ', payload);
    alert('Congrats your payment was a success => ', payload);
    setIntentSecret(null);
    setRecentPayments([...recentPayments, payload]);
  };

  // Being done on CardPaymentForm
  const hanldePayIntent = async () => {
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
  };

  // Use a traditional checkout form.
  // ALl these need to be seperate components that update the server. Lots of payment options
  return (
    <>
      <Paper>
        <Typography>WALLET: {wallet.id} - </Typography>${wallet.amount}
        {!intentSecret && (
          <div aria-disabled={loadingIntent}>
            <h3>Set the amount you intend to pay on the server in cents</h3>
            <input value={amount} onChange={e => setAmount(e.target.value)} />
            cents
            <Button onClick={createPaymentIntent} disabled={loadingIntent}>
              Create payment Intent
            </Button>
          </div>
        )}
        {intentSecret && (
          <div
            onClick={() => setIntentSecret(null)}
            style={{
              padding: '32px',
              border: '1px solid red',
            }}>
            Remove Payment Intent of {amount}
          </div>
        )}
        {intentSecret && (
          <div style={{ padding: '32px', border: '1px solid green' }}>
            The server is aware of your intent on a payment of ${amount}
            <Button onClick={() => hanldePayIntent()}>Pay amount</Button>
            <CardPaymentForm
              intentSecret={intentSecret}
              amount={amount}
              me={me}
              onPaySuccess={handleOnPaySuccess}
            />
            {/* <CardElement  /> */}
          </div>
        )}
        <RecentPayments payments={recentPayments} />
      </Paper>
    </>
  );
};

export default LeaseWallet;
