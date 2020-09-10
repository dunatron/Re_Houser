import PropTypes from "prop-types";
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CardPaymentStyledForm from '../../styles/CardPaymentStyledForm';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { useTheme, Button, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const CardField = ({ onChange }) => {
  const mdTheme = useTheme();
  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: mdTheme.palette.primary.contrastText,
        color: mdTheme.palette.primary.contrastText,
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {
          color: fade(mdTheme.palette.primary.contrastText, 0.5),
        },
        '::placeholder': {
          color: fade(mdTheme.palette.primary.contrastText, 0.5),
        },
      },
      invalid: {
        iconColor: red[800],
        color: red[800],
      },
    },
  };
  return (
    <div className="FormRow">
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  );
};

CardField.propTypes = {
  onChange: PropTypes.any.isRequired
}

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

Field.propTypes = {
  autoComplete: PropTypes.any.isRequired,
  id: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  placeholder: PropTypes.any.isRequired,
  required: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const SubmitButton = ({
  processing,
  error,
  children,
  disabled,
  cardComplete,
}) => {
  const _isDisabled = () => {
    if (!cardComplete) return true;
    if (processing) return true;
    if (error) return true;
    if (disabled) return true;
    return false;
  };
  return (
    <Button
      variant="contained"
      className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
      type="submit"
      disabled={_isDisabled()}>
      {processing ? 'Processing...' : children}
    </Button>
  );
};

SubmitButton.propTypes = {
  cardComplete: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
  disabled: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  processing: PropTypes.any.isRequired
}

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <ErrorOutlineIcon />
    <Typography>{children}</Typography>
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.any.isRequired
}

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

ResetButton.propTypes = {
  onClick: PropTypes.any.isRequired
}

const CardPaymentForm = ({ intentSecret, amount, me, onPaySuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: me.email,
    phone: me.phone,
    name: `${me.firstName} ${me.lastName}`,
  });

  const handlePaymentSuccess = payload => {
    onPaySuccess(payload);
  };

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
          ...billingDetails,
        },
      },
    });
    return result;
  };

  const handleCardChange = e => {
    setError(e.error);
    setCardComplete(e.complete);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement('card').focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await hanldePayIntent();

    setProcessing(false);

    if (payload.error) {
      setError(payload.error);
    } else {
      handlePaymentSuccess(payload);
      // I guess we assume it succeded. We should display A success or something perhaps
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setBillingDetails({
      email: '',
      phone: '',
      name: '',
    });
  };

  return (
    <CardPaymentStyledForm>
      <form className="Form" onSubmit={handleSubmit}>
        <fieldset className="FormGroup">
          <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={billingDetails.name}
            onChange={e => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
          />
          <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={billingDetails.email}
            onChange={e => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
          />
          <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={billingDetails.phone}
            onChange={e => {
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="FormGroup">
          <CardField onChange={handleCardChange} />
        </fieldset>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <SubmitButton
          processing={processing}
          error={error}
          disabled={!stripe}
          cardComplete={cardComplete}>
          Pay ${amount}
        </SubmitButton>
      </form>
    </CardPaymentStyledForm>
  );
};

CardPaymentForm.propTypes = {
  amount: PropTypes.any.isRequired,
  intentSecret: PropTypes.any.isRequired,
  me: PropTypes.shape({
    email: PropTypes.any,
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    phone: PropTypes.any
  }).isRequired,
  onPaySuccess: PropTypes.func.isRequired
}

export default CardPaymentForm;
