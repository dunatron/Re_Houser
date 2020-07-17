import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';
import { Paper, Typography } from '@material-ui/core';
import RehouserPaper from '../styles/RehouserPaper';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import Error from '../components/ErrorMessage';

const FreeAppraisal = props => {
  const {
    appData: { currentUser },
  } = props;
  console.log('current user for Free Appraisal => ', currentUser);
  const { data, loading, error } = currentUser;
  if (error) return <Error error={error} />;
  if (loading) return 'Getting data for free appraisal page';
  return (
    <div>
      <PageHeader
        title="Free Property Appraisal"
        intro="Fill out the form and we will generate an appraisal for you."
        metaData={{
          title: 'Free property appraisal',
          content: 'free property appraisal',
        }}>
        {!data.me && (
          <Typography variant="h6" gutterBottom>
            Our platform requires that you be logged in to request a free
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
        <PropertyAppraisal />
      </PleaseSignIn>
    </div>
  );
};

export default FreeAppraisal;
