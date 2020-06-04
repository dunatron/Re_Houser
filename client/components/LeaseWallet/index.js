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
import Loader from '../Loader';
import { toast } from 'react-toastify';

const serverBackend =
  process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint;

// should probably actually refetch the lease on a successful payment might be best.
// or perhaps get the wallet by itself here. and refetch that as it has payments and actually the right level we want to refetch on
const LeaseWallet = ({ lease, me }) => {
  console.log('Wtf doe me look like... => ', me);
  const stripe = useStripe();
  const elements = useElements();
  const { wallet } = lease;
  const [walletUpdating, setWalletUpdating] = useState(false);
  const [amount, setAmount] = useState(0);
  const [intentSecret, setIntentSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [error, setError] = useState(null);
  const [recentPayments, setRecentPayments] = useState([]);

  const handleOnSubscriptionData = ({ client, subscriptionData }) => {
    const { amount } = subscriptionData.data.walletSub.node;
    const dollarAmount = amount / 100;

    const formattedAmount = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'NZD',
    }).format(dollarAmount);

    setWalletUpdating(false);

    console.log();
    toast.success(
      <div>
        <Typography>Lease wallet updated</Typography>
        <Typography>{formattedAmount}</Typography>
      </div>
    );
  };

  const { data, loading } = useSubscription(WALLET_SUBSCRIPTION, {
    onSubscriptionData: handleOnSubscriptionData,
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
    setIntentSecret(null);
    setRecentPayments([...recentPayments, payload]);
    setWalletUpdating(true);
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
        {walletUpdating && (
          <div>
            <Loader
              loading={walletUpdating}
              text="Waiting on the server to add payment to the wallet"
            />
          </div>
        )}
        {loadingIntent && (
          <div>
            <Loader
              loading={loadingIntent}
              text="Informing server of intent to pay"
            />
          </div>
        )}
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
