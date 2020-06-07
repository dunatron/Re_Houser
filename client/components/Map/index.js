import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mapWrapper: {
    position: 'relative',
    height: '240px',
    [theme.breakpoints.up('md')]: {
      height: '334px',
    },
  },
}));

const MapContainer = props => {
  const { center, height } = props;
  const classes = useStyles();

  const onMarkerClick = () => {};

  const onInfoWindowClose = () => {};

  return (
    <div className={classes.mapWrapper}>
      <Map
        google={props.google}
        zoom={18}
        center={{
          lat: center ? center.lat : -46.1326615,
          lng: center ? center.lng : 168.89592100000004,
        }}
        initialCenter={{
          lat: center ? center.lat : -46.1326615,
          lng: center ? center.lng : 168.89592100000004,
        }}
        {...props}>
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

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY,
})(MapContainer);
