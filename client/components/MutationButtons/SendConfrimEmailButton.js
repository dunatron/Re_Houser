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
import SuperLogin from '../SuperLogin';

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
  const [success, setSuccess] = useState(false);

  const [confirmEmailWithToken, { data, loading, error }] = useMutation(
    CONFIRM_EMAIL_MUTATION,
    {
      variables: {
        token: token,
      },
    }
  );

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  return (
    <>
      <Error error={error} />
      <TextInput
        name="token"
        label="token"
        placeholder="Paste TOKEN here"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <Button
        style={{ marginBottom: '16px' }}
        className={buttonClassname}
        variant="outlined"
        color="primary"
        disabled={loading}
        onClick={() => {
          confirmEmailWithToken();
        }}>
        Confirm Email Address
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Button>
      <Typography>
        To get another token emailed to you click the below button
      </Typography>
      <ResendConfirmEmail />
    </>
  );
};

export default SendConfirmEmailButton;
