import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';
import { Paper, Typography } from '@material-ui/core';
import RehouserPaper from '../styles/RehouserPaper';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';

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
      <PageHeader
        title="Free Property Appraisal"
        intro="You will get an email once you have completed the form. We will then
        send you another email when we have completed the appraisal"
        metaData={{
          title: 'Free property appraisal',
          content: 'free property appraisal',
        }}>
        {!me && (
          <Typography variant="h6" gutterBottom>
            Our platform requires that you be logged in to submit a free
            appraisal{' '}
          </Typography>
        )}
      </PageHeader>
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
