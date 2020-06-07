import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';
import { Paper, Typography } from '@material-ui/core';
import Head from 'next/head';

const FreeAppraisal = props => {
  const {
    appData: { currentUser },
  } = props;
  console.log('current user for Free Appraisal => ', currentUser);
  const { data, loading, error } = currentUser;
  if (loading) return 'Getting data for free appraisal page';
  const { me } = data;
  return (
    <div>
      <Head>
        <meta name="description" content="free property appraisal" />
        <title>Rehouser | free property appraisal</title>
      </Head>
      {!me && (
        <Paper
          style={{
            padding: '16px',
          }}>
          <Typography variant="h6">
            Our platform requires that you be logged in to submit a free
            appraisal{' '}
          </Typography>
          <Typography variant="subtitle1" gutterBottom={true}>
            You will get an email once you have completed the form. We will then
            send you another email when we have completed the appraisal
          </Typography>
        </Paper>
      )}
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
        <PropertyAppraisal currentUser={currentUser} />
      </PleaseSignIn>
    </div>
  );
};

export default FreeAppraisal;
