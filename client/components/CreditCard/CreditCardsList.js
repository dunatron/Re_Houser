import React, { Component } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import User from "../User/index";
import CreditCardItem from "./CreditCardItem";

const CreditCardsList = ({ cardsList }) => {
  return (
    <User>
      {({ data: { me } }) => {
        if (!me) return <p>You must be logged in to view your cards</p>;
        const { primaryCreditCard } = me;
        return (
          <ul>
            {cardsList.map((creditCard, i) => {
              return (
                <CreditCardItem
                  key={i}
                  card={creditCard}
                  isPrimary={primaryCreditCard.id === creditCard.id}
                />
              );
            })}
          </ul>
        );
      }}
    </User>
  );
};

export default CreditCardsList;
