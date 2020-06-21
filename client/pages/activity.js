import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import { ActivityManager, Activity } from '../components/ActivityManager';
import PageHeader from '../components/PageHeader';

const ActivityPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <div>
      <PageHeader
        title="Rehouser Activity"
        intro="Here is the system activity in regards to you. You can use this to
        quickly see activity on your properties, applications and lease"
        metaData={{
          title: 'Rehouser | activity',
          content:
            'rehouser system activity where users can view activity in relation to properties, applications and leases',
        }}
      />
      <PleaseSignIn
        currentUser={currentUser}
        alert={
          <div>
            <p>
              <strong>Please Sign In</strong>
            </p>
            <p>You must be signed in to view your activity</p>
          </div>
        }>
        <ActivityManager />
      </PleaseSignIn>
    </div>
  );
};

export default ActivityPage;
