import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

import { Control, GeoSearch } from 'react-instantsearch-dom-maps';

import MapMarker from './MapMarker';

/**
 * DOCS
 * https://www.algolia.com/doc/api-reference/widgets/geo-search/js/
 */
const GeoSearchWidget = props => {
  const { google } = props;
  const [enableRefine, setEnableRefine] = useState(true);
  const [enableRefineOnMapMove, setRefineOnMapMove] = useState(true);
  const [latPos, setLatPos] = useState(-43.5299773); // chch city center
  const [lngPos, setLngPos] = useState(172.6233322);

  return (
    <>
      <GeoSearch
        google={google}
        initialZoom={8}
        initialPosition={{
          lat: latPos,
          lng: lngPos,
        }}
        center={{
          lat: latPos,
          lng: lngPos,
        }}
        initialCenter={{
          lat: latPos,
          lng: lngPos,
        }}
        zoom={20}
        enableRefineOnMapMove={enableRefineOnMapMove}
        enableRefine={enableRefine} // If true, the map is used for refining the search. Otherwise, it’s only for display purposes.
        mapTypeId="hybrid" // hybrid, roadmap, satellite, terrain
      >
        {({ hits }) => (
          <div>
            {/* <Control /> */}
            {hits.map(hit => (
              <MapMarker hit={hit} key={hit.objectID} />
            ))}
          </div>
        )}
      </GeoSearch>
    </>
  );
};

GeoSearchWidget.propTypes = {
  google: PropTypes.any.isRequired
}

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(GeoSearchWidget);
