import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

import RentalApplicationStepper from '@/Components/RentalApplicationStepper';
import PleaseSignIn from '@/Components/PleaseSignIn';

// server side props
import { initializeApollo, addApolloState } from '@/Lib/apolloClient';
import { CURRENT_USER_QUERY } from '@/Gql/queries';

const RentalApplicationPage = ({
  appData: { currentUser },
  query: { applicationId },
}) => {
  const me = currentUser.data ? currentUser.data.me : null;

  return (
    <PleaseSignIn currentUser={currentUser}>
      <RentalApplicationStepper applicationId={applicationId} me={me} />
    </PleaseSignIn>
  );
};

RentalApplicationPage.propTypes = {
  appData: PropTypes.shape({
    currentUser: PropTypes.object.isRequired,
  }),
  query: PropTypes.shape({
    applicationId: PropTypes.string,
  }),
};
export default RentalApplicationPage;
