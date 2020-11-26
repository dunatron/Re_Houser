import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/Components/PageHeader';
import ConfirmEmail from '@/Components/ConfirmEmail';
import { Typography } from '@material-ui/core';
import Dashboard from '@/Components/Dashboard/index';
import HOME_PAGE_DASHBOARD_CONFIG from '@/Lib/configs/dashboards/homepageDashConf';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

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

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {},
  });
}

ConfirmAccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ConfirmAccountPage;
