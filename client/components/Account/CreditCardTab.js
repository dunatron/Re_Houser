import React, { Component } from "react"
import { useQuery, useMutation } from "react-apollo-hooks"
import CreateCard from "../CreateCard/index"
import { MY_CREDIT_CARDS_QUERY } from "../../query/index"
import CreditCardsList from "../CreditCard/CreditCardsList"
import SetPrimaryCreditCardButton from "../MutationButtons/SetPrimaryCreditCardButton"
import Button from "@material-ui/core/Button"

const CreditCardTab = ({ me }) => {
  // const {loading, error} = useQuery(MY_CREDIT_CARDS_QUERY, variables: {

  // })

  const { data, error, loading } = useQuery(MY_CREDIT_CARDS_QUERY, {
    variables: {
      where: {
        id: me.id,
      },
    },
    suspend: false,
  })
  // const addTask = useMutation(ADD_TASK_MUTATION, {
  //   update: (proxy, mutationResult) => {
  //     /* your custom update logic */
  //   },
  //   variables: {
  //     text: inputRef.current.value,
  //   },
  // });
  if (loading)
    return (
      <div>
        <h1>Loading credit cards</h1>
      </div>
    )
  if (error)
    return (
      <div>
        <h1>error loading credit cards</h1>
      </div>
    )
  const primaryCreditCard = me.primaryCreditCard
  return (
    <div>
      <h1>I am the Credit Card Tab</h1>
      <h2>
        Primary Card ID =>{" "}
        {primaryCreditCard ? primaryCreditCard.id : "NOT SET"}
      </h2>
      <CreditCardsList cardsList={data.myCreditCards} />
      {/* {data.myCreditCards.map((creditCard, i) => {
        const {
          id,
          fingerprint,
          last4,
          name,
          stripeCardId,
          exp_month,
          exp_year
        } = creditCard;
        return (
          <div>
            <h1>Credit CARD DETAILS</h1>
            <SetPrimaryCreditCardButton cardId={id} />
            <ul>
              <li>id - {id}</li>
              <li>fingerprint - {fingerprint}</li>
              <li>last4 - {last4}</li>
              <li>name - {name}</li>
              <li>stripeCardId - {stripeCardId}</li>
              <li>exp_month - {exp_month}</li>
              <li>exp_year - {exp_year}</li>
            </ul>
          </div>
        );
      })} */}
      <CreateCard>
        <Button color="primary" variant="outlined">
          Add Credit Card
        </Button>
      </CreateCard>
    </div>
  )
}

export default CreditCardTab
