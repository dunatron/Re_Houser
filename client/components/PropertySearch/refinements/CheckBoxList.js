import React, { useState } from "react"
import { connectRefinementList } from "react-instantsearch-dom"
import {
  Collapse,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@material-ui/core"

import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import DraftsIcon from "@material-ui/icons/Drafts"
import SendIcon from "@material-ui/icons/Send"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import StarBorder from "@material-ui/icons/StarBorder"

const MaterialUiCheckBoxRefinementList = ({
  items,
  attribute,
  refine,
  createURL,
}) => {
  const [open, setOpen] = useState(false)
  console.log("attribute => ", attribute)
  console.log("items => ", items)

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText inset primary={attribute.toUpperCase()} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {items.map(({ count, isRefined, label, value }, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={isRefined}
                  onClick={event => {
                    event.preventDefault()
                    refine(value)
                  }}
                  value="checkedA"
                />
              }
              label={label}
            />
          ))}
        </List>
      </Collapse>
    </>
  )
}

const CheckBoxList = connectRefinementList(MaterialUiCheckBoxRefinementList)

export default CheckBoxList
