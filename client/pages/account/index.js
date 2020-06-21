import React, { useState, useRef } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import Account from '../../components/Account/index';
import FileUploader from '../../components/FileUploader';
import { Typography } from '@material-ui/core';
import PageHeader from '../../components/PageHeader';

const AccountPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Account"
        intro="This is the account page. we use this to collect information that we will use across the system to make it more efficient for you"
        metaData={{
          title: 'Admin portal',
          content:
            'Admin portal to manage rehouser clients and day to day activities',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <p>
              <strong>Please Sign In</strong>
            </p>
            <p>You must be signed in to view your account</p>
          </div>
        }>
        <Account />
      </PleaseSignIn>
    </>
  );
};

export default AccountPage;
