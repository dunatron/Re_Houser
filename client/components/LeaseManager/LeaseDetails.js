import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider } from '@material-ui/core';

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
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const defaultDetailSize = {
  xs: 3,
  sm: 3,
  md: 3,
  lg: 3,
  xl: 3,
};
const LEASE_DETAILS_CONF = [
  {
    key: 'createdAt',
    label: 'Created @',
    sizes: {
      ...defaultDetailSize,
      xl: 3,
    },
  },
  {
    key: 'updatedAt',
    label: 'Last Updated',
    sizes: defaultDetailSize,
  },
  {
    key: 'rooms',
    label: 'Rooms',
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
                  {confObj.label} {lease[confObj.key]}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={3}>
          <Paper className={classes.paper}>ID: {id}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Created @: {createdAt}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=8</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=4</Paper>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
};

export default LeaseDetails;
