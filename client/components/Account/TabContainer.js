import React, { Component } from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const TabContainer = ({ children, dir, containerStyles }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: `16px 0`, display: "flex", flexWrap: "wrap", ...containerStyles }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

export default TabContainer
