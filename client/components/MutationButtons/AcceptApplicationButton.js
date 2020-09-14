import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';
import { toast } from 'react-toastify';
import { ACCEPT_RENTAL_APPLICATION_MUTATION } from '../../graphql/mutations/index';

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

const ErrorSupplier = ({ errors, tronM }) =>
  errors.map((error, idx) => <Error key={idx} error={error} tronM={tronM} />);

ErrorSupplier.propTypes = {
  errors: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  tronM: PropTypes.any.isRequired,
};

const AcceptApplicationButton = ({ application }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(
    application.stage === 'ACCEPTED' ? true : false
  );

  const tenantIds = application.applicants
    .filter(f => f.approved === true)
    .filter(f => f.completed === true)
    .map(tenant => tenant.user.id);

  // havnt done this yet...
  // const ownerIds = application
  const ownerId = application.owner.id;

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
                route="/landlord/leases/lease"
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

AcceptApplicationButton.propTypes = {
  application: PropTypes.shape({
    applicants: PropTypes.shape({
      filter: PropTypes.func,
    }),
    id: PropTypes.any,
    owner: PropTypes.shape({
      id: PropTypes.any,
    }),
    stage: PropTypes.string,
  }).isRequired,
};

export default AcceptApplicationButton;
