import PropTypes from 'prop-types';
import React from 'react';
import PleaseSignIn from '@/Components/PleaseSignIn';
import Account from '@/Components/Account/index';
import { Typography } from '@material-ui/core';
import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AccountPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Account"
        intro="This is the account page. we use this to collect information that we will use across the system to make it more efficient for you"
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <Typography gutterBottom color="inherit">
              <strong>Please Sign In</strong>
            </Typography>
            <Typography gutterBottom color="inherit">
              You must be signed in to view your account
            </Typography>
          </div>
        }>
        <Account />
      </PleaseSignIn>
    </>
  );
};

AccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AccountPage;
