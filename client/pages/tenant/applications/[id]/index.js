import PropTypes from 'prop-types';
import React from 'react';
import RentalApplication from '@/Components/RentalApplication';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { Typography, Box } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const InvitedMessageComponents = () => (
  <>
    <Typography variant="body1" gutterBottom>
      You have been invited to an application.
    </Typography>
    <Typography variant="body1" gutterBottom>
      You will need to be signed up in order to see the application, once you
      have done that you can join the application.
    </Typography>
  </>
);

// Perhaps we can query some initial information to display it here
const SingleApplicationPage = ({ appData: { currentUser }, query }) => {
  const invited = query.invite;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      message={
        <Box>
          {invited && <InvitedMessageComponents />}
          <Typography variant="body1" gutterBottom>
            Please Sign in to view application.
          </Typography>
        </Box>
      }
      alert={
        <Box component="p" gutterBottom color="inherit">
          {invited && <InvitedMessageComponents />}
          <Typography>Please Sign in to view application.</Typography>
        </Box>
      }>
      <RentalApplication id={query.id} invited={invited} />
    </PleaseSignIn>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: CURRENT_USER_QUERY,
  });
  return addApolloState(apolloClient, {
    props: {
      query: ctx.query,
    },
  });
}

SingleApplicationPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default SingleApplicationPage;
