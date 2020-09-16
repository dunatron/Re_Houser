import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Error from '@/Components/ErrorMessage/index';
import { toast } from 'react-toastify';
import { DECLINE_RENTAL_APPLICATION_MUTATION } from '@/Gql/mutations/index';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  buttonSuccess: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  buttonProgress: {
    color: red[500],
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
    map: PropTypes.func
  }).isRequired,
  tronM: PropTypes.any.isRequired
};

const DenyApplicationButton = ({ application }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(
    application.stage === 'ACCEPTED' ? true : false
  );

  const [declineApplicationMutation, { data, loading, error }] = useMutation(
    DECLINE_RENTAL_APPLICATION_MUTATION,
    {
      variables: {
        applicationId: application.id,
      },
      update: (proxy, payload) => {
        if (payload.data.acceptRentalApplication.id) {
          setSuccess(true);
          toast.success(
            <div>
              <p>The application to rent this property has been denied</p>
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
      <ErrorSupplier errors={[error]} tronM="Denying applicatiion failed" />
      <Button
        className={buttonClassname}
        variant="outlined"
        disabled={loading}
        onClick={() => {
          declineApplicationMutation();
        }}>
        Deny application
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

DenyApplicationButton.propTypes = {
  application: PropTypes.shape({
    id: PropTypes.any,
    owner: PropTypes.shape({
      id: PropTypes.any
    }),
    stage: PropTypes.string
  }).isRequired
};

export default DenyApplicationButton;
