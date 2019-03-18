import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Dialog from "@material-ui/core/Dialog/Dialog"

const styles = {}

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue)
  }

  handleListItemClick = value => {
    this.props.onClose(value)
  }

  render() {
    const { classes, onClose, content, selectedValue, ...other } = this.props

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}>
        {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
        <div>{content}</div>
        <div />
      </Dialog>
    )
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
}

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog)

class DialogPopup extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = value => {
    this.setState({ selectedValue: value, open: false })
  }

  render() {
    const { text, content } = this.props
    return (
      <div style={{ display: "inline" }}>
        <span onClick={this.handleClickOpen} style={{ cursor: "pointer" }}>
          {text}
        </span>
        {/* <Button onClick={this.handleClickOpen}>{text}</Button> */}
        <SimpleDialogWrapped
          content={content}
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    )
  }
}

export default DialogPopup
