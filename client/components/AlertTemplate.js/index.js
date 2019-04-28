import React, { Component } from "react"
// import AlertTemplate from "react-alert-template-basic"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import IconButton from "@material-ui/core/IconButton"
// icons
import CloseIcon from "../../styles/icons/CloseIcon"

const AlertTemplate = ({ style, options, message, close }) => (
  <SnackbarContent
    // className={classNames(classes[variant], className)}
    aria-describedby="client-snackbar"
    style={{ margin: "20px" }}
    color="primary"
    message={
      <div>
        <div style={style}>
          {options.type === "info" && "!"}
          {options.type === "success" && "👋 "}
          {options.type === "error" && "🤮 "}
          {message}
          <button onClick={close}>X</button>
        </div>
      </div>
    }
    action={[
      // actions,
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={close}>
        <CloseIcon />
      </IconButton>,
    ]}
    // {...other}
  />
)

export default AlertTemplate
