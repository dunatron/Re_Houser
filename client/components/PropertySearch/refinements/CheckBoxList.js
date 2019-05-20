import { connectRefinementList } from "react-instantsearch-dom"
import { Checkbox, FormControlLabel, List } from "@material-ui/core"

const MaterialUiCheckBoxRefinementList = ({
  items,
  attribute,
  refine,
  createURL,
}) => {
  return (
    <List>
      <h1>{attribute.toUpperCase()}</h1>
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
  )
}

const CheckBoxList = connectRefinementList(MaterialUiCheckBoxRefinementList)

export default CheckBoxList
