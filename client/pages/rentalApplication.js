import React, { Component, Suspense } from 'react';

import RentalApplicationStepper from '../components/RentalApplicationStepper';
import PleaseSignIn from '../components/PleaseSignIn';

const RentalApplication = props => {
  const {
    appData: { currentUser },
    query,
  } = props;

  return (
    <PleaseSignIn currentUser={currentUser}>
      <RentalApplicationStepper
        applicationId={query.applicationId}
        me={currentUser.data ? currentUser.data.me : null}
      />
    </PleaseSignIn>
  ); // Notice its a page so we need to spread page props.
};
export default RentalApplication;
