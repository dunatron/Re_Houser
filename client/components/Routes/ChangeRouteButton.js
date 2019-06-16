import React, { useState } from "react"
import PropTypes from "prop-types"

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

ChangeRouteButton.propTypes = {
  route: PropTypes.string.isRequired,
  query: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  variant: PropTypes.oneOf(["text", "outlined", "contained"]),
}

export default ChangeRouteButton
