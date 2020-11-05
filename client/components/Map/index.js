import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Switch,
  Typography,
  Paper,
} from '@material-ui/core';

import Card from '@/Styles/Card';

const useStyles = makeStyles(theme => ({
  mapWrapper: {
    position: 'relative',
    height: '240px',
    [theme.breakpoints.up('md')]: {
      height: '334px',
    },
  },
}));

const getMapOptions = maps => {
  return {
    // streetViewControl: false,
    // scaleControl: true,
    // fullscreenControl: false,
    // styles: [
    //   {
    //     featureType: 'poi.business',
    //     elementType: 'labels',
    //     stylers: [
    //       {
    //         visibility: 'off',
    //       },
    //     ],
    //   },
    // ],
    // gestureHandling: 'greedy',
    // disableDoubleClickZoom: true,
    // minZoom: 11,
    // maxZoom: 18,
    // mapTypeControl: true,
    // mapTypeId: maps.MapTypeId.SATELLITE,
    // mapTypeControlOptions: {
    //   style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //   position: maps.ControlPosition.BOTTOM_CENTER,
    //   mapTypeIds: [
    //     maps.MapTypeId.ROADMAP,
    //     maps.MapTypeId.SATELLITE,
    //     maps.MapTypeId.HYBRID,
    //   ],
    // },
    // zoomControl: true,
    // clickableIcons: false,
  };
};

const MapContainer = props => {
  const { center, height } = props;
  const theme = useTheme();
  const classes = useStyles();

  const onMarkerClick = () => {};

  const onInfoWindowClose = () => {};

  const mapStyle = [
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e9e9e9',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'landscape',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 17,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 29,
        },
        {
          weight: 0.2,
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 18,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dedede',
        },
        {
          lightness: 21,
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          visibility: 'on',
        },
        {
          color: '#ffffff',
        },
        {
          lightness: 16,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          saturation: 36,
        },
        {
          color: '#333333',
        },
        {
          lightness: 40,
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [
        {
          color: '#f2f2f2',
        },
        {
          lightness: 19,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 20,
        },
      ],
    },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#fefefe',
        },
        {
          lightness: 17,
        },
        {
          weight: 1.2,
        },
      ],
    },
  ];

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
        // options={getMapOptions}
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
})(MapContainer);
