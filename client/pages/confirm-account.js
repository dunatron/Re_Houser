import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';
import OpenSuperLoginButton from "../components/SuperLogin/OpenSuperLoginButton"
import PageHeader from '../components/PageHeader';
import SendConfirmEmailButton from '../components/MutationButtons/SendConfrimEmailButton';
import ConfirmEmail from '../components/ConfirmEmail';
import { Typography } from '@material-ui/core';

import Dashboard from '../components/Dashboard/index';
import PleaseSignIn from '../components/PleaseSignIn';

import DASHBOARD_CONFIG from '../lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '../lib/configs/infoDashboardConfig';

import { SITE_NAME } from '../lib/const';

/**
 *
 * Doesnt actually require login, just needs a token in the url bar
 */
const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;

  console.log('A CURRENT USER AGAIN => ', currentUser);

  return (
    <>
      <PageHeader
        title="Confirm account"
        metaData={{
          title: 'Confirm account',
          content: 'rehouser platform login',
        }}
      />
      <ConfirmEmail me={currentUser.data ? currentUser.data.me : null}>
        <Typography variant="h5" gutterBottom>
          Congratulations your account's email address has now been validated
        </Typography>
        <Dashboard
          config={DASHBOARD_CONFIG}
          elevation={1}
          heading=""
          intro={''}
        />
        <Dashboard
          config={INFO_DASHBOARD_CONFIG}
          elevation={1}
          heading="Rehouser Info"
          intro="You can find sections with different information about rehouser and how things work including our policies"
        />
      </ConfirmEmail>
      {/* <SendConfirmEmailButton /> */}
    </>
  );
};

export default LoginPage;
