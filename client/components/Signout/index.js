import React, { Component } from "react"
import { useQuery } from "react-apollo-hooks"
import { Mutation } from "react-apollo"
import { useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"
import { CURRENT_USER_QUERY } from "../User/index"
import NavButton from "../../styles/NavButton"
import Error from "../ErrorMessage/index"
import { toast } from "react-toastify"

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

/**
 *
 * NOTE: it breaks if we try to update the user in the cache. because of the setup you kind of need to refetch the queries..
 *
 */
const Signout = ({ label, fullWidth, me }) => {
  if (!me) return null
  const [signout, { data, loading, error }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    // update: (proxy, payload) => {
    //   const user = proxy.readQuery({ query: CURRENT_USER_QUERY })
    //   if (payload.data) {
    //     const { signout } = payload.data
    //     if (signout.__typename === "SuccessMessage") {
    //       toast.info(signout.message)
    //       // user.me = undefined
    //       user.me = null
    //       // proxy.writeQuery({
    //       //   query: CURRENT_USER_QUERY,
    //       //   data: {
    //       //     me: null,
    //       //   },
    //       // })
    //     }
    //   }
    // },
    // optimisticResponse: {
    //   __typename: "Mutation",
    //   signout: {
    //     __typename: "SuccessMessage",
    //     message: "signing you out and cleaning up your session",
    //   },
    // },
  })

  return (
    <>
      <Error error={error} />
      <NavButton onClick={signout} fullWidth={fullWidth} disabled={loading}>
        {label ? label : "Sign Out"}
      </NavButton>
    </>
  )
}
export default Signout
