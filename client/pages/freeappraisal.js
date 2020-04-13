import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';

const FreeAppraisal = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <p>
              <strong>Please Sign In</strong>
            </p>
            <p>You must be signed up/in to get a free rental Appraisal</p>
          </div>
        }>
        <PropertyAppraisal />
      </PleaseSignIn>
    </div>
  );
};

export default FreeAppraisal;
