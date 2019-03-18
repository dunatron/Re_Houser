import React from "react"
import { withStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import Chip from "@material-ui/core/Chip"
import Input from "@material-ui/core/Input"
import LabelIcon from "@material-ui/icons/Label"

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

const MultiSelectChip = ({
  classes,
  values,
  options,
  label,
  selectID,
  handleChange,
  removeItem,
}) => {
  console.log("options => ", options)
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={selectID}>{label}</InputLabel>
      <Select
        multiple={true}
        value={values}
        onChange={e => handleChange(e.target.value)}
        inputProps={{
          name: selectID,
          id: selectID,
        }}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => {
              const label = options.find(o => o.value === value)
              return (
                <Chip
                  onDelete={() => removeItem(value)}
                  icon={<LabelIcon mini />}
                  variant="outlined"
                  color="secondary"
                  label={label.name}
                  className={classes.chip}
                  key={value}
                />
              )
            })}
          </div>
        )}
        input={<Input id="select-multiple-chip" />}>
        {options.map((d, i) => {
          return (
            <MenuItem key={i} value={d.value}>
              {d.name}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

export default withStyles(styles)(MultiSelectChip)
