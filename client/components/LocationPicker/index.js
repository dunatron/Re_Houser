import React, { useState } from 'react';
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

/**
 * This is not ok,
 * https://github.com/facebook/react/issues/14994
 */
const LocationPicker = ({ selection }) => {
  const defaultState = {
    desc: '',
    lat: null,
    lng: null,
    showMap: true,
    country: 'NZ',
    type: 'geocode',
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
    const { location, description, gmaps } = suggestion;
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
      lat: lat,
      lng,
      desc,
    });

    setState({
      ...state,
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

  // ToDo: compose the google props into a global to be able to be used
  // ToDo: make sure a selection ends in refocusing the input field

  return (
    <div>
      <Geosuggest
        // ref={el => (_geoSuggest = el)}
        fixtures={_getFixtures()}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onSuggestSelect={suggestion => _suggest(suggestion)}
        onSuggestNoResults={onSuggestNoResults}
        location={new google.maps.LatLng(-46.1326615, 168.89592100000004)}
        types={state.type === 'ALL' ? null : state.types}
        radius="20"
        country={state.country === 'ALL' ? null : state.country}
      />
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Location advanced Options</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'flex', flexWrap: 'wrap' }}>
            <SelectOption
              label="Country"
              value={state.country}
              options={[{ name: 'ALL', value: 'ALL' }].concat(
                CountryCodesArray
              )}
              handleChange={e =>
                setState({ ...state, country: e.target.value })
              }
            />

            <SelectOption
              label="Type"
              value={state.type}
              options={[{ name: 'ALL', value: 'ALL' }].concat(LOCATION_TYPES)}
              handleChange={e => setState({ ...state, type: e.target.value })}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {state.showMap && (
        <Map
          center={{
            lat: state.lat,
            lng: state.lng,
          }}
          zoom={_getZoom(state.desc)}
        />
      )}
    </div>
  );
};

export default LocationPicker;
