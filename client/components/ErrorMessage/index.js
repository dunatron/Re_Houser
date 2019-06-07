import styled from "styled-components"
import React from "react"
import { toast } from "react-toastify"

import PropTypes from "prop-types"
const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

const DisplayError = ({ error, tronM }) => {
  /** custon test begin */
  /** custon test begin */
  if (!error || !error.message) return null
  // if (error) {
  //   toast("I said so ho")
  // }
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    error.networkError.result.errors.map((errorForToast, i) =>
      // toast.error(
      //   <ErrorStyles key={i}>
      //     <p data-test="graphql-error">
      //       <strong>Shoot! network Err</strong>
      //       {/* <button onClick={() => notify()}>Ima need more than that</button> */}
      //       {error.message.replace("GraphQL error: ", "")}
      //     </p>
      //   </ErrorStyles>
      // )
      toast.error(
        <p data-test="graphql-error">
          <strong>Shoot! network Err</strong>
          {/* <button onClick={() => notify()}>Ima need more than that</button> */}
          {error.message.replace("GraphQL error: ", "")}
        </p>
      )
    )
    return error.networkError.result.errors.map((error, i) => (
      <>
        {tronM && (
          <p>
            THIS ULTIMATELY FAILED BECAUSE YOU TRIED TO BLA BLA... standardize
            with ovveride => {tronM}
          </p>
        )}
        <ErrorStyles key={i}>
          <p data-test="graphql-error">
            <strong>Shoot!</strong>
            {/* <button onClick={() => notify()}>Ima need more than that</button> */}
            {error.message.replace("GraphQL error: ", "")}
          </p>
        </ErrorStyles>
      </>
    ))
  }
  // toast.error(
  //   <ErrorStyles>
  //     <p data-test="graphql-error">
  //       <strong>Shoot! network Err</strong>
  //       {/* <button onClick={() => notify()}>Ima need more than that</button> */}
  //       {error.message.replace("GraphQL error: ", "")}
  //     </p>
  //   </ErrorStyles>
  // )
  toast.error(
    <p data-test="graphql-error">
      <strong>Shoot! </strong>
      {/* <button onClick={() => notify()}>Ima need more than that</button> */}
      {error.message.replace("GraphQL error: ", "")}
    </p>
  )
  return (
    <ErrorStyles>
      <>
        {tronM && <p>{tronM}</p>}
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </>
    </ErrorStyles>
  )
}

DisplayError.defaultProps = {
  error: {},
}

DisplayError.propTypes = {
  error: PropTypes.object,
}

export default DisplayError
