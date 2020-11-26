import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { ActivityManager, Activity } from '@/Components/ActivityManager';
import PageHeader from '@/Components//PageHeader';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const ActivityPage = ({ appData: { currentUser } }) => {
  return (
    <Fragment>
      <PageHeader
        title="Rehouser Activity"
        intro="Here is the system activity in regards to you. You can use this to
        quickly see activity on your properties, applications and lease"
        metaData={{
          title: 'Activity',
          content:
            'Rehouser system activity where users can view activity in relation to properties, applications and leases',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <Typography variant="body1" gutterBottom color="inherit">
              <strong>Please Sign In</strong>
            </Typography>
            <Typography variant="body1" gutterBottom color="inherit">
              You must be signed in to view your activity
            </Typography>
          </div>
        }>
        <ActivityManager />
      </PleaseSignIn>
    </Fragment>
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

ActivityPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ActivityPage;
