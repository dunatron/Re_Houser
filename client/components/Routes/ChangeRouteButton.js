import React, { useState } from "react"
import Router from "next/router"
import { Button } from "@material-ui/core"

const handleLink = ({ route, query }) => {
  Router.push({
    pathname: route,
    query: query,
  })
}

const ChangeRouteButton = ({ route, query, color, title, variant, size }) => (
  <Button
    color={color}
    variant={variant}
    size={size}
    onClick={() => handleLink({ route, query })}>
    {title ? title : "Route Button"}
  </Button>
)

export default ChangeRouteButton
