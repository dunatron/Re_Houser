import { connectSearchBox } from 'react-instantsearch-dom';
import styled from 'styled-components';
import {
  FormControl,
  TextField,
  InputLabel,
  Button,
  Input,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';

const SearchTextInput = styled(TextField)`
  && {
    input {
      font-size: 18px;
    }
  }
`;

// const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
//   <form noValidate action="" role="search">
//     {/* <input
//       type="search"
//       value={currentRefinement}
//       onChange={event => refine(event.currentTarget.value)}
//     /> */}
//     <SearchTextInput
//       type="search"
//       placeholder="Search Property stuff .. anything really "
//       style={{ fontSize: "36px" }}
//       fullWidth={true}
//       value={currentRefinement}
//       onChange={event => refine(event.currentTarget.value)}
//     />
//     {isSearchStalled ? "My search is stalled" : ""}
//   </form>
// )
const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <FormControl fullWidth={true}>
    {/* <InputLabel htmlFor="input-with-icon-adornment">
      With a start adornment
    </InputLabel> */}
    <Input
      id="property-main-search-input"
      type="search"
      value={currentRefinement}
      style={{
        fontSize: '26px',
      }}
      placeholder="search e.g Te Aro Wellington"
      onChange={event => refine(event.currentTarget.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  </FormControl>
  // <SearchTextInput
  //   type="search"
  //   placeholder="search e.g Te Aro Wellington"
  //   startAdornment={
  //     <InputAdornment position="start">
  //       <AccountCircle />
  //     </InputAdornment>
  //   }
  //   style={{ fontSize: '36px' }}
  //   fullWidth={true}
  //   value={currentRefinement}
  //   variant="standard"
  //   onChange={event => refine(event.currentTarget.value)}
  // />
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
