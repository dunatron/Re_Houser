import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';
import { RESEND_CONFIRM_EMAIL_MUTATION } from '../../graphql/mutations/index';
import { Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useCurrentUser } from '../User';

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

const ResendConfirmEmailButton = ({ email }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);

  const user = useCurrentUser();

  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    RESEND_CONFIRM_EMAIL_MUTATION,
    {
      variables: {
        email: 'doesntmatter', // usingLoggedInUser and would need configured on backend
      },
    }
  );

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  // return null;
  return (
    <>
      <Error error={error} />
      <Button
        className={buttonClassname}
        variant="outlined"
        disabled={loading}
        onClick={() => {
          acceptApplicationMutation();
        }}>
        Resend email
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

ResendConfirmEmailButton.propTypes = {
  email: PropTypes.any.isRequired,
};

export default ResendConfirmEmailButton;
