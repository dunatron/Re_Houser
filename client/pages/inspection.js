import React from 'react';
import PropTypes from 'prop-types';
import PleaseSignIn from '@/Components/PleaseSignIn';
import ManageInspection from '@/Components/Inspections/ManageInspection';
import { Typography } from '@material-ui/core';

import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const InspectionPage = ({ appData: { currentUser }, query: { id } }) => {
  const me = currentUser.data ? currentUser.data.me : null;
  return (
    <div>
      <PageHeader
        title="Inspection"
        intro="Manage your inspection from here"
        metaData={{
          title: 'Inspection',
          content: 'Manage your inspection from here',
        }}></PageHeader>
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <Typography variant="body1" gutterBottom color="inherit">
              <strong>Please Sign In</strong>
            </Typography>
            <Typography variant="body1" gutterBottom color="inherit">
              You must be logged in to view the inspection
            </Typography>
          </div>
        }>
        <ManageInspection id={id} />
      </PleaseSignIn>
    </div>
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

InspectionPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default InspectionPage;
