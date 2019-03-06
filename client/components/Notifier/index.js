import React, { Component } from "react"
import Snackbar from "@material-ui/core/Snackbar"
let openSnackbarFn
class Notifier extends React.Component {
  // 1. set the Notifier's initial state
  state = {
    open: false,
    message: "",
    duration: 3000,
  }
  componentDidMount() {
    openSnackbarFn = this.openSnackbar
  }
  // 2. define a function to open Snackbar and show a message
  openSnackbar = ({ message, duration }) => {
    this.setState({
      open: true,
      message,
      duration,
    })
  }
  // 3. define a function to close Snackbar when a user clicks away
  handleSnackbarClose = () => {
    this.setState({
      open: false,
      message: "",
    })
  }
  render() {
    // 4. show a message to users
    const message = (
      <span
        id="snackbar-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    )
    return (
      <div>
        <Snackbar
          // 5. write styles and pass props to the Snackbar component
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          message={message}
          autoHideDuration={this.state.duration}
          onClose={this.handleSnackbarClose}
          open={this.state.open}
          SnackbarContentProps={{
            "aria-describedby": "snackbar-message-id",
          }}
        />
      </div>
    )
  }
}

export function openSnackbar({ message, duration = 3000 }) {
  openSnackbarFn({ message, duration })
}

export default Notifier
