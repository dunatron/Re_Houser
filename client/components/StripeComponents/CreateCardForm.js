import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  injectStripe,
} from 'react-stripe-elements';
import { useMutation } from '@apollo/client';
import { CREATE_CREDIT_CARD_MUTATION } from '@/Gql/mutations/createCreditCard';
import { MY_CREDIT_CARDS_QUERY } from '@/Gql/queries/index';
import ButtonLoader from '@/Components/Loader/ButtonLoader';
import { Button } from '@material-ui/core';

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

RenderError.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.any,
    message: PropTypes.any,
    type: PropTypes.any
  }).isRequired
};

const CreditCardForm = props => {
  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);

  const { me, stripe } = props;
  const [complete, setComplete] = useState(false);

  const noErrorObj = {
    code: null,
    message: null,
    type: null,
  };

  const [errorObj, setErrorObj] = useState(noErrorObj);

  const [createCreditCard, createCreditCardProps] = useMutation(
    CREATE_CREDIT_CARD_MUTATION
  );

  const onToken = async token => {
    await createCreditCard({
      variables: { token: token.id },
      update: (proxy, payload) => _updateCache(proxy, payload),
    });
  };

  const _updateCache = (proxy, payload) => {
    const userCards = proxy.readQuery({
      query: MY_CREDIT_CARDS_QUERY,
      variables: {
        where: {
          id: me.id,
        },
      },
    });
    proxy.writeQuery({
      query: MY_CREDIT_CARDS_QUERY,
      variables: {
        where: {
          id: me.id,
        },
      },
      data: {
        myCreditCards: [
          ...userCards.myCreditCards,
          payload.data.createCreditCard,
        ],
      },
    });
    _clearCard();
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

  const _clearCard = () => {
    cardNumberRef.current._element.clear();
    cardExpiryRef.current._element.clear();
  };

  useEffect(() => {}, []);

  return (
    <div>
      <form disabled={createCreditCardProps.loading}>
        <RenderError error={errorObj} />
        <div style={{ maxWidth: '400px' }}>
          <CardElement style={{ base: { fontSize: '22px' } }} />
        </div>

        {/* <CardNumberElement
          data-cy="card-number-element"
          ref={cardNumberRef}
          onChange={card => {
            setComplete(card.complete);
            handleError(card.error);
          }}
        />
        <CardExpiryElement
          ref={cardExpiryRef}
          onChange={card => {
            setComplete(card.complete);
            handleError(card.error);
          }}
        /> */}
        {/* <CardCvcElement /> */}
        <ButtonLoader
          cy="create-card-btn"
          text="Create Card"
          successText="Card has been created"
          loading={createCreditCardProps.loading}
          disabled={createCreditCardProps.loading || !complete}
          onClick={() => createCard()}
        />
        <Button
          onClick={e => {
            e.preventDefault();
            _clearCard();
          }}>
          CLear
        </Button>
      </form>
    </div>
  );
};

CreditCardForm.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.any
  }).isRequired,
  stripe: PropTypes.shape({
    createToken: PropTypes.func
  }).isRequired
};

export default injectStripe(CreditCardForm);
