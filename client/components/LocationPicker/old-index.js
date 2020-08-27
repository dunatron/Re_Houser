import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Geosuggest from 'react-geosuggest';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import Map from '../Map/index';
import SelectOption from '../Inputs/SelectOption';
// Advanced Expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CountryCodesArray } from '../../lib/countryCodes';
import { LOCATION_TYPES } from '../../lib/locationTypes';
import { WORLD_FIXTURES } from '../../lib/locationFixtures';

import styled from 'styled-components';

// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';

const StylesGeoSuggest = styled(Geosuggest)`
  .geosuggest {
    font-size: 18px;
    font-size: 1rem;
    position: relative;
    width: 50%;
    margin: 1em auto;
    text-align: left;
  }
  .geosuggest__input {
    width: 100%;
    border: 2px solid ${p => p.theme.palette.background.paper};
    background: ${p => p.theme.palette.background.paper};
    box-shadow: 0 0 1px ${p => p.theme.palette.primary.main};
    color: ${p => p.theme.palette.text.primary};
    padding: ${p => p.theme.spacing(2)}px;
    -webkit-transition: border 0.2s, box-shadow 0.2s;
    transition: border 0.2s, box-shadow 0.2s;
  }
  .geosuggest__input:focus {
    border-color: ${p => p.theme.palette.primary.main};
    outline: none;
  }
  .geosuggest__suggests {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 25em;
    padding: 0;
    margin-top: -1px;
    background: ${p => p.theme.palette.secondary.main};
    color: ${p => p.theme.palette.secondary.contrastText};
    border: 2px solid #267dc0;
    border-top-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
    list-style: none;
    z-index: 5;
    -webkit-transition: max-height 0.2s, border 0.2s;
    transition: max-height 0.2s, border 0.2s;
  }
  .geosuggest__suggests--hidden {
    max-height: 0;
    overflow: hidden;
    border-width: 0;
  }

  /**
 * A geosuggest item
 */
  .geosuggest__item {
    font-size: 18px;
    font-size: 1rem;
    padding: 0.5em 0.65em;
    cursor: pointer;
  }
  .geosuggest__item:hover,
  .geosuggest__item:focus {
    /* background: #f5f5f5; */
    background: ${p => p.theme.palette.primary.main};
    color: ${p => p.theme.palette.primary.contrastText};
  }
  .geosuggest__item--active {
    background: #267dc0;
    color: #fff;
  }
  .geosuggest__item--active:hover,
  .geosuggest__item--active:focus {
    background: #ccc;
  }
  .geosuggest__item__matched-text {
    font-weight: bold;
  }
`;

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
  /**
   * When the input receives focus
   */
  const onFocus = e => {};
  /**
   * When the input loses focus
   */
  const onBlur = e => {};
  /**
   * When the input got changed
   */
  const onChange = v => {};
  /**
   * When a suggest got selected
   */
  const _suggest = suggestion => {
    let lat,
      lng,
      desc = '';
    if (!suggestion) {
      return;
    }
    const { placeId, location, description, gmaps } = suggestion;
    const shouldStayOpen = () => {
      // this._geoSuggest.focus()
    };

    if (description) {
      desc = description;
    }

    if (location) {
      lat = location.lat;
      lng = location.lng;
    }
    // suggestion is returning map info
    selection({
      placeId: placeId,
      lat: lat,
      lng,
      desc,
    });

    setState({
      ...state,
      placeId: placeId,
      lat: lat,
      lng,
      desc: desc,
    });
    shouldStayOpen();
  };

  /**
   * When there are no suggest results
   */
  const onSuggestNoResults = userInput => {};

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

  const _getFixtures = () => {
    // if (state.country) {
    //   return WORLD_FIXTURES.filter(
    //     fixture => fixture.countyCode === state.country
    //   );
    // }
    return false;
  };

  useEffect(() => {
    geosuggestEl.current.update(state.desc);
  }, []);

  // ToDo: compose the google props into a global to be able to be used
  // ToDo: make sure a selection ends in refocusing the input field

  return (
    <div>
      <StylesGeoSuggest
        ref={geosuggestEl}
        fixtures={_getFixtures()}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onChange={onChange}
        // onSuggestSelect={suggestion => _suggest(suggestion)}
        // onSuggestNoResults={onSuggestNoResults}
        location={new google.maps.LatLng(-46.1326615, 168.89592100000004)}
        types={state.type === 'ALL' ? null : state.types}
        radius="20"
        country={state.country === 'ALL' ? null : state.country}
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