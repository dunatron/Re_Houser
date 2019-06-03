import React, { Component, useState, useEffect } from "react"
import { CardElement, injectStripe } from "react-stripe-elements"
import ErrorMessage from "../ErrorMessage/index"
//create your forceUpdate hook
function useForceUpdate() {
  console.log("Re-render")
  const [value, set] = useState(true) //boolean state
  return () => set(!value) // toggle the state to force render
}

const handleBlur = () => {
  console.log("[blur]")
}
const handleChange = change => {
  console.log("[change]", change)
}
const handleClick = () => {
  console.log("[click]")
}
const handleFocus = () => {
  console.log("[focus]")
}
const handleReady = () => {
  console.log("[ready]")
}

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
  console.log("DO I fire on rerender?")
  const [hasStripe, setHasStripe] = useState(props.stripe)
  const [errors, setErrors] = useState([])
  const forceUpdate = useForceUpdate()

  const submit = async ev => {
    // console.log("This.props checkout form => ", this.props)
    // let { token } = await this.props.stripe.createToken({ name: "Name" })
    // console.log("THE TOKEN => ", token)
    // // let response = await fetch("/charge", {
    // //   method: "POST",
    // //   headers: { "Content-Type": "text/plain" },
    // //   body: token.id,
    // // })

    // if (response.ok) console.log("Purchase Complete!")
    ev.preventDefault()
    if (props.stripe) {
      // props.stripe
      //   .createToken()
      //   // .then(payload => console.log("[token]", payload))
      //   .then(payload => {
      //     console.log("payload => ", payload)
      //     if (payload.error) setErrors([payload.error])
      //   })
      const res = await props.stripe.createToken({
        type: "card",
        name: "Jenny Rosen",
        email: "heath.hd@gmail.com",
      })
      console.log("My res =>< ", res)
      // const { error, token } = await props.stripe.createToken({
      //   type: "card",
      //   name: "Jenny Rosen",
      // })
      // if (error) setErrors([error])
      // console.log("My res =>< ", error)
    } else {
      console.log("Stripe.js hasn't loaded yet.")
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

// class CheckoutForm extends Component {
//   constructor(props) {
//     super(props)
//     this.submit = this.submit.bind(this)
//   }

//   async submit(ev) {
//     // console.log("This.props checkout form => ", this.props)
//     // let { token } = await this.props.stripe.createToken({ name: "Name" })
//     // console.log("THE TOKEN => ", token)
//     // // let response = await fetch("/charge", {
//     // //   method: "POST",
//     // //   headers: { "Content-Type": "text/plain" },
//     // //   body: token.id,
//     // // })

//     // if (response.ok) console.log("Purchase Complete!")
//     ev.preventDefault()
//     if (this.props.stripe) {
//       this.props.stripe
//         .createToken()
//         .then(payload => console.log("[token]", payload))
//     } else {
//       console.log("Stripe.js hasn't loaded yet.")
//     }
//   }

//   render() {
//     return (
//       <div className="checkout">
//         <p>Would you like to complete the purchase?</p>
//         <CardElement />
//         <button onClick={this.submit}>Send</button>
//       </div>
//     )
//   }
// }

// export default injectStripe(CheckoutForm)
