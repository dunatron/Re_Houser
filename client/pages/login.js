import React from 'react';
import PropTypes from 'prop-types';
import SuperLogin from '../components/SuperLogin';
import Head from 'next/head';


const LoginPage = props => {
  const {
    appData: { currentUser },
  } = props;
  return (
    <>
      <Head>
        <meta name="description" content="rehouser platform login" />
        <title>Rehouser | Login</title>
      </Head>
      <SuperLogin />
    </>
  );
};

export default LoginPage;
