import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    // maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
})

const TextInput = ({ classes, value, onChange }) => {
  return (
    <TextField
      id="standard-name"
      label="Name"
      className={classes.textField}
      value={this.state.name}
      onChange={onChange}
      margin="normal"
    />
  )
}

export default withStyles(styles)(TextInput)
