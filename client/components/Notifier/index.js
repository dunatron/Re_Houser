// import React, { Component } from "react"
// import Snackbar from "@material-ui/core/Snackbar"
// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import CloseIcon from "@material-ui/icons/Close"
// let openSnackbarFn
// class Notifier extends React.Component {
//   // 1. set the Notifier's initial state
//   state = {
//     open: false,
//     message: "",
//     duration: 3000,
//   }
//   componentDidMount() {
//     openSnackbarFn = this.openSnackbar
//   }
//   // 2. define a function to open Snackbar and show a message
//   openSnackbar = ({ message, duration }) => {
//     this.setState({
//       open: true,
//       message,
//       duration,
//     })
//   }
//   // 3. define a function to close Snackbar when a user clicks away
//   handleSnackbarClose = () => {
//     this.setState({
//       open: false,
//       message: "",
//     })
//   }
//   render() {
//     // 4. show a message to users
//     const message = (
//       <span
//         id="snackbar-message-id"
//         dangerouslySetInnerHTML={{ __html: this.state.message }}
//       />
//     )
//     return (
//       <div>
//         <Snackbar
//           // 5. write styles and pass props to the Snackbar component
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           message={message}
//           autoHideDuration={this.state.duration}
//           onClose={this.handleSnackbarClose}
//           open={this.state.open}
//           variant="warning"
//           action={[
//             <IconButton
//               key="close"
//               aria-label="Close"
//               color="secondary"
//               // color="inherit"
//               onClick={() => this.handleSnackbarClose()}>
//               <CloseIcon />
//             </IconButton>,
//           ]}
//           SnackbarContentProps={{
//             "aria-describedby": "snackbar-message-id",
//           }}
//         />
//       </div>
//     )
//   }
// }

// export function openSnackbar({ message, duration = 3000 }) {
//   openSnackbarFn({ message, duration })
// }

// export default Notifier

import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Button from "@material-ui/core/Button"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ErrorIcon from "@material-ui/icons/Error"
import InfoIcon from "@material-ui/icons/Info"
import CloseIcon from "@material-ui/icons/Close"
import green from "@material-ui/core/colors/green"
import amber from "@material-ui/core/colors/amber"
import IconButton from "@material-ui/core/IconButton"
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import WarningIcon from "@material-ui/icons/Warning"
import { withStyles } from "@material-ui/core/styles"

let openSnackbarFn
let closeSnackBarFn

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}
const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
)

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
})

function MySnackbarContent(props) {
  const {
    classes,
    className,
    message,
    onClose,
    variant,
    actions,
    ...other
  } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        actions,
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
})

class Notifier extends React.Component {
  componentDidMount() {
    openSnackbarFn = this.openSnackbar
    closeSnackBarFn = this.closeSnackbar
  }
  // 2. define a function to open Snackbar and show a message
  // openSnackbar = ({ message, duration, actions }) => {
  //   this.setState({
  //     open: true,
  //     message,
  //     duration,
  //     actions,
  //   })
  // }
  state = {
    open: false,
    message: "",
    duration: 3000,
    type: "info",
    actions: [],
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
  }

  // 2. define a function to open Snackbar and show a message
  openSnackbar = ({ message, duration, type, actions }) => {
    this.setState({
      open: true,
      message,
      duration,
      type: type ? type : "info",
      actions: actions ? actions : [],
    })
  }
  closeSnackbar = () => {
    this.setState({
      open: false,
      message: "",
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
    const { classes } = this.props
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
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}>
          <MySnackbarContentWrapper
            onClose={this.handleSnackbarClose}
            variant={this.state.type ? this.state.type : "warning"} // [success, warning, error, info]
            message={message}
            actions={this.state.actions}
          />
        </Snackbar>
      </div>
    )
  }
}

Notifier.propTypes = {
  classes: PropTypes.object.isRequired,
}

export function openSnackbar({ message, duration = 3000, type, actions = [] }) {
  openSnackbarFn({ message, duration, type, actions })
}

export function closeSnackBar() {
  closeSnackBarFn()
}

export default withStyles(styles2)(Notifier)
