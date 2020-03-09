import React, { Component, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';
import { toast } from 'react-toastify';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '../../graphql/mutations/index';
import { useMatchFetch } from '../Effects/useMatchEffect';

import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import ChangeRouteButton from '../Routes/ChangeRouteButton';

const useStyles = makeStyles(theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

/**
 * This is actually going to be tied to createALeaseButton aswel as the acceptRentalApplication
 * When W
 * NOTE !IMPORTANT JEFFREY => time to get rid of the explicit mutations from ../../mutation and just doing local
 * gql queries. Not opposed to fragments so just spend a few hours looking int getting them working inl;ine here
 * gql is client first ensure they are all hand crafted on demand, I repeat, ditch ../../ n=mutationm, empahsize .../../fragments
 *
 * @param {*} param0
 */

// const ErrorSupplier = ({ errors }) => {
//   return errors.map(error => <Error error={error} />)
// }
const ErrorSupplier = ({ errors, tronM }) =>
  errors.map(error => <Error error={error} tronM={tronM} />);

const AcceptApplicationButton = ({ application }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(
    application.stage === 'ACCEPTED' ? true : false
  );
  // 1. extract the applicants from the application
  // application.

  const tenantIds = application.applicants
    .filter(f => f.approved === true)
    .filter(f => f.completed === true)
    .map(tenant => tenant.user.id);

  // havnt done this yet...
  // const ownerIds = application
  const ownerId = application.owner.id;

  // 2. extract the owners from the application.
  // 3. then get the data
  // const createNewLease = useMutation(CREATE_PROPERTY_LEASE_MUTATION)
  // ToDo: Mutation Props
  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    ACCEPT_RENTAL_APPLICATION_MUTATION,
    {
      variables: {
        applicationId: application.id,
      },
      update: (proxy, payload) => {
        if (payload.data.acceptRentalApplication.id) {
          setSuccess(true);
          toast.success(
            <div>
              <p>
                New Lease Created Id: {payload.data.acceptRentalApplication.id}{' '}
                location: {payload.data.acceptRentalApplication.location}
                Complete The Lease Here Todo: route to new lease
              </p>
              <ChangeRouteButton
                title="Manage & Sign Lease"
                route="/my/lease"
                query={{ id: payload.data.acceptRentalApplication.id }}
              />
            </div>,
            {
              autoClose: 15000,
            }
          );
        }
      },
    }
  );

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  return (
    <>
      <ErrorSupplier errors={[error]} tronM="Acccepting applicatiion failed" />
      {/* <Example /> */}
      <Button
        className={buttonClassname}
        variant="outlined"
        disabled={loading}
        onClick={() => {
          acceptApplicationMutation();
        }}>
        Accept application
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

export default AcceptApplicationButton;
