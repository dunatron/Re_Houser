import React, { Component } from "react"
import User from "../User/index"

export default class index extends Component {
  render() {
    return (
      <User>
        {({ data }) => {
          const me = data ? data.me : null
          if (!me) return null
          const { firstName, lastName, email, phone } = me
          return (
            <div>
              <h1>MY ACCOUNT</h1>
              <p>firstName: {firstName}</p>
              <p>lastName: {lastName}</p>
              <p>email: {email}</p>
              <p>phone: {phone}</p>
              <h1>License</h1>
              <p>
                License can be a form of identification when applying to lease a
                property
              </p>
            </div>
          )
        }}
      </User>
    )
  }
}
