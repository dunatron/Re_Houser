import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  container: {
    // display: 'grid',
    // gridTemplateColumns: 'repeat(12, 1fr)',
    // gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'normal',
    wordBreak: 'break-all',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
    height: '100%',
  },
  itemLabel: {
    fontWeight: '600',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const defaultDetailSize = {
  xs: 6,
  sm: 3,
  md: 3,
  lg: 3,
  xl: 3,
};
const LEASE_DETAILS_CONF = [
  {
    key: 'createdAt',
    label: 'Created @',
    format: val => moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    sizes: {
      ...defaultDetailSize,
      xs: 12,
      lg: 6,
      xl: 6,
    },
  },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    format: val => moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    sizes: {
      ...defaultDetailSize,
      xs: 12,
      lg: 6,
      xl: 6,
    },
  },
  {
    key: 'rooms',
    label: 'Rooms',
    sizes: defaultDetailSize,
  },
  {
    key: 'finalised',
    label: 'Finalised',
    format: val => (val === true ? 'YES' : 'NO'),
    sizes: defaultDetailSize,
  },
  {
    key: 'bathrooms',
    label: 'Bathrooms',
    sizes: defaultDetailSize,
  },
  {
    key: 'garageSpaces',
    label: 'Garage spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'carportSpaces',
    label: 'Carport spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'offStreetSpaces',
    label: 'Offstreet spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'rent',
    label: 'Rent',
    sizes: defaultDetailSize,
  },
  {
    key: 'moveInDate',
    label: 'Move In Date',
    sizes: defaultDetailSize,
  },
  {
    key: 'expiryDate',
    label: 'Expiry Date',
    sizes: defaultDetailSize,
  },
  {
    key: 'locationLat',
    label: 'Location Lat',
    sizes: defaultDetailSize,
  },
  {
    key: 'locationLng',
    label: 'Location Lng',
    sizes: defaultDetailSize,
  },
];

const LeaseDetails = ({ lease }) => {
  const classes = useStyles();
  const {
    id,
    property,
    updatedAt,
    createdAt,
    lessees,
    lessors,
    finalised,
    rooms,
    bathrooms,
    garageSpaces,
    carportSpaces,
    offStreetSpaces,
    indoorFeatures,
    outdoorFeatures,
    rent,
    moveInDate,
    expiryDate,
    location,
    locationLat,
    locationLng,
  } = lease;
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Lease for {location}
      </Typography>
      <Grid container wrap="wrap" spacing={1} className={classes.container}>
        {LEASE_DETAILS_CONF.map(confObj => {
          const { xs, sm, md, lg, xl } = confObj.sizes;
          return (
            <Grid item {...confObj.sizes}>
              <Paper className={classes.paper}>
                <Typography>
                  <span className={classes.itemLabel}>{confObj.label}</span>{' '}
                  {confObj.format
                    ? confObj.format(lease[confObj.key])
                    : lease[confObj.key]}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
};

export default LeaseDetails;
