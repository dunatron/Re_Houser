import React, { Component } from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import PropertyAppraisal from '../components/PropertyAppraisal';
import { Paper, Typography } from '@material-ui/core';
import RehouserPaper from '../styles/RehouserPaper';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';
import Error from '../components/ErrorMessage';

const DeceptionPage = props => {
  const {
    appData: { currentUser },
  } = props;
  console.log('current user for Free Appraisal => ', currentUser);
  const { data, loading, error } = currentUser;
  if (error) return <Error error={error} />;
  if (loading) return 'Getting data for free appraisal page';
  return (
    <div>
      <img src="/images/deception.png" style={{ maxWidth: '100%' }} />
    </div>
  );
};

export default DeceptionPage;
