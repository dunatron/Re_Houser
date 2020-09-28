import React, { useState, useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

// import Drawer from '@material-ui/core/Drawer';
import {
  IconButton,
  Box,
  Paper,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
// import Divider from "@material-ui/core/Divider";
import CustomSearchBox from './CustomSearchBox';
import SettingsInputIcon from '@/Styles/icons/SettingsInputIcon';
import { SearchInterface } from './styles';
import PropertyCard from '@/Components/PropertyCard/index';
import SearchFilter from './SearchFilter';
import FilterDrawer from './FilterDrawer';
import { GoogleApiWrapper } from 'google-maps-react';

import PropertyResultHit from './PropertyResultHit';

// connected refinements
import ConnectedCurrentRefinements from './refinements/CurrentRefinements';
import {
  GoogleMapsLoader,
  Marker,
  Control,
  CustomMarker,
} from 'react-instantsearch-dom-maps';
import GeoSearch from './GeoSearch';

import {
  InstantSearch,
  Hits,
  connectHighlight,
  Pagination,
  Stats,
  SortBy,
  Configure,
  connectCurrentRefinements,
  CurrentRefinements,
  RefinementList,
} from 'react-instantsearch-dom';

import HorizonScrollHits from './HorizonScrollHits';

import Modal from '@/Components/Modal/index';
import SearchHeader from './SearchHeader';
import useStyles from './useStyles';

// THIS FOR NEXT JS
// https://github.com/algolia/react-instantsearch/tree/master/examples/next

var applicationId = process.env.ALGOLIA_APP_ID;
var apiKey = process.env.ALGOLIA_API_KEY;
const searchClient = algoliasearch(applicationId, apiKey);
const indexPrefix = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';

const Hit = ({ hit, me }) => (
  <div className="si-hit">
    <PropertyResultHit hit={hit} me={me} />
  </div>
);

Hit.propTypes = {
  hit: PropTypes.any.isRequired,
};

const Content = ({ me }) => (
  <div className="si-content">
    <div className="si-info">
      <Stats />
    </div>

    <HorizonScrollHits hitComponent={<Hit me={me} />} me={me} />
    <div className="pagination">
      {/* <ConnectedMaterialPagination /> */}
      <Pagination />
    </div>
  </div>
);

const PropertySearch = props => {
  const [open, setOpen] = useState(false);
  const { google, me } = props;
  const classes = useStyles();

  return (
    <InstantSearch
      indexName={`${indexPrefix}_PropertySearch`}
      searchClient={searchClient}>
      <SearchInterface>
        <div className={classes.root}>
          <Paper variant="outlined" square={true}>
            <Box className={classes.searchPanel}>
              <Box className={classes.leftSearchPanel}>
                <SearchHeader />
                <SearchFilter />
              </Box>
              <Box className={classes.rightSearchPanel}>
                <GeoSearch />
              </Box>
            </Box>
            {/* <RefinementList attribute="highestRoomPrice" />
            <RefinementList attribute="lowestRoomPrice" /> */}
            <ConnectedCurrentRefinements />
          </Paper>
          <Content me={me} />
        </div>
      </SearchInterface>
    </InstantSearch>
  );
};

PropertySearch.propTypes = {
  google: PropTypes.any.isRequired,
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(PropertySearch);
