import React, { useState, useRef } from 'react';
import PleaseSignIn from '../../components/PleaseSignIn';
import FileUploader from '../../components/FileUploader';
import { Typography } from '@material-ui/core';
//components
import PageHeader from '../../components/PageHeader';
// admin components
import AdminSettings from '../../admin-components/AdminSettings';
import AdminOnly from '../../components/AdminOnly';

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
      <AdminOnly me={currentUser.data ? currentUser.data.me : {}}>
        <AdminSettings me={currentUser.me} />
      </AdminOnly>
    </>
  );
};

export default SettingsPage;
