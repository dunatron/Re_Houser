import React, { Component } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import Signature from '../../components/Signature/index';

const AccountPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <PleaseSignIn
      currentUser={currentUser}
      alert={
        <div>
          <p>
            <strong>Please Sign In</strong>
          </p>
          <p>You must be signed in to manage your rehouser signature</p>
        </div>
      }>
      <Signature />
    </PleaseSignIn>
  );
};

export default AccountPage;
