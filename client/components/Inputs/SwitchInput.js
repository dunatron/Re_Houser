import React from "react"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import FormGroup from "@material-ui/core/FormGroup"

const SwitchInput = ({ checked, onChange, label, checkedLabel = label }) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={onChange}
            aria-label="LoginSwitch"
          />
        }
        label={checked ? checkedLabel : label}
      />
    </FormGroup>
  )
}

export default SwitchInput
