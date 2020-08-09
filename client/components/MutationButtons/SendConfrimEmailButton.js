import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Error from '../ErrorMessage/index';
import { toast } from 'react-toastify';
import { CONFIRM_EMAIL_MUTATION } from '../../graphql/mutations/index';
import { useMatchFetch } from '../Effects/useMatchEffect';

import { Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import ChangeRouteButton from '../Routes/ChangeRouteButton';
import { useCurrentUser } from '../User';
import Dashboard from '../Dashboard';
import DASHBOARD_CONFIG from '../../lib/configs/dashboardConfig';

// ugn inputs i Guess
import TextInput from '../../components/Inputs/TextInput';
import ResendConfirmEmail from './ResendConfirmEmail';

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
 * ToDo make confirming local state, as to elegantly handle subs for thgis
 */
const SendConfirmEmailButton = () => {
  const classes = useStyles();
  const router = useRouter();

  const [token, setToken] = useState(router.query.token);

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const user = useCurrentUser();

  const [acceptApplicationMutation, { data, loading, error }] = useMutation(
    CONFIRM_EMAIL_MUTATION,
    {
      variables: {
        email: email,
        token: token,
      },
    }
  );

  console.log('Play some games you cl;own => ', user);

  //will listen for a subscription and will fill in token and login
  // note use email from token sub

  // should be deep effect, wont work properly really, well might given what it does
  useEffect(() => {
    console.log('ZZZZZZZZZ => ', user);
    // setEmail(user.data.email);
    if (user.data) {
      setEmail(user.data.me.email);
    }
  }, [user.loading]);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  if (user.data && user.data.me.emailValidated) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Account email has been validated
        </Typography>
        <Dashboard
          config={DASHBOARD_CONFIG}
          elevation={1}
          // heading="Dashboard"
          // intro="intro"
        />
      </>
    );
  }
  return (
    <>
      <Error error={error} />
      <Typography>
        Firstname: {user.data ? user.data.me.firstName : null}
      </Typography>
      <Typography>
        Lastname: {user.data ? user.data.me.lastName : null}
      </Typography>
      <Typography>Email: {user.data ? user.data.me.email : null}</Typography>
      <TextInput
        name="token"
        label="token"
        placeholder="Paste TOKEN here"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <Button
        className={buttonClassname}
        variant="outlined"
        disabled={loading}
        onClick={() => {
          acceptApplicationMutation();
        }}>
        Confirm Email Address
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
      <ResendConfirmEmail email={email} />
    </>
  );
};

export default SendConfirmEmailButton;
