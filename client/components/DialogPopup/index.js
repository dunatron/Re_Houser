import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import Slide from "@material-ui/core/Slide"

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const DialogPopup = ({ isOpen }) => {
  const [open, setOpen] = useState(isOpen)
  useEffect(() => setOpen(isOpen), [isOpen])
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogPopup
