import React, { useState } from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';
import clsx from 'clsx';
// import Drawer from '@material-ui/core/Drawer';
import {
  IconButton,
  Divider,
  Drawer,
  AppBar,
  Paper,
  Grid,
  Toolbar,
  List,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
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
import FilterDrawer from './FilterDrawer';

// connected refinements
import CurrentRefinements from './refinements/CurrentRefinements';

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

var applicationId = '4QW4S8SE3J';
var apiKey = '506b6dcf7516c20a1789e6eb9d9a5b39';
const searchClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const useStyles = makeStyles(theme => ({}));

const Hit = ({ hit }) => (
  <div className="si-hit">
    {/* <div className="si-hit__location">
      <CustomHighlight attribute={"location"} hit={hit} />
    </div> */}
    <PropertyCard property={hit} isSearch={true} />
  </div>
);

const Content = () => (
  <div className="si-content">
    <div className="si-info">
      <Stats />
      {/* <ConnectedMaterialUiSortBy
        items={[
          {
            value: `dev_PropertySearch`,
            label: "Development results",
          },
          {
            value: `prod_PropertySearch`,
            label: "Production results",
          },
        ]}
        defaultRefinement={`${indexPrefix}_PropertySearch`}
      /> */}
    </div>

    <Hits hitComponent={Hit} />
    <div className="pagination">
      <ConnectedMaterialPagination />
      <Pagination
        padding={5} // How many page links to display around the current page.'
        showLast={true} // Whether to display the last page link.
        showNext={true} // Whether to display the next page link.
        showPrevious={true} // Whether to display the previous page link.
        showFirst={true} // Whether to display the first page link.
        translations={{
          previous: (
            <div className="icon-ChevronLeft">
              <NavigateBeforeIcon />
            </div>
          ),
          next: (
            <div className="icon-ChevronRight">
              <NavigateNextIcon />
            </div>
          ),
          first: (
            <div className="double-chevron">
              <SkipPreviousIcon />
            </div>
          ),
          last: (
            <div className="double-chevron">
              <SkipNextIcon />
            </div>
          ),
          ariaPrevious: 'Previous page',
          ariaNext: 'Next page',
          ariaFirst: 'First page',
          ariaLast: 'Last page',
        }}
      />
    </div>
  </div>
);
// // si-drawer-sidebar
// const Sidebar = () => (
//   <div className="si-drawer__sidebar" style={{ maxWidth: '100vw' }}>
//     <div>
//       <ConnectedCheckBoxRefinementList attribute="rooms" operator="or" />
//       <ConnectedCheckBoxRefinementList attribute="type" operator="or" />
//       <ConnectedCheckBoxRefinementList
//         attribute="outdoorFeatures"
//         operator="or"
//       />
//       <ConnectedCheckBoxRefinementList
//         attribute="indoorFeatures"
//         operator="or"
//       />
//       <ConnectedCheckBoxRefinementList attribute="price" operator="or" />
//     </div>
//   </div>
// );

const PropertySearch = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDraw = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <h1>
      Well something broke this real good. Dont even think it was me. Look at
      Algolia
    </h1>
  );

  return (
    <InstantSearch
      indexName={`${indexPrefix}_PropertySearch`}
      searchClient={searchClient}>
      <SearchInterface>
        <FilterDrawer open={open} handleClose={handleDrawerClose} />
        <Paper variant="outlined" square={true} style={{ padding: '8px' }}>
          {/* <Toolbar disableGutters={!open}> */}
          <Toolbar disableGutters={true} variant="dense">
            <CustomSearchBox fullWidth={true} />
          </Toolbar>
          <Grid container spacing={2} style={{ padding: '8px' }}>
            <Grid item xs={12} md={2}>
              <Paper style={{ height: '100%' }}>
                <IconButton
                  // color="default"
                  color={open ? 'primary' : 'default'}
                  style={{ margin: '0 12px 0 0' }}
                  aria-label="Open drawer"
                  onClick={toggleDraw}>
                  <SettingsInputIcon />
                </IconButton>{' '}
                Filter Facets
              </Paper>
            </Grid>
            <Grid item xs={12} md={10}>
              <Paper style={{ height: '100%' }}>
                <SearchFilter />
              </Paper>
            </Grid>
          </Grid>
          <CurrentRefinements />
        </Paper>

        <Content />
      </SearchInterface>
    </InstantSearch>
  );
};

PropertySearch.propTypes = {
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
};

export default PropertySearch;
