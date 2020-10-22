import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import ConfirmEmail from '@/Components/ConfirmEmail';
import { Typography } from '@material-ui/core';
import Dashboard from '@/Components/Dashboard/index';
import HOME_PAGE_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/homepageDashConf';

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
          config={HOME_PAGE_DASHBOARD_CONFIG}
          elevation={1}
          heading=""
          intro={''}
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
