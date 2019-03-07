import React from "react"
import { withStyles } from "@material-ui//core/styles"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import FormHelperText from "@material-ui/core/FormHelperText"
import Select from "@material-ui/core/Select/Select"

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    textAlign: "left",
    width: "100%",
    boxSizing: "border-box",
  },
  formContainer: {
    padding: `${theme.spacing.unit * 4}px 0`,
    height: theme.spacing.unit * 6,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  formControl: {
    minWidth: "180px",
    margin: theme.spacing.unit,
  },
  button: {
    borderRadius: 0,
  },
  codeEditor: {
    display: "flex",
    //width: `calc(100% - 241px)`,
    height: `calc(100vh - ${theme.spacing.unit * 28 + 4}px )`,
    margin: `0 -${theme.spacing.unit * 4}px`,
  },
  editorField: {
    //flex: '1 1 0'
    overflowX: "auto",
    flexBasis: 0,
    flexGrow: 1,
  },
})

const SelectOption = ({
  classes,
  value,
  name,
  options,
  label,
  selectID,
  helperText,
  handleChange,
}) => {
  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel htmlFor={selectID}>{label}</InputLabel>}
      <Select
        value={value}
        onChange={e => handleChange(e.target.value)}
        displayEmpty
        name={name}
        className={classes.selectEmpty}>
        {options.map((d, i) => {
          return (
            <MenuItem key={i} value={d.value}>
              {d.name}
            </MenuItem>
          )
        })}
      </Select>
      {helperText && <FormHelperText>Without label</FormHelperText>}
    </FormControl>
  )
}

export default withStyles(styles)(SelectOption)
