// actually this makes sense
import React, { useState } from 'react';
import RentalApplication from '../../components/RentalApplication';

import PleaseSignIn from '../../components/PleaseSignIn';
const MyApplication = props => {
  const {
    appData: { currentUser },
  } = props;
  // PageHeader on RentalApplication component
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <p>
          <strong>"Please SIgn in to view applications</strong>
        </p>
      }>
      <RentalApplication id={props.query.id} />
    </PleaseSignIn>
  );
};

export default MyApplication;
