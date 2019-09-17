import React, { useState, useEffect } from "react";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe
} from "react-stripe-elements";
import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_CREDIT_CARD_MUTATION } from "../../mutation/createCreditCard";

const RenderError = ({ error }) => {
  if (!error.code) return null;
  return (
    <div>
      <div>Code: {error.code}</div>
      <div>Message: {error.message}</div>
      <div>Type: {error.type}</div>
    </div>
  );
};

const CreditCardForm = props => {
  const { stripe } = props;
  const [complete, setComplete] = useState(false);

  const noErrorObj = {
    code: null,
    message: null,
    type: null
  };

  const [errorObj, setErrorObj] = useState(noErrorObj);

  const [createCreditCard, createCreditCardProps] = useMutation(
    CREATE_CREDIT_CARD_MUTATION
  );

  const onToken = async token => {
    const card = await createCreditCard({
      variables: { token: token.id },
      update: (proxy, payload) => _updateCache(proxy, payload)
      // refetchQueries: [
      //   {
      //     query: CURRENT_USER_QUERY
      //   }
      // ]
    });
    console.log("Now Put card in apollo store => ", card);
    console.log("card => ", card);
  };

  const _updateCache = (proxy, payload) => {
    console.log(
      "This is awesome that you want to update the cache. This is fantastic stuff > ",
      payload
    );
  };

  const handleError = err => {
    if (err === undefined) return setErrorObj(noErrorObj);
    return setErrorObj(err);
  };

  const createCard = async () => {
    const res = await stripe.createToken();
    if (res.error) {
      handleError(res.error);
      return;
    }
    if (res.token) {
      onToken(res.token);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <RenderError error={errorObj} />
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      {/* <CardElement
        onChange={card => {
          setComplete(card.complete);
          handleError(card.error);
        }}
        style={{
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "22px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }}
      /> */}
      <Button disabled={!complete} onClick={() => createCard()}>
        Create Card
      </Button>
    </div>
  );
};

export default injectStripe(CreditCardForm);
