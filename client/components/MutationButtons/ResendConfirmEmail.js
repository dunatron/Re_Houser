import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Error from '@/Components/ErrorMessage/index';
import { RESEND_CONFIRM_EMAIL_MUTATION } from '@/Gql/mutations/index';
import { Button, CircularProgress, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { useCurrentUser } from '@/Components/User';
import { toast } from 'react-toastify';

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

const ResendConfirmEmailButton = ({ email, ...rest }) => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);

  const user = useCurrentUser();

  console.log('current user to get email => ', user);

  const handleCompleted = data => {
    toast.info(
      <Box>
        <Typography color="inherit" variant="h6">
          Alert!
        </Typography>
        <Typography color="inherit">
          Please check your email for a confirmation link. It should arrive
          shortly
        </Typography>
      </Box>
    );
  };

  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    RESEND_CONFIRM_EMAIL_MUTATION,
    {
      variables: {
        // email: user.data.me.email, // usingLoggedInUser and would need configured on backend
        email: 'eanything',
      },
      onCompleted: handleCompleted,
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
        }}
        {...rest}>
        Resend email
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
    </>
  );
};

ResendConfirmEmailButton.propTypes = {
  email: PropTypes.any,
};

export default ResendConfirmEmailButton;
