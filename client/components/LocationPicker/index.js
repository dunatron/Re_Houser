import React, { useState, useRef, useEffect } from 'react';
import Map from '../Map/index';

import Typography from '@material-ui/core/Typography';
import StyledGeoSuggest from '../../styles/GeoSuggest';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';

/**
 * This is not ok,
 * https://github.com/facebook/react/issues/14994
 */
const LocationPicker = ({ selection, defaultLocation }) => {
  const geosuggestEl = useRef(null);
  const defaultState = {
    placeId: null,
    desc: '',
    lat: null,
    lng: null,
    showMap: true,
    country: 'NZ',
    type: 'geocode',
    ...defaultLocation,
    // type: 'ALL',
  };
  const [state, setState] = useState(defaultState);

  const fixtures = [
    // { label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } },
    // { label: 'Rio', location: { lat: -22.066452, lng: -42.9232368 } },
    // { label: 'Tokyo', location: { lat: 35.673343, lng: 139.710388 } },
  ];

  /**
   * When a suggest got selected
   */
  const onSuggestSelect = suggest => {
    if (!suggest) return;
    const { placeId, location, description, gmaps } = suggest;
    selection({
      placeId: placeId,
      lat: location.lat,
      lng: location.lng,
      desc: description,
    });
    setState({
      ...state,
      placeId: placeId,
      lat: location.lat,
      lng: location.lng,
      desc: description,
    });
  };

  const _getZoom = desc => {
    if (desc.length <= 3) {
      return 10;
    }
    if (desc.length <= 5) {
      return 11;
    }
    if (desc.length <= 8) {
      return 13;
    }
    if (desc.length <= 12) {
      return 14;
    }
    if (desc.length <= 17) {
      return 15;
    }
    if (desc.length <= 23) {
      return 16;
    }
    return 18;
  };

  return (
    <div>
      <StyledGeoSuggest
        ref={geosuggestEl}
        placeholder="Start typing!"
        // initialValue="Hamburg"
        fixtures={fixtures}
        onSuggestSelect={onSuggestSelect}
        // location={new google.maps.LatLng(53.558572, 9.9278215)}
        country="nz"
        queryDelay={250}
        // types={['establishment', 'geocode', 'regions', 'cities']}
        // location={new google.maps.LatLng(-46.1326615, 168.89592100000004)}
        radius="20"
      />
      {state.showMap && state.desc && (
        <Map
          center={{
            lat: state.lat,
            lng: state.lng,
          }}
          zoom={_getZoom(state.desc)}
        />
      )}
      {state.desc && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '16px 0',
            alignItems: 'center',
          }}>
          <LocationOnIcon color="secondary" />
          <Typography style={{ padding: '8px 16px' }}>{state.desc}</Typography>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
