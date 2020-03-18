import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import Account from '../components/Account/index';
import { ActivityManager, Activity } from '../components/ActivityManager';

const ActivityPage = () => {
  return (
    <div>
      <PleaseSignIn
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
