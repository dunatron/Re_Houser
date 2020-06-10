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
import {
  Paper,
  Typography,
  Button,
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from '@material-ui/core';

import {
  endpoint,
  prodEndpoint,
  wsEndpoint,
  wsProdEndpoint,
} from '../../config';

// Paymnet method components
import CardPaymentForm from './CardPaymentForm';
import { WALLET_SUBSCRIPTION } from '../../graphql/subscriptions/WalletSubscription';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import PaymentsTable from './PaymentsTable';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import Error from '../ErrorMessage';

const formatCentsToDollar = amount => {
  const dollarAmount = amount / 100;

  console.log('doloar amount => ', dollarAmount);

  const isPositive = dollarAmount > 0;

  const formattedMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    // currency: 'NZD',
    currency: 'USD',
  }).format(dollarAmount); // '$100.00'
  return (
    <span
      style={{
        color: isPositive ? 'green' : 'red',
      }}>
      {formattedMoney}
    </span>
  );
};

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
  const [isPaying, setIsPaying] = useState(false);
  const [intentSecret, setIntentSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [error, setError] = useState(null);

  const handleOnSubscriptionData = ({ client, subscriptionData }) => {
    const { amount } = subscriptionData.data.walletSub.node;
    const formattedAmount = formatCentsToDollar(amount);

    setWalletUpdating(false);
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

  const createPaymentIntent = e => {
    setLoadingIntent(true);
    setError(null);
    const centsFromDollar = amount * 100;

    // we need to convert whatever was enetered to cents
    fetch(`${serverBackend}/stripe/intent`, {
      method: 'POST',
      // credentials: 'same-origin', // include, *same-origin, omit
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: centsFromDollar,
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

  return (
    <>
      <Paper style={{ padding: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Wallet: {wallet.id}
        </Typography>
        <Typography gutterBottom>
          amount: {formatCentsToDollar(wallet.amount)}
        </Typography>

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
          <div>
            {isPaying ? (
              <div aria-disabled={loadingIntent}>
                <Typography variant="h6">
                  Set the amount you intend to pay on the server
                </Typography>
                <FormControl
                  fullWidth
                  gutterBottom
                  style={{
                    margin: '32px 0',
                  }}>
                  <InputLabel htmlFor="intent-amount-to-pay">Amount</InputLabel>
                  <Input
                    id="intent-amount-to-pay"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                {/* cents */}
                {error && <Error error={error} />}
                <Button onClick={createPaymentIntent} disabled={loadingIntent}>
                  Create payment Intent
                </Button>
                <Button
                  onClick={() => setIsPaying(false)}
                  disabled={loadingIntent}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsPaying(!isPaying)}
                disabled={loadingIntent}>
                Pay With Card
              </Button>
            )}
          </div>
        )}
        {intentSecret && (
          <div>
            <IconButton onClick={() => setIntentSecret(null)}>
              <RemoveCircleOutlineIcon color="error" />
            </IconButton>
            Remove Payment Intent of {formatCentsToDollar(amount * 100)}
          </div>
        )}
        {intentSecret && (
          <div>
            The server is aware of your intent on a payment of
            {formatCentsToDollar(amount * 100)}
            {/* <Button onClick={() => hanldePayIntent()}>Pay amount</Button> */}
            <CardPaymentForm
              intentSecret={intentSecret}
              amount={amount}
              me={me}
              onPaySuccess={handleOnPaySuccess}
            />
            {/* <CardElement  /> */}
          </div>
        )}
      </Paper>
      <PaymentsTable
        walletId={wallet.id}
        where={{
          wallet: {
            id: wallet.id,
          },
        }}
      />
    </>
  );
};

export default LeaseWallet;
