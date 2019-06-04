import React, { Component } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import SetPrimaryCreditCardButton from "../MutationButtons/SetPrimaryCreditCardButton";

const CreditCardItem = ({ card, isPrimary }) => {
  return (
    <li>
      <p>
        CARD: {card.id} => Primary: {isPrimary ? "Is Primary Card" : "NO"}
      </p>
      <ul>
        <li>id - {card.id}</li>
        <li>fingerprint - {card.fingerprint}</li>
        <li>last4 - {card.last4}</li>
        <li>name - {card.name}</li>
        <li>stripeCardId - {card.stripeCardId}</li>
        <li>exp_month - {card.exp_month}</li>
        <li>exp_year - {card.exp_year}</li>
      </ul>
      <SetPrimaryCreditCardButton cardId={card.id} isPrimary={isPrimary} />
    </li>
  );
};

export default CreditCardItem;
