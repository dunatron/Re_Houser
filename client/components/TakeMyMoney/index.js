import React from "react"
import StripeCheckout from "react-stripe-checkout"
import { useMutation } from "react-apollo-hooks"
import Router from "next/router"
import NProgress from "nprogress"
import PropTypes from "prop-types"
import gql from "graphql-tag"

const TakeMyMoney = () => {
  return (
    <div>
      <h1>...Please take my money</h1>
    </div>
  )
}

export default TakeMyMoney
