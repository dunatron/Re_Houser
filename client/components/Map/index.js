import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import useStyles from './useStyles';
import MapLoadingContainer from './MapLoadingContainer';

const MapContainer = props => {
  const { center, height } = props;
  const classes = useStyles();

  const onMarkerClick = () => {};

  const onInfoWindowClose = () => {};

  const _mapLoaded = (mapProps, map) => {
    map.setOptions({
      // styles: mapStyle,
    });
  };

  return (
    <div className={classes.mapWrapper}>
      <Map
        {...props}
        google={props.google}
        mapTypeId="SATELLITE"
        options={{
          mapTypeId: 'SATELLITE',
        }}
        onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        zoom={18}
        center={{
          lat: center ? center.lat : -46.1326615,
          lng: center ? center.lng : 168.89592100000004,
        }}
        initialCenter={{
          lat: center ? center.lat : -46.1326615,
          lng: center ? center.lng : 168.89592100000004,
        }}>
        <Marker onClick={onMarkerClick} name={'Current location'} />

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{
            lat: center ? center.lat : -46.1326615,
            lng: center ? center.lng : 168.89592100000004,
          }}
        />

        <InfoWindow onClose={onInfoWindowClose}>
          <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    </div>
  );
};

MapContainer.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.any,
    lng: PropTypes.any,
  }).isRequired,
  google: PropTypes.any,
  height: PropTypes.any,
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
  LoadingContainer: MapLoadingContainer,
})(MapContainer);
