import React, { Component } from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "../User/index"
import NavButton from "../../styles/NavButton"

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => <NavButton onClick={signout}>Sign Out</NavButton>}
  </Mutation>
)
export default Signout
