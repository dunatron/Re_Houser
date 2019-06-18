import React, { Component, useState, useEffect } from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import ErrorMessage from "../ErrorMessage/index"
//create your forceUpdate hook
function useForceUpdate() {
  const [value, set] = useState(true) //boolean state
  return () => set(!value) // toggle the state to force render
}

const handleBlur = () => {}
const handleChange = change => {}
const handleClick = () => {}
const handleFocus = () => {}
const handleReady = () => {}

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding,
      },
      invalid: {
        color: "#9e2146",
      },
    },
  }
}

const CheckoutForm = props => {
  const [hasStripe, setHasStripe] = useState(props.stripe)
  const [errors, setErrors] = useState([])
  const forceUpdate = useForceUpdate()

  const submit = async ev => {
    ev.preventDefault()
    if (props.stripe) {
      const res = await props.stripe.createToken({
        type: "card",
        name: "Jenny Rosen",
        email: "heath.hd@gmail.com",
      })
    } else {
      alert("Sorry about this. Try visiting another page and coming back")
    }
  }

  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onReady={handleReady}
        {...createOptions(props.fontSize)}
      />
      <button onClick={forceUpdate}>Click to re-render</button>
      {errors.map(error => (
        <ErrorMessage error={error} />
      ))}
      <button onClick={submit}>Send</button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
