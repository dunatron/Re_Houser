import PropTypes from 'prop-types';
import React from 'react';
import PleaseSignIn from '@/Components/PleaseSignIn';
import Account from '@/Components/Account/index';
import { Typography } from '@material-ui/core';
import PageHeader from '@/Components/PageHeader';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const ConfirmAccountPage = ({ appData: { currentUser } }) => {
  return (
    <>
      <PageHeader
        title="Confirm account"
        intro="Confirm rehouser account page"
        metaData={{
          title: 'Confirm account',
          content: 'Confirm rehouser account page',
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
              You must be signed in to confirm your account
            </Typography>
          </div>
        }>
        <div>
          ToDo: Place confirm account here too? or at very lease a resend token
          and explaination
        </div>
      </PleaseSignIn>
    </>
  );
};

ConfirmAccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default ConfirmAccountPage;
