import React, { useState, useRef } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import FileUploader from '../../components/FileUploader';
import { Typography } from '@material-ui/core';
//components
import PageHeader from '../../components/PageHeader';
// admin components
import AdminSettings from '../../admin-components/AdminSettings';

const SettingsPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <PageHeader
        title="Admin Settings"
        intro="Decide what system updates you want to subscribe to"
        metaData={{
          title: 'Admin Settings',
          content: 'Admin settings for subscriptions',
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
        <AdminSettings me={currentUser.me} />
      </PleaseSignIn>
    </>
  );
};

export default SettingsPage;
