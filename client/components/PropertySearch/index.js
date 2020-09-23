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
import CurrentRefinements from './refinements/CurrentRefinements';
import {
  GoogleMapsLoader,
  Marker,
  Control,
  CustomMarker,
} from 'react-instantsearch-dom-maps';
import GeoSearch from './GeoSearch';

// import Places from './places/widget';

//icons
import NavigateBeforeIcon from '@/Styles/icons/NavigateBefore';
import NavigateNextIcon from '@/Styles/icons/NavigateNext';
import SkipPreviousIcon from '@/Styles/icons/SkipPrevious';
import SkipNextIcon from '@/Styles/icons/SkipNext';
import VisibilityIcon from '@material-ui/icons/Visibility';

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

const Hit = ({ hit }) => (
  <div className="si-hit">
    <PropertyResultHit hit={hit} />
  </div>
);

Hit.propTypes = {
  hit: PropTypes.any.isRequired,
};

const MapMarker = ({ hit }) => {
  const node = useRef();
  const [showMore, setShowMore] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setShowMore(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // maybe a quick trick with the modal inside the marker node so it doesnt close
  // also the card for the modal. Then normal whatever it was doing right?
  return (
    <CustomMarker key={hit.objectID} hit={hit}>
      <div ref={node} onClick={() => setShowMore(true)} className="map-marker">
        <Modal
          title={hit.location}
          open={modalOpen}
          disableBackdrop={true}
          close={() => setModalOpen(false)}>
          <PropertyCard property={hit} isSearch={true} />
        </Modal>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          ${hit.rent}
          {showMore && (
            <IconButton onClick={() => setModalOpen(true)}>
              <VisibilityIcon />
            </IconButton>
          )}
        </div>
        {showMore && <p className="marker-location-text">{hit.location}</p>}
      </div>
    </CustomMarker>
  );
};

MapMarker.propTypes = {
  hit: PropTypes.shape({
    location: PropTypes.any,
    objectID: PropTypes.any,
    rent: PropTypes.any,
  }).isRequired,
};

const Content = () => (
  <div className="si-content">
    <div className="si-info">
      <Stats />
    </div>

    <HorizonScrollHits hitComponent={Hit} />
    <div className="pagination">
      {/* <ConnectedMaterialPagination /> */}
      <Pagination />
    </div>
  </div>
);

const PropertySearch = props => {
  const [open, setOpen] = useState(false);
  const { google } = props;
  const classes = useStyles();

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
    <InstantSearch
      indexName={`${indexPrefix}_PropertySearch`}
      searchClient={searchClient}>
      <SearchInterface>
        <div className={classes.root}>
          <FilterDrawer open={open} handleClose={handleDrawerClose} />

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
            <CurrentRefinements />
          </Paper>
          <Content />
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
