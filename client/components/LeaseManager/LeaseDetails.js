import PropTypes from 'prop-types';
import React, { Component, useState } from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid, Divider, Button } from '@material-ui/core';
import moment from 'moment';
import { isEmpty } from 'ramda';
import UpdateField from './UpdateField';
import { UPDATE_PROPERTY_LEASE_MUTATION } from '@/Gql/mutations';
import { SINGLE_LEASE_QUERY } from '@/Gql/queries';
import Error from '@/Components/ErrorMessage';

const useStyles = makeStyles(theme => ({
  container: {},
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
    type: 'DateTime',
    canUpdate: false,
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
    type: 'DateTime',
    canUpdate: false,
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
    type: 'Int',
    key: 'rooms',
    canUpdate: true,
    label: 'Last Updated',
    fieldProps: {
      name: 'rooms',
      label:
        'Does insulation meet the minimum requirements for ceiling insulation?',
      defaultValue: 'Test',
    },
    sizes: {
      ...defaultDetailSize,
      xs: 12,
      lg: 6,
      xl: 6,
    },
  },
  {
    key: 'finalised',
    type: 'Boolean',
    canUpdate: false,
    label: 'Finalised',
    format: val => (val === true ? 'YES' : 'NO'),
    sizes: defaultDetailSize,
  },
  {
    key: 'bathrooms',
    type: 'Int',
    canUpdate: true,
    label: 'Bathrooms',
    sizes: defaultDetailSize,
  },
  {
    key: 'garageSpaces',
    type: 'Int',
    canUpdate: true,
    label: 'Garage spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'carportSpaces',
    type: 'Int',
    canUpdate: true,
    label: 'Carport spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'offStreetSpaces',
    type: 'Int',
    canUpdate: true,
    label: 'Offstreet spaces',
    sizes: defaultDetailSize,
  },
  {
    key: 'rent',
    type: 'Float',
    canUpdate: true,
    label: 'Rent',
    sizes: defaultDetailSize,
  },
  {
    key: 'moveInDate',
    type: 'DateTime',
    canUpdate: true,
    label: 'Move In Date',
    sizes: defaultDetailSize,
  },
  {
    key: 'expiryDate',
    type: 'DateTime',
    canUpdate: true,
    label: 'Expiry Date',
    sizes: defaultDetailSize,
  },
  {
    key: 'locationLat',
    type: 'Float',
    canUpdate: false,
    label: 'Location Lat',
    sizes: defaultDetailSize,
  },
  {
    key: 'locationLng',
    type: 'Float',
    canUpdate: false,
    label: 'Location Lng',
    sizes: defaultDetailSize,
  },
];

const LeaseDetails = ({ lease }) => {
  const classes = useStyles();
  const [updates, setUpdates] = useState({});
  const [
    updatePropertyLease,
    { data, error, loading, called, client },
  ] = useMutation(UPDATE_PROPERTY_LEASE_MUTATION);
  const {
    id,
    stage,
    property,
    updatedAt,
    createdAt,
    lessees,
    lessors,
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

  const canUpdateField = canUpdate => {
    // ToDo if not a lessor of the lease do not update
    // if field canUpdate is false dont allow editing
    if (!canUpdate) return false;
    return true;
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <Grid container wrap="wrap" spacing={1} className={classes.container}>
        {LEASE_DETAILS_CONF.map((confObj, idx) => {
          const { xs, sm, md, lg, xl } = confObj.sizes;
          return (
            <Grid key={idx} item {...confObj.sizes}>
              <Paper className={classes.paper}>
                <Typography>
                  <span className={classes.itemLabel}>{confObj.label}</span>{' '}
                  {confObj.format
                    ? confObj.format(lease[confObj.key])
                    : lease[confObj.key]}
                </Typography>
                {canUpdateField(confObj.canUpdate) && (
                  <UpdateField
                    fieldConf={confObj}
                    defaultValue={lease[confObj.key]}
                    value={
                      updates[confObj.key]
                        ? updates[confObj.key]
                        : lease[confObj.key]
                    }
                    update={v => {
                      setUpdates({
                        ...updates,
                        [confObj.key]: v,
                      });
                    }}
                  />
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {!isEmpty(updates) && (
        <Button
          disabled={loading}
          onClick={() => {
            updatePropertyLease({
              variables: {
                data: { ...updates },
                where: {
                  id: id,
                },
              },
              refetchQueries: [
                {
                  query: SINGLE_LEASE_QUERY,
                  variables: {
                    where: {
                      id: id,
                    },
                  },
                },
              ],
            });
          }}>
          Update Lease
        </Button>
      )}
      {error && <Error error={error} />}
      {!isEmpty(updates) && <pre>{JSON.stringify(updates, null, 2)}</pre>}
      <Divider className={classes.divider} />
    </div>
  );
};

LeaseDetails.propTypes = {
  lease: PropTypes.any
};

export default LeaseDetails;
