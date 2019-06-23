import React from "react"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import moment from "moment"

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

/**
 * https://stackoverflow.com/questions/7372038/is-there-any-way-to-change-input-type-date-format
 * I was hoping to use material-ui/pickers but they are not fit for SSR
 * 1. use local date
 * 2. use moment and our db format
 * 3. catch our db format before entering datepicker and convert to YYYY-MM-DD as I am led to believe
 * 4. feed it into picker
 * 5. onChange convert into our db format and send back up
 */
/**
 *
 * Do I, seperate these out into two seperate components, e.g, date vs datetime-local
 * times and dates are crucial to get right
 */
const DateInput = ({ id, classes, value, onChange, label }) => {
  // const RFCIsoValue = moment(value).format("YYYY-MM-DD")
  const RFCIsoValue = moment(value).format("YYYY-MM-DDTkk:mm")
  //
  return (
    <TextField
      className={classes.textField}
      id={id ? id : "default-datePicker"}
      label={label ? label : "Some Date"}
      margin="normal"
      type="datetime-local"
      // value={RFCIsoValue}
      value={RFCIsoValue}
      onChange={e => {
        const formattedDate = moment(e.target.value).format()
        onChange(formattedDate)
      }}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default withStyles(styles)(DateInput)
