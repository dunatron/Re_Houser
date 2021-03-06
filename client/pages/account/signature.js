import PropTypes from 'prop-types';
import React from 'react';
import PleaseSignIn from '@/Components/PleaseSignIn';
import Signature from '@/Components/Signature/index';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const AccountPage = ({ appData: { currentUser } }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <div>
          <Typography gutterBottom color="inherit">
            <strong>Please Sign In</strong>
          </Typography>
          <Typography gutterBottom color="inherit">
            You must be signed in to manage your rehouser signature
          </Typography>
        </div>
      }>
      <Signature />
    </PleaseSignIn>
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

AccountPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
};

export default AccountPage;
