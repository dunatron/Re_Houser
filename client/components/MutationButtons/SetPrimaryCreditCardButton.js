import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  CURRENT_USER_QUERY,
  MY_CREDIT_CARDS_QUERY,
} from '../../graphql/queries/index';
import { UPDATE_USER_MUTATION } from '../../graphql/mutations/index';
import Button from '@material-ui/core/Button';
import ButtonLoader from '../Loader/ButtonLoader';

const SetPrimaryCreditCardButton = ({ cardId, isPrimary }) => {
  // ToDo: Mutation Props
  const [setAsPrimary, setAsPrimaryProps] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      data: {
        primaryCreditCard: {
          connect: {
            id: cardId,
          },
        },
      },
    },
    update: (proxy, payload) => {
      const userData = proxy.readQuery({ query: CURRENT_USER_QUERY });
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          me: {
            ...userData.me,
            primaryCreditCard: {
              ...userData.me.primaryCreditCard,
              id: cardId,
              __typename: 'CreditCard',
            },
          },
        },
      });
    },
  });

  return (
    <div>
      {!isPrimary ? (
        <ButtonLoader
          cy="make-primary-card-btn"
          onClick={setAsPrimary}
          loading={setAsPrimaryProps.loading}
          successText="Reorganising cache"
          text="Make Primary Card"
        />
      ) : (
        <p>Is Primary Card</p>
      )}
    </div>
  );
};

export default SetPrimaryCreditCardButton;
