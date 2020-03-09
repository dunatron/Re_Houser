import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import styled from 'styled-components';
// import User from '../User/index';
import CreditCardItem from './CreditCardItem';
import { useCurrentUser } from '../User';

const CreditCardGridStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 550px) {
  }
  @media only screen and (min-width: 992px) {
  }
`;

const CreditCardsList = ({ cardsList }) => {
  const { data, error, loading } = useCurrentUser();
  if (loading) return 'loading me for cards';
  if (error) return 'error loading me for card slist';
  const { me } = data;
  if (!me) return <p>You must be logged in to view your cards</p>;
  const primaryCardId = me.primaryCreditCard ? me.primaryCreditCard.id : null;
  return (
    <CreditCardGridStyles>
      {cardsList.map((creditCard, i) => {
        return (
          <CreditCardItem
            key={i}
            card={creditCard}
            isPrimary={primaryCardId === creditCard.id}
          />
        );
      })}
    </CreditCardGridStyles>
  );
};

export default CreditCardsList;
