import React, { Fragment } from "react"
import { connectCurrentRefinements } from "react-instantsearch-dom"
import Chip from "@material-ui/core/Chip"
import Styled from "styled-components"

const CurrentRefinementStyles = Styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  .refinement-group {
    /* padding: 16px 16px 0 16px; */
    padding: 0 16px;
  }
  .refinement-group__label {
    color: ${props => props.theme.palette.secondary.main}
    /* color: red; */
    /* border: ${props => props.border}; */
  }
  .refinement-group__list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
  .refinement-listItem {
    list-style: none;
  }
  .refinement-chip {
    margin: 0 6px 6px 0
  }
`

const RefinementValue = ({ item, refine, url }) => {
  return (
    <Chip
      size="small"
      className="refinement-chip"
      label={item.label}
      onDelete={() => refine(item.value)}
      // className={classes.chip}
      color="primary"
      variant="outlined"
    />
  )
}

const RefinementGroupList = ({ item, refine, createURL }) => {
  return (
    <div className="refinement-group">
      <span className="refinement-group__label">{item.label}</span>
      <ul className="refinement-group__list">
        {item.items.map(nested => (
          <li key={nested.label} className="refinement-listItem">
            <RefinementValue
              refine={refine}
              item={nested}
              url={createURL(nested.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const CurrentRefinements = ({ items, refine, createURL }) => (
  <CurrentRefinementStyles>
    {items.map(item => (
      <li key={item.label} className="refinement-listItem">
        {item.items ? (
          <RefinementGroupList
            item={item}
            refine={refine}
            createURL={createURL}
          />
        ) : (
          <RefinementValue
            refine={refine}
            item={item}
            url={createURL(item.value)}
          />
        )}
      </li>
    ))}
  </CurrentRefinementStyles>
)

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements)

export default CustomCurrentRefinements
