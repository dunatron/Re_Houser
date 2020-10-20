import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  searchField: {
    display: 'block',
    margin: theme.spacing(1),
  },
});

const SearchFilter = ({ classes, value, handleChange, fullWidth }) => {
  return (
    <TextField
      id="SearchFilter"
      label="Search Filter"
      className={classes.searchField}
      fullWidth
      value={value}
      onChange={e => handleChange(e.target.value)}
      margin="normal"
    />
  );
};

SearchFilter.propTypes = {
  classes: PropTypes.shape({
    searchField: PropTypes.any
  }).isRequired,
  fullWidth: PropTypes.any,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default withStyles(styles)(SearchFilter);
