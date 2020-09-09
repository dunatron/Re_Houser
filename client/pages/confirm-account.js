import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../components/PageHeader';
import ConfirmEmail from '../components/ConfirmEmail';
import { Typography } from '@material-ui/core';
import Dashboard from '../components/Dashboard/index';
import DASHBOARD_CONFIG from '../lib/configs/dashboardConfig';
import INFO_DASHBOARD_CONFIG from '../lib/configs/infoDashboardConfig';

/**
 *
 * Doesnt actually require login, just needs a token in the url bar
 */
const ConfirmAccountPage = ({ appData: { currentUser } }) => {
  const me = currentUser.data ? currentUser.data.me : null;

  return (
    <>
      <PageHeader
        title="Confirm account"
        metaData={{
          title: 'Confirm account',
          content: 'rehouser platform login',
        }}
      />
      <ConfirmEmail me={me}>
        <Typography variant="h5" gutterBottom>
          Congratulations your {`account's`} email address has now been
          validated
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

ConfirmAccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ConfirmAccountPage;
