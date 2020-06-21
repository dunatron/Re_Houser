import React from 'react';
import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';
import Head from 'next/head';
import PageHeader from '../components/PageHeader';

const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <Head>
        <meta name="description" content="" />
        <title></title>
      </Head>
      <PageHeader
        title="Login / Signup"
        metaData={{
          title: 'Rehouser | Login',
          content: 'rehouser platform login',
        }}
      />
      <SuperLogin />
    </>
  );
};

export default LoginPage;
