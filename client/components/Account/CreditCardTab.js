import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { MY_CREDIT_CARDS_QUERY } from "../../query/index";
import CreditCardsList from "../CreditCard/CreditCardsList";
import SetPrimaryCreditCardButton from "../MutationButtons/SetPrimaryCreditCardButton";
import Button from "@material-ui/core/Button";
import StripeComponents from "../StripeComponents/index";
import CreateCardForm from "../StripeComponents/CreateCardForm";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

const CreditCardTab = ({ me }) => {
  const { data, error, loading } = useQuery(MY_CREDIT_CARDS_QUERY, {
    variables: {
      where: {
        id: me.id
      }
    },
    suspend: false
  });

  useEffect(() => {}, []);

  if (loading) return <Loader text="Loading Credit Cards" />;
  if (error) return <ErrorMessage error={error} />;

  const primaryCreditCard = me.primaryCreditCard;

  return (
    <div>
      <h1>I am the Credit Card Tab</h1>
      <h2>
        Primary Card ID:
        {primaryCreditCard ? primaryCreditCard.id : "NOT SET"}
      </h2>
      <StripeComponents>
        <h1>Create a New Card</h1>
        <CreateCardForm me={me} />
      </StripeComponents>
      <CreditCardsList cardsList={data.myCreditCards} />
    </div>
  );
};

export default CreditCardTab;
