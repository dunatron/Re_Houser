// actually this makes sense
import React, { useState } from 'react';
import RentalApplication from '../../components/RentalApplication';

import PleaseSignIn from '../../components/PleaseSignIn';
const MyApplication = props => {
  return (
    <PleaseSignIn message="You cannot view an application without being signed in">
      <RentalApplication id={props.query.id} />;
    </PleaseSignIn>
  );
};

export default MyApplication;
