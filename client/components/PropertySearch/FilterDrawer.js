import React, { useState } from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Divider,
  Drawer,
  AppBar,
  Toolbar,
  FormGroup,
  FormControlLabel,
  Switch,
  List,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import Divider from "@material-ui/core/Divider";
import CustomSearchBox from './CustomSearchBox';
import SettingsIcon from '../../styles/icons/SettingsIcon';
import SettingsInputIcon from '../../styles/icons/SettingsInputIcon';
import CloseIcon from '../../styles/icons/CloseIcon';

import { SearchInterface } from './styles';

import ConnectedCheckBoxRefinementList from './refinements/CheckBoxList';
import ConnectedMaterialUiSortBy from './refinements/SortBy';
import ConnectedMaterialPagination from './refinements/Pagination';
import CustomHighlight from './refinements/CustomHiglight';
import PropertyCard from '../PropertyCard/index';
import SearchFilter from './SearchFilter';

//icons
import NavigateBeforeIcon from '../../styles/icons/NavigateBefore';
import NavigateNextIcon from '../../styles/icons/NavigateNext';
import SkipPreviousIcon from '../../styles/icons/SkipPrevious';
import SkipNextIcon from '../../styles/icons/SkipNext';

import {
  InstantSearch,
  Hits,
  connectHighlight,
  Pagination,
  Stats,
  SortBy,
  Configure,
  connectCurrentRefinements,
} from 'react-instantsearch-dom';

const useStyles = makeStyles(theme => ({
  drawerRoot: {},
  drawerPaper: {
    width: `${theme.sideBarWidth}px`,
  },
  drawerFullScreen: {
    width: '100%',
  },
  drawerHeader: {
    padding: '16px 0px 16px 16px',
  },
  drawerHeaderItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const FilterDrawer = ({ open, handleClose }) => {
  const classes = useStyles();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const paperClass = clsx({
    [classes.drawerPaper]: true,
    [classes.drawerFullScreen]: isFullScreen,
  });

  return (
    <Drawer
      className="si-drawer"
      classes={{
        root: classes.drawerRoot, // class name, e.g. `classes-nesting-root-x`
        paper: paperClass, // class name, e.g. `classes-nesting-label-x`
      }}
      variant="persistent"
      anchor="left"
      open={open}>
      <DrawHeader
        close={handleClose}
        fullScreen={isFullScreen}
        setFullScreen={() => setIsFullScreen(!isFullScreen)}
      />
      <Divider />
      <Sidebar fullScreen={isFullScreen} />
    </Drawer>
  );
};

const DrawHeader = ({ close, setFullScreen, isFullScreen }) => {
  const classes = useStyles();
  return (
    <div className={classes.drawerHeader}>
      <div className={classes.drawerHeaderItem}>
        <h4>Refine your search</h4>
        <IconButton onClick={close} className="si-drawer__close-btn">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.drawerHeaderItem}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={isFullScreen}
                onChange={setFullScreen}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            }
            label="Set full screen"
          />
        </FormGroup>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="si-drawer__sidebar" style={{ maxWidth: '100vw' }}>
    <div>
      <ConnectedCheckBoxRefinementList attribute="rooms" operator="or" />
      <ConnectedCheckBoxRefinementList attribute="type" operator="or" />
      <ConnectedCheckBoxRefinementList
        attribute="outdoorFeatures"
        operator="or"
      />
      <ConnectedCheckBoxRefinementList
        attribute="indoorFeatures"
        operator="or"
      />
      <ConnectedCheckBoxRefinementList attribute="price" operator="or" />
    </div>
  </div>
);

export default FilterDrawer;
