import React, { useState, useRef, useEffect } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

import { Control, GeoSearch } from 'react-instantsearch-dom-maps';

import dynamic from 'next/dynamic';
import MapMarker from './MapMarker';

const DynamicPlacesSearch = dynamic(import('./places/widget'), {
  ssr: false,
});

const GeoSearchWidget = props => {
  const { google } = props;
  return (
    <>
      {/* <DynamicPlacesSearch /> */}
      <DynamicPlacesSearch
        defaultRefinement={{
          lat: -45.8642292,
          lng: 170.546515,
        }}
      />
      <GeoSearch
        google={google}
        initialZoom={8}
        initialPosition={{
          lat: -45.8642292,
          lng: 170.546515,
        }}
        enableRefineOnMapMove={true}
        enableRefine={true} // If true, the map is used for refining the search. Otherwise, it’s only for display purposes.
        mapTypeId={google.maps.MapTypeId.SATELLITE}>
        {({ hits }) => (
          <div>
            <Control />
            {hits.map(hit => (
              <MapMarker hit={hit} key={hit.objectID} />
            ))}
          </div>
        )}
      </GeoSearch>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(GeoSearchWidget);
