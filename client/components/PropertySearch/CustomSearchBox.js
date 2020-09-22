import PropTypes from 'prop-types';
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

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.contrastText,
    fontSize: '26px',
    // border: '2px solid red',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
  const classes = useStyles();
  return (
    <Input
      id="property-main-search-input"
      type="search"
      value={currentRefinement}
      className={classes.root}
      placeholder="Location"
      onChange={event => refine(event.currentTarget.value)}
      endAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.any.isRequired,
  isSearchStalled: PropTypes.any.isRequired,
  refine: PropTypes.func.isRequired,
};

const CustomSearchBox = connectSearchBox(SearchBox);

export default CustomSearchBox;
