import React, { Component } from "react"
import Router from "next/router"
import NavButton from "../../styles/NavButton"

const handleLink = (route = "/", query = {}) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <NavButton
          color="secondary"
          onClick={() => handleLink("/my/applications")}>
          applications
        </NavButton>
        <NavButton
          color="secondary"
          onClick={() => handleLink("/my/properties")}>
          Properties
        </NavButton>
      </div>
    )
  }
}
