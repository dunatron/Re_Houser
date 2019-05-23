import React, { useState } from "react"
import { connectSortBy } from "react-instantsearch-dom"

import SelectOption from "../../Inputs/SelectOption"

const MaterialUiSortBy = props => (
  <SelectOption
    name="name"
    label="Sort By"
    value={props.currentRefinement}
    options={props.items.map((item, i) => ({
      name: item.label,
      value: item.value,
    }))}
    handleChange={e => props.refine(e.target.value)}
  />
)

const ConnectedSortBy = connectSortBy(MaterialUiSortBy)

export default ConnectedSortBy
