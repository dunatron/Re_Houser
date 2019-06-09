import React, { Component } from "react"
import { useQuery, useMutation } from "react-apollo-hooks"
import CreateCard from "../CreateCard/index"
import { CURRENT_USER_QUERY, MY_CREDIT_CARDS_QUERY } from "../../query/index"
import { UPDATE_USER_MUTATION } from "../../mutation/index"
import Button from "@material-ui/core/Button"

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
      const userData = proxy.readQuery({ query: CURRENT_USER_QUERY })
      console.group("SetPrimaryCreditCardButton => ")
      console.log("payload => ", payload)
      console.log("userData => ", userData)
      console.groupEnd()
      // userData.me = {
      //   ...userData.me
      //   // ...payload.data.uploadPhotoId,
      // };
      // const testData = userData.me
      //     proxy.writeQuery({ query: CURRENT_USER_QUERY, testData })
    },
    // optimisticResponse: {}
  })
  return (
    <div>
      {!isPrimary ? (
        <Button variant="outlined" onClick={setAsPrimary} disabled={isPrimary}>
          SET AS PRIMARY
        </Button>
      ) : (
        <p>Is Primary Card</p>
      )}
    </div>
  )
}

export default SetPrimaryCreditCardButton
