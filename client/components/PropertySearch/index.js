import React, { useState, useRef, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';
import PropTypes from 'prop-types';

// import Drawer from '@material-ui/core/Drawer';
import { IconButton, Paper, Grid, Toolbar } from '@material-ui/core';
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
  hit: PropTypes.any.isRequired
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
    rent: PropTypes.any
  }).isRequired
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
        <FilterDrawer open={open} handleClose={handleDrawerClose} />
        <Paper variant="outlined" square={true} style={{ padding: '8px' }}>
          <Toolbar
            disableGutters={true}
            variant="dense"
            style={{ marginBottom: '8px' }}>
            <CustomSearchBox fullWidth={true} />
          </Toolbar>
          <div>
            <GeoSearch />
          </div>

          <Grid container spacing={2} style={{ padding: '8px' }}>
            <Grid item xs={12} md={2}>
              <Paper style={{ height: '100%' }} square>
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
              <Paper style={{ height: '100%' }} square>
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
  google: PropTypes.any.isRequired
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(PropertySearch);
