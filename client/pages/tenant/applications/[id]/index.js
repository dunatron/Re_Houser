import PropTypes from 'prop-types';
import React from 'react';
import RentalApplication from '@/Components/RentalApplication';
import PleaseSignIn from '@/Components/PleaseSignIn';
import { Typography } from '@material-ui/core';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const SingleApplicationPage = ({ appData: { currentUser }, query }) => {
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <Typography component="p" gutterBottom color="inherit">
          <strong>Please Sign in to view applications</strong>
        </Typography>
      }>
      <RentalApplication id={query.id} />
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
