import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchFilter from '../Inputs/SearchFilter';
import SelectOption from '../Inputs/SelectOption';

const styles = theme => ({
  root: {},
  content: {
    overflow: 'hidden',
    flexBasis: '100%',
    transition: 'all 0.5s ease',
  },
  closed: {
    height: 0,
    minHeight: 0,
    opacity: 0,
  },
  open: {
    opacity: 1,
    height: theme.spacing(15),
    minHeight: theme.spacing(15),
  },
});

const SearchBar = ({
  classes,
  searchCol,
  searchVal,
  updateSearchCol,
  updateSearchVal,
  options,
  open,
}) => {
  const contentClasses = [classes.content];
  open
    ? contentClasses.push(classes.open)
    : contentClasses.push(classes.closed);
  return (
    <Fragment>
      <div className={contentClasses.join(' ')}>
        <SelectOption
          label="Column Filter"
          value={searchCol}
          selectID={'SearchFilter'}
          handleChange={e => updateSearchCol(e.target.value)}
          options={options}
        />
        <SearchFilter
          value={searchVal}
          handleChange={val => updateSearchVal(val)}
        />
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(SearchBar);
