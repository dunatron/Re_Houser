import React from "react"
import { withStyles } from "@material-ui/core/styles"
import CheckBoxSelection from "../Inputs/CheckBoxSelection"

const styles = theme => ({
  root: {},
  content: {
    overflow: "hidden",
    flexBasis: "100%",
    transition: "all 0.5s ease",
  },
  closed: {
    height: 0,
    minHeight: 0,
    opacity: 0,
  },
  open: {
    overflow: "auto",
    opacity: 1,
    // height: theme.spacing.unit * 8,
    // minHeight: theme.spacing.unit * 8,
  },
})

const FilterBar = props => {
  const contentClasses = [props.classes.content]
  props.open
    ? contentClasses.push(props.classes.open)
    : contentClasses.push(props.classes.closed)
  return (
    <div className={contentClasses.join(" ")}>
      <CheckBoxSelection
        options={props.columnHeaders}
        handleOptionChange={optionObj => {
          props.updateShowProp(optionObj)
        }}
      />
    </div>
  )
}

export default withStyles(styles)(FilterBar)
