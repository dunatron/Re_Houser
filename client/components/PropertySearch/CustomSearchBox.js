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

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <FormControl fullWidth={true}>
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
);

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
