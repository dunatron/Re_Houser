import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const styles = theme => ({
  searchField: {
    display: "block",
    margin: theme.spacing.unit,
  },
})

const SearchFilter = ({ classes, value, handleChange, fullWidth }) => {
  return (
    <TextField
      id="SearchFilter"
      label="Search Filter"
      className={classes.searchField}
      fullWidth
      value={value}
      onChange={e => handleChange(e.target.value)}
      margin="normal"
    />
  )
}

export default withStyles(styles)(SearchFilter)
