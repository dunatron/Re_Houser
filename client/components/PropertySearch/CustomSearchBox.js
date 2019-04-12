import { connectSearchBox } from "react-instantsearch-dom"
import TextField from "@material-ui/core/TextField"
import styled from "styled-components"
import Button from "@material-ui/core/Button"

const SearchTextInput = styled(TextField)`
  && {
    input {
      font-size: 36px;
    }
  }
`

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    {/* <input
      type="search"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    /> */}
    <SearchTextInput
      type="search"
      placeholder="Search Property stuff .. anything really "
      style={{ fontSize: "36px" }}
      fullWidth={true}
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
    {isSearchStalled ? "My search is stalled" : ""}
  </form>
)

const CustomSearchBox = connectSearchBox(SearchBox)

export default CustomSearchBox
