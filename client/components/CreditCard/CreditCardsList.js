import React, { Component } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import User from '../User/index';
import CreditCardItem from './CreditCardItem';

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
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return <p>You must be logged in to view your cards</p>;
        const primaryCardId = me.primaryCreditCard
          ? me.primaryCreditCard.id
          : null;
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
      }}
    </User>
  );
};

export default CreditCardsList;
