import React, { Component } from "react"
import PleaseSignIn from "../components/PleaseSignIn"
import Account from "../components/Account/index"

export default class AccountPage extends Component {
  render() {
    return (
      <div>
        <PleaseSignIn>
          <Account />
        </PleaseSignIn>
      </div>
    )
  }
}
